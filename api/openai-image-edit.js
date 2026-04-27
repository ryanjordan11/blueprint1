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

  const { prompt, base64Image } = req.body || {};
  if (!prompt || !base64Image) {
    res.status(400).json({ error: 'Missing prompt or base64Image' });
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
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    body: formData
  });

  const data = await response.json();

  if (!response.ok) {
    res.status(response.status).json({
      error: data?.error?.message || 'OpenAI image edit request failed'
    });
    return;
  }

  res.status(200).json({ url: data.data?.[0]?.url || '' });
}

function base64ToBlob(base64) {
  const binary = atob(base64);
  const arr = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    arr[i] = binary.charCodeAt(i);
  }
  return new Blob([arr], { type: 'image/png' });
}
