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

  const { userPrompt, systemPrompt, useSearch } = req.body || {};
  if (!userPrompt || !systemPrompt) {
    res.status(400).json({ error: 'Missing prompt data' });
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
    res.status(response.status).json({
      error: data?.error?.message || 'OpenAI chat request failed'
    });
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(data.choices[0].message.content);
  } catch {
    res.status(500).json({ error: 'OpenAI returned malformed JSON' });
    return;
  }

  res.status(200).json({
    json: parsed,
    sources: []
  });
}
