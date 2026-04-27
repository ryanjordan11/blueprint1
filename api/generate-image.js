export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Missing OPENAI_API_KEY server environment variable' });
    return;
  }

  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== 'string') {
    res.status(400).json({ error: 'Missing prompt' });
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
      size: '1024x1024',
      response_format: 'url'
    })
  });

  const data = await response.json();

  if (!response.ok) {
    res.status(response.status).json({
      error: data?.error?.message || 'OpenAI image generation failed'
    });
    return;
  }

  const url = data?.data?.[0]?.url;
  if (!url) {
    res.status(500).json({ error: 'OpenAI returned no image URL' });
    return;
  }

  res.status(200).json({ url });
}
