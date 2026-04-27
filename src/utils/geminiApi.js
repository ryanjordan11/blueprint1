// Gemini API utility for all tools

export async function callGemini(userPrompt, systemPrompt, schema, useSearch = false) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

  const payload = {
    contents: [{ parts: [{ text: userPrompt }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] },
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema
    }
  };

  if (useSearch) {
    payload.tools = [{ "google_search": {} }];
  }

  let lastErr;
  for (let i = 0; i < 5; i++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      const text = data.candidates[0].content.parts[0].text;
      const sources = data.candidates?.[0]?.groundingMetadata?.groundingAttributions?.map(a => ({
        uri: a.web?.uri,
        title: a.web?.title
      })) || [];

      return { json: JSON.parse(text), sources };
    } catch (err) {
      lastErr = err;
      await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
    }
  }
  throw lastErr;
}

export async function generateImage(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;
  const payload = { instances: { prompt }, parameters: { sampleCount: 1 } };
  const res = await fetch(url, { method: 'POST', body: JSON.stringify(payload) });
  const data = await res.json();
  return `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`;
}

export async function performImageToImage(prompt, base64Image) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: "image/png", data: base64Image } }] }],
    generationConfig: { responseModalities: ['TEXT', 'IMAGE'] }
  };
  const res = await fetch(url, { method: 'POST', body: JSON.stringify(payload) });
  const data = await res.json();
  const base64 = data.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
  return base64 ? `data:image/png;base64,${base64}` : null;
}