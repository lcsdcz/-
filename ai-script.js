// AI辅助学习功能
const aiAssistant = {
    apiKey: '', // 不再需要在前端暴露API密钥
    // 动态解析接口地址：支持 file:// 场景通过 window.__AI_BASE__ 指定域名
    getApiUrl() {
        try {
            const base = (typeof window !== 'undefined' && window.__AI_BASE__)
                ? window.__AI_BASE__.replace(/\/$/, '')
                : '';
            const proto = (typeof window !== 'undefined' && window.location && window.location.protocol) || '';
            const isHttp = proto === 'http:' || proto === 'https:';

            if (!isHttp && !base) {
                console.error('AI接口: 当前为本地 file:// 访问。请先设置 window.__AI_BASE__ = "https://你的部署域名"');
            }
            return (base ? base : '') + '/api/proxy';
        } catch {
            return '/api/proxy';
        }
    },
    
    async sendMessage(message) {
        try {
            // 恢复本项目原始入参结构
            const payload = { message };
            // 开发环境调试：允许通过全局配置透传 apiKey/apiUrl/model
            if (typeof window !== 'undefined' && window.__AI_DEV_CONFIG__ && window.__AI_DEV_CONFIG__.enable === true) {
                if (window.__AI_DEV_CONFIG__.apiKey) payload.apiKey = window.__AI_DEV_CONFIG__.apiKey;
                if (window.__AI_DEV_CONFIG__.apiUrl) payload.apiUrl = window.__AI_DEV_CONFIG__.apiUrl;
                if (window.__AI_DEV_CONFIG__.model) payload.model = window.__AI_DEV_CONFIG__.model;
            }

            const response = await fetch(this.getApiUrl(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                let errorText = '';
                try {
                    errorText = await response.text();
                } catch {}
                let errorJson;
                try { errorJson = JSON.parse(errorText); } catch {}
                console.error('AI接口错误响应:', response.status, errorJson || errorText);
                if (response.status === 404) {
                    console.error('提示: 如果你是本地 file:// 打开页面，请设置 window.__AI_BASE__ 为你的后端域名。');
                }
                throw new Error(`API请求失败: ${response.status}`);
            }

            const data = await response.json();
            return data.reply || data.choices?.[0]?.message?.content || '抱歉，AI暂时无法回答，请稍后再试。';

        } catch (error) {
            console.error('AI请求错误:', error);
            return this.getPresetResponse(message);
        }
    },

    getPresetResponse(query) {
        const presets = {
            '李白': '李白（701年-762年），字太白，号青莲居士，唐代伟大的浪漫主义诗人，被后人誉为"诗仙"。代表作品有《静夜思》、《将进酒》、《望庐山瀑布》等。',
            '静夜思': '《静夜思》是李白的代表作，原文：床前明月光，疑是地上霜。举头望明月，低头思故乡。这首诗表达了游子思乡的普遍情感。',
            '论语': '《论语》是儒家经典著作，记录了孔子及其弟子的言行。核心思想包括仁、义、礼、智、信等。',
            '苏轼': '苏轼（1037年-1101年），字子瞻，号东坡居士，北宋文学家、政治家。代表作品有《水调歌头·明月几时有》、《念奴娇·赤壁怀古》等。'
        };

        for (const [key, value] of Object.entries(presets)) {
            if (query.includes(key) || key.includes(query)) {
                return value;
            }
        }

        return '请询问关于古诗文、诗人或文学知识的问题。';
    }
};

// 显示AI助手界面
function showAIAssistant() {
    // 隐藏所有页面
    document.getElementById('chapterSelection').style.display = 'none';
    document.getElementById('poemSelection').style.display = 'none';
    document.getElementById('recitationPage').style.display = 'none';
    
    // 显示AI助手页面
    document.getElementById('ai-assistant').style.display = 'block';
}

// AI消息处理
async function sendAIMessage() {
    const input = document.getElementById('ai-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    addMessageToChat(message, 'user');
    input.value = '';
    
    const loadingId = addLoadingMessage();
    
    try {
        const response = await aiAssistant.sendMessage(message);
        removeLoadingMessage(loadingId);
        addMessageToChat(response, 'ai');
    } catch (error) {
        removeLoadingMessage(loadingId);
        addMessageToChat('抱歉，暂时无法连接到AI服务，请稍后再试。', 'ai');
    }
}

// 快速询问AI
function askAI(query) {
    document.getElementById('ai-input').value = query;
    sendAIMessage();
}

// 添加消息到聊天界面
function addMessageToChat(content, type) {
    const chatMessages = document.getElementById('ai-chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ${type}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'ai-avatar';
    
    const icon = document.createElement('i');
    icon.className = type === 'user' ? 'fas fa-user' : 'fas fa-robot';
    avatar.appendChild(icon);
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'ai-content';
    contentDiv.innerHTML = content.replace(/\n/g, '<br>');
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 添加加载消息
function addLoadingMessage() {
    const chatMessages = document.getElementById('ai-chat-messages');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'ai-message ai-system';
    loadingDiv.id = 'loading-message-' + Date.now();
    
    const avatar = document.createElement('div');
    avatar.className = 'ai-avatar';
    const icon = document.createElement('i');
    icon.className = 'fas fa-robot';
    avatar.appendChild(icon);
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'ai-content';
    contentDiv.innerHTML = '<div class="ai-loading"><div class="spinner"></div>AI正在思考中...</div>';
    
    loadingDiv.appendChild(avatar);
    loadingDiv.appendChild(contentDiv);
    chatMessages.appendChild(loadingDiv);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return loadingDiv.id;
}

// 移除加载消息
function removeLoadingMessage(loadingId) {
    const loadingElement = document.getElementById(loadingId);
    if (loadingElement) {
        loadingElement.remove();
    }
}

// 键盘事件监听
document.addEventListener('DOMContentLoaded', function() {
    const aiInput = document.getElementById('ai-input');
    if (aiInput) {
        aiInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendAIMessage();
            }
        });
    }
});
