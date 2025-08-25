// Vercel Serverless Function for chat API
import { createParser } from 'eventsource-parser';

// API配置 - 使用环境变量（与 ENG 同款）
const API_CONFIG = {
  api_key: process.env.OPENAI_API_KEY,
  api_url: process.env.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions',
  model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
  temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7,
  max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '512', 10),
  request_timeout_ms: parseInt(process.env.UPSTREAM_TIMEOUT_MS || '20000', 10),
  retry_count: parseInt(process.env.UPSTREAM_RETRY || '2', 10)
};

// 英语限定系统提示（与 ENG 相同规范）
const ENGLISH_ONLY_PROMPT = [
  'You are a helpful English conversation AI assistant.',
  'CRITICAL RULES:',
  '- Always reply in English ONLY. Do not include any Chinese in your output.',
  '- The user may type in Chinese. You MUST fully understand Chinese input and respond in clear, natural English.',
  '- Do not ask the user to switch languages; just answer in English.',
  '',
  'WRITING STYLE REQUIREMENTS:',
  '- Use sophisticated, advanced vocabulary that sounds natural and native-like.',
  '- Employ diverse sentence structures: complex sentences, compound sentences, and varied clause types.',
  '- Incorporate non-finite verb forms (participles, infinitives, gerunds) naturally.',
  '- Use relative clauses, adverbial clauses, and noun clauses to add complexity.',
  '- Vary sentence length and rhythm for engaging reading experience.',
  '- Ensure all grammar is impeccable and idiomatic.',
].join('\n');

export default async function handler(req, res) {
  // 设置CORS和安全头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, max_tokens } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    if (!API_CONFIG.api_key) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // 兼容：只取最后一条用户消息
    let lastUserContent = '';
    try {
      if (Array.isArray(messages)) {
        for (let i = messages.length - 1; i >= 0; i -= 1) {
          if (messages[i] && messages[i].role === 'user' && typeof messages[i].content === 'string') {
            lastUserContent = messages[i].content;
            break;
          }
        }
      }
    } catch {}

    if (!lastUserContent) {
      return res.status(400).json({ error: 'No user message provided' });
    }

    const requestData = {
      model: API_CONFIG.model,
      messages: [
        { role: 'system', content: ENGLISH_ONLY_PROMPT },
        { role: 'user', content: lastUserContent }
      ],
      temperature: API_CONFIG.temperature,
      stream: false
    };

    requestData.max_tokens = Math.min(300, max_tokens || API_CONFIG.max_tokens || 300);

    return await handleNormalResponse(requestData, res);

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}

async function handleNormalResponse(requestData, res) {
  try {
    let response = await fetchWithTimeoutAndRetry(API_CONFIG.api_url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_CONFIG.api_key}`,
        'Content-Type': 'application/json',
        'User-Agent': 'English-AI-Assistant/1.0'
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      let errorText = await response.text();
      if (response.status === 400 && typeof errorText === 'string' && errorText.includes('server_inner_error_openai')) {
        await new Promise(r => setTimeout(r, 600));
        response = await fetchWithTimeoutAndRetry(API_CONFIG.api_url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_CONFIG.api_key}`,
            'Content-Type': 'application/json',
            'User-Agent': 'English-AI-Assistant/1.0'
          },
          body: JSON.stringify(requestData)
        });
        if (!response.ok) errorText = await response.text();
      }
      return res.status(response.status).json({ error: errorText });
    }

    const result = await response.json();
    return res.status(200).json(result);

  } catch (error) {
    console.error('Upstream Error:', error);
    return res.status(500).json({ error: error.message });
  }
}

// 带超时与重试的fetch
async function fetchWithTimeoutAndRetry(url, options) {
  const retryableStatus = new Set([429, 500, 502, 503, 504]);
  let lastError;

  for (let attempt = 0; attempt <= API_CONFIG.retry_count; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.request_timeout_ms);
    try {
      const resp = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);
      if (!resp.ok && retryableStatus.has(resp.status) && attempt < API_CONFIG.retry_count) {
        const waitMs = 700 * Math.pow(2, attempt);
        await new Promise(r => setTimeout(r, waitMs));
        continue;
      }
      return resp;
    } catch (err) {
      clearTimeout(timeoutId);
      lastError = err;
      if (attempt < API_CONFIG.retry_count) {
        const waitMs = 700 * Math.pow(2, attempt);
        await new Promise(r => setTimeout(r, waitMs));
        continue;
      }
      throw err;
    }
  }
  throw lastError || new Error('上游请求失败');
}


