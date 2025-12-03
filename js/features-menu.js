/**
 * 功能菜单控制模块
 * 处理游戏、手势控制和AI助手的导航
 */

// 初始化功能菜单
function initFeaturesMenu() {
    const featuresTrigger = document.getElementById('featuresTrigger');
    const featuresMenu = document.querySelector('.features-menu');
    
    if (featuresTrigger && featuresMenu) {
        featuresTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            featuresMenu.classList.toggle('active');
            // 关闭其他菜单
            document.querySelector('.language-switcher')?.classList.remove('active');
            document.querySelector('.pilot-module')?.classList.remove('active');
        });
    }
    
    // 点击外部关闭菜单
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.features-menu')) {
            featuresMenu?.classList.remove('active');
        }
    });
}

// 导航到游戏页面
function navigateToGame() {
    const currentLang = localStorage.getItem('warkAI_language') || 'zh';
    const gamePages = {
        'zh': '/game.html',
        'en': '/game-en.html',
        'ja': '/game-ja.html'
    };
    window.location.href = gamePages[currentLang];
}

// 导航到手势控制页面
function navigateToGesture() {
    window.location.href = '/gesture-demo.html';
}

// 打开AI助手
function openAIAssistant() {
    const modal = document.getElementById('modalOverlay');
    if (!modal) {
        console.warn('模态框容器不存在');
        return;
    }
    
    const aiContent = `
        <div class="modal-header">
            <h2 class="modal-title">
                <span class="menu-icon">🤖</span>
                AI助手
            </h2>
            <p class="modal-subtitle">由轻量级大模型驱动的智能助手</p>
            <button class="modal-close" onclick="closeAIAssistant()">✕</button>
        </div>
        <div class="modal-body ai-assistant-body">
            <div class="ai-chat-container">
                <div class="ai-chat-history" id="aiChatHistory">
                    <div class="ai-message system">
                        <span class="message-icon">🤖</span>
                        <span class="message-text">你好！我是WarkAI的AI助手。我可以帮助您了解WarkAI的功能、团队信息和商业计划。有什么我可以帮助您的吗？</span>
                    </div>
                </div>
                <div class="ai-chat-input-container">
                    <input type="text" id="aiInput" class="ai-chat-input" placeholder="输入您的问题..." />
                    <button class="ai-send-btn" onclick="sendAIMessage()">发送</button>
                </div>
            </div>
        </div>
    `;
    
    const modalContainer = document.getElementById('modalContainer');
    if (modalContainer) {
        modalContainer.innerHTML = aiContent;
        modal.classList.add('active');
        
        // 绑定回车键发送
        const aiInput = document.getElementById('aiInput');
        if (aiInput) {
            aiInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendAIMessage();
                }
            });
            aiInput.focus();
        }
    }
}

// 关闭AI助手
function closeAIAssistant() {
    const modal = document.getElementById('modalOverlay');
    if (modal) {
        modal.classList.remove('active');
    }
}

// 发送AI消息
async function sendAIMessage() {
    const aiInput = document.getElementById('aiInput');
    const aiChatHistory = document.getElementById('aiChatHistory');
    
    if (!aiInput || !aiChatHistory) return;
    
    const message = aiInput.value.trim();
    if (!message) return;
    
    // 添加用户消息
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'ai-message user';
    userMessageDiv.innerHTML = `
        <span class="message-icon">👤</span>
        <span class="message-text">${escapeHtml(message)}</span>
    `;
    aiChatHistory.appendChild(userMessageDiv);
    aiInput.value = '';
    
    // 滚动到底部
    aiChatHistory.scrollTop = aiChatHistory.scrollHeight;
    
    // 显示加载状态
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'ai-message system loading';
    loadingDiv.innerHTML = '<span class="loading-dots">●●●</span>';
    aiChatHistory.appendChild(loadingDiv);
    aiChatHistory.scrollTop = aiChatHistory.scrollHeight;
    
    try {
        // 调用AI API
        const response = await callAIAPI(message);
        
        // 移除加载状态
        loadingDiv.remove();
        
        // 添加AI回复
        const aiMessageDiv = document.createElement('div');
        aiMessageDiv.className = 'ai-message system';
        aiMessageDiv.innerHTML = `
            <span class="message-icon">🤖</span>
            <span class="message-text">${escapeHtml(response)}</span>
        `;
        aiChatHistory.appendChild(aiMessageDiv);
        aiChatHistory.scrollTop = aiChatHistory.scrollHeight;
    } catch (error) {
        console.error('AI API错误:', error);
        loadingDiv.remove();
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'ai-message system error';
        errorDiv.innerHTML = `
            <span class="message-icon">⚠️</span>
            <span class="message-text">抱歉，我遇到了一个错误。请稍后重试。</span>
        `;
        aiChatHistory.appendChild(errorDiv);
        aiChatHistory.scrollTop = aiChatHistory.scrollHeight;
    }
}

// 调用AI API
async function callAIAPI(message) {
    // 这里会被替换为实际的AI API调用
    // 暂时返回模拟响应
    return new Promise((resolve) => {
        setTimeout(() => {
            const responses = [
                'WarkAI是一个创新的人机智能平台，致力于推动AI与人类的协作。',
                '我们的团队由AI专家、设计师和工程师组成，共同为您提供最好的体验。',
                '我们的商业计划包括企业解决方案、教育培训和开源社区支持。',
                '您可以通过游戏、手势控制等多种方式与我们的平台交互。',
                '感谢您对WarkAI的关注！有什么具体问题我可以帮您解答吗？'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            resolve(randomResponse);
        }, 800);
    });
}

// 转义HTML特殊字符
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initFeaturesMenu();
});

console.log('✓ 功能菜单模块已加载');
