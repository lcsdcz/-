// /api/proxy.js — Vercel Serverless Function
export default async function handler(req, res) {
    const origin = req.headers.origin || '';
  
    // 允许：生产域名、本地开发，以及所有以 chinese-poems2 开头的 vercel 预览域名
    const allowByPattern =
      origin.startsWith('https://chinese-poems2') && origin.endsWith('.vercel.app');
  
    const ALLOW_ORIGINS = new Set([
      'https://chinese-poems2.vercel.app', // 生产域名（如果你用这个）
      'http://localhost:3000',
    ]);
  
    const allowOrigin = allowByPattern || ALLOW_ORIGINS.has(origin) ? origin : '';
  
    // CORS 响应头
    if (allowOrigin) {
      res.setHeader('Access-Control-Allow-Origin', allowOrigin);
    }
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  
    // 回显浏览器预检请求头，最大化兼容
    const acrh = req.headers['access-control-request-headers'];
    res.setHeader(
      'Access-Control-Allow-Headers',
      acrh || 'Content-Type, Authorization, X-Requested-With'
    );
  
    // 如需带 cookie，则打开下面一行，同时上面的 Allow-Origin 不能是 *
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
  
    // 预检
    if (req.method === 'OPTIONS') return res.status(204).end();
  
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    // 解析 body
    let body;
    try {
      body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    } catch {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }
  
    const { message } = body || {};
    if (!message) return res.status(400).json({ error: 'Message is required' });
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OPENAI_API_KEY is not configured' });
    }
  
    try {
      const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          temperature: 0.7,
          max_tokens: 1000,
          messages: [
            {
              role: 'system',
              content:
                '你是一个专业的语文学习助手，专门帮助学生理解古诗文、文学知识和文化背景。请用中文回答，保持友好和专业。',
            },
            { role: 'user', content: message },
          ],
        }),
      });
  
      const text = await upstream.text();
      if (!upstream.ok) return res.status(upstream.status).send(text);
  
      // 简化返回
      const json = JSON.parse(text);
      return res.status(200).json({
        reply: json?.choices?.[0]?.message?.content ?? '',
        usage: json?.usage ?? null,
      });
    } catch (e) {
      return res
        .status(500)
        .json({ error: 'Upstream error', message: e?.message || String(e) });
    }
  }
  