// /api/proxy.js — Vercel Serverless Function
export default async function handler(req, res) {
  // 放宽 CORS，避免本地与多环境受限
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // 解析 body
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const { message, max_tokens } = body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const API_CONFIG = {
    api_key: process.env.OPENAI_API_KEY,
    api_url: process.env.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions',
    model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
    temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7,
    max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '600', 10),
    request_timeout_ms: parseInt(process.env.UPSTREAM_TIMEOUT_MS || '20000', 10),
    retry_count: parseInt(process.env.UPSTREAM_RETRY || '2', 10),
  };

  if (!API_CONFIG.api_key) {
    return res.status(500).json({ error: 'OPENAI_API_KEY is not configured' });
  }

  const SYSTEM_PROMPT = [
    '你是一个专业的语文学习助手，专注古诗文与文学常识辅导。',
    '要求：',
    '- 始终用中文回答，表达清晰、准确、友好。',
    '- 回答要有条理，可适当分点阐述；必要时给出例证。',
    '- 优先结合中学语文课程框架进行解释。',
  ].join('\n');

  const requestData = {
    model: API_CONFIG.model,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: message },
    ],
    temperature: API_CONFIG.temperature,
    stream: false,
  };

  requestData.max_tokens = Math.min(800, max_tokens || API_CONFIG.max_tokens || 800);

  try {
    let response = await fetchWithTimeoutAndRetry(API_CONFIG.api_url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_CONFIG.api_key}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Chinese-Poems-AI/1.0',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      let errorText = await response.text();
      // 某些代理会把上游内部错映射成 400，尝试一次快速重试
      if (response.status === 400 && typeof errorText === 'string' && errorText.includes('server_inner_error_openai')) {
        await new Promise(r => setTimeout(r, 600));
        response = await fetchWithTimeoutAndRetry(API_CONFIG.api_url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${API_CONFIG.api_key}`,
            'Content-Type': 'application/json',
            'User-Agent': 'Chinese-Poems-AI/1.0',
          },
          body: JSON.stringify(requestData),
        });
        if (!response.ok) errorText = await response.text();
      }

      if (!response.ok) {
        return res.status(response.status).json({ error: errorText });
      }
    }

    const json = await response.json();
    const reply = json?.choices?.[0]?.message?.content ?? '';
    return res.status(200).json({ reply, usage: json?.usage ?? null });
  } catch (e) {
    return res.status(500).json({ error: 'Upstream error', message: e?.message || String(e) });
  }
}

// 带超时与重试的 fetch
async function fetchWithTimeoutAndRetry(url, options) {
  const retryableStatus = new Set([429, 500, 502, 503, 504]);
  let lastError;

  for (let attempt = 0; attempt <= (parseInt(process.env.UPSTREAM_RETRY || '2', 10)); attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), parseInt(process.env.UPSTREAM_TIMEOUT_MS || '20000', 10));
    try {
      const resp = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);
      if (!resp.ok && retryableStatus.has(resp.status) && attempt < (parseInt(process.env.UPSTREAM_RETRY || '2', 10))) {
        const waitMs = 700 * Math.pow(2, attempt);
        await new Promise(r => setTimeout(r, waitMs));
        continue;
      }
      return resp;
    } catch (err) {
      clearTimeout(timeoutId);
      lastError = err;
      if (attempt < (parseInt(process.env.UPSTREAM_RETRY || '2', 10))) {
        const waitMs = 700 * Math.pow(2, attempt);
        await new Promise(r => setTimeout(r, waitMs));
        continue;
      }
      throw err;
    }
  }
  throw lastError || new Error('上游请求失败');
}
