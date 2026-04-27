import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

async function readJsonBody(req) {
  return await new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function openAIMiddleware() {
  return {
    name: 'openai-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) return next();
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Missing OPENAI_API_KEY environment variable' }));
          return;
        }

        const body = await readJsonBody(req);

        try {
          if (req.url === '/api/generate-image') {
            const prompt = body?.prompt;
            if (!prompt) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Missing prompt' }));
              return;
            }

            const response = await fetch('https://api.openai.com/v1/images/generations', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
              },
              body: JSON.stringify({
                model: 'dall-e-3',
                prompt,
                n: 1,
                size: '1024x1024',
                response_format: 'url'
              })
            });

            const data = await response.json();
            res.statusCode = response.ok ? 200 : response.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response.ok ? { url: data.data?.[0]?.url || '' } : { error: data?.error?.message || 'OpenAI image generation failed' }));
            return;
          }

          if (req.url === '/api/openai-chat') {
            const { userPrompt, systemPrompt, useSearch } = body || {};
            if (!userPrompt || !systemPrompt) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Missing prompt data' }));
              return;
            }

            const payload = {
              model: 'gpt-4o-mini',
              messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
              ],
              response_format: { type: 'json_object' }
            };

            if (useSearch) {
              payload.tools = [{ type: 'web_search' }];
              payload.tool_choice = 'auto';
            }

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
              },
              body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (!response.ok) {
              res.statusCode = response.status;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: data?.error?.message || 'OpenAI chat request failed' }));
              return;
            }

            let parsed;
            try {
              parsed = JSON.parse(data.choices[0].message.content);
            } catch {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'OpenAI returned malformed JSON' }));
              return;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ json: parsed, sources: [] }));
            return;
          }

          if (req.url === '/api/openai-image-edit') {
            const { prompt, base64Image } = body || {};
            if (!prompt || !base64Image) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Missing prompt or base64Image' }));
              return;
            }

            const formData = new FormData();
            formData.append('model', 'dall-e-2');
            formData.append('prompt', prompt);
            formData.append('image', base64ToBlob(base64Image), 'image.png');
            formData.append('size', '1024x1024');
            formData.append('response_format', 'url');

            const response = await fetch('https://api.openai.com/v1/images/edits', {
              method: 'POST',
              headers: { Authorization: `Bearer ${apiKey}` },
              body: formData
            });

            const data = await response.json();
            res.statusCode = response.ok ? 200 : response.status;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response.ok ? { url: data.data?.[0]?.url || '' } : { error: data?.error?.message || 'OpenAI image edit request failed' }));
            return;
          }
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err?.message || 'Server error' }));
          return;
        }

        next();
      });
    }
  };
}

function base64ToBlob(base64) {
  const binary = Buffer.from(base64, 'base64');
  return new Blob([binary], { type: 'image/png' });
}

export default defineConfig({
  plugins: [react(), tailwindcss(), openAIMiddleware()],
})
