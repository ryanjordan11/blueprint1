export async function callOpenAI(userPrompt, systemPrompt, schema, useSearch = false) {
  const payload = { userPrompt, systemPrompt, schema, useSearch };

  try {
    const res = await fetch('/api/openai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) return await res.json();

    if (res.status !== 404) {
      const message = await res.text();
      throw new Error(message || 'OpenAI request failed');
    }
  } catch (err) {
    const clientKey = getClientApiKey();
    if (!clientKey) throw err;
    return await directChatCall(clientKey, payload);
  }

  const clientKey = getClientApiKey();
  if (!clientKey) {
    throw new Error('OpenAI chat route not available and VITE_OPENAI_API_KEY is missing.');
  }
  return await directChatCall(clientKey, payload);
}

export async function generateImage(prompt) {
  try {
    const res = await fetch('/api/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (res.ok) {
      const data = await res.json();
      return data.url;
    }

    if (res.status !== 404) {
      const message = await res.text();
      throw new Error(message || 'Image generation failed');
    }
  } catch (err) {
    const clientKey = getClientApiKey();
    if (!clientKey) throw err;
    return await directImageCall(clientKey, prompt);
  }

  const clientKey = getClientApiKey();
  if (!clientKey) {
    throw new Error('Image generation route not available and VITE_OPENAI_API_KEY is missing.');
  }
  return await directImageCall(clientKey, prompt);
}

export async function performImageToImage(prompt, base64Image) {
  try {
    const res = await fetch('/api/openai-image-edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, base64Image })
    });

    if (res.ok) {
      const data = await res.json();
      return data.url;
    }

    if (res.status !== 404) {
      const message = await res.text();
      throw new Error(message || 'Image edit request failed');
    }
  } catch (err) {
    const clientKey = getClientApiKey();
    if (!clientKey) throw err;
    return await directImageEditCall(clientKey, prompt, base64Image);
  }

  const clientKey = getClientApiKey();
  if (!clientKey) {
    throw new Error('Image edit route not available and VITE_OPENAI_API_KEY is missing.');
  }
  return await directImageEditCall(clientKey, prompt, base64Image);
}

function getClientApiKey() {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
  return apiKey && apiKey !== 'your_api_key_here' ? apiKey : '';
}

async function directChatCall(apiKey, payload) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: payload.systemPrompt },
        { role: 'user', content: payload.userPrompt }
      ],
      response_format: { type: 'json_object' }
    })
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'OpenAI request failed');
  }

  const data = await res.json();
  try {
    return { json: JSON.parse(data.choices[0].message.content), sources: [] };
  } catch {
    throw new Error('OpenAI returned malformed JSON.');
  }
}

async function directImageCall(apiKey, prompt) {
  const res = await fetch('https://api.openai.com/v1/images/generations', {
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

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Image generation failed');
  }

  const data = await res.json();
  return data.data[0].url;
}

async function directImageEditCall(apiKey, prompt, base64Image) {
  const formData = new FormData();
  formData.append('model', 'dall-e-2');
  formData.append('prompt', prompt);
  formData.append('image', base64ToBlob(base64Image), 'image.png');
  formData.append('size', '1024x1024');
  formData.append('response_format', 'url');

  const res = await fetch('https://api.openai.com/v1/images/edits', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    body: formData
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || 'Image edit request failed');
  }

  const data = await res.json();
  return data.data[0].url;
}

function base64ToBlob(base64) {
  const binary = atob(base64);
  const arr = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    arr[i] = binary.charCodeAt(i);
  }
  return new Blob([arr], { type: 'image/png' });
}
