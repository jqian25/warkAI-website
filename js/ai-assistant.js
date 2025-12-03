/**
 * WarkAI AI Assistant Module
 * 管理AI助手的UI交互和LLM集成
 */

class AIAssistant {
    constructor() {
        this.isOpen = false;
        this.currentLanguage = 'zh';
        this.isWaitingForResponse = false;
        this.messageContainer = null;
        this.inputField = null;
        this.sendButton = null;
        this.modal = null;
    }

    /**
     * 初始化AI助手
     */
    init() {
        this.messageContainer = document.getElementById('aiChatHistory');
        this.inputField = document.getElementById('aiInput');
        this.sendButton = document.querySelector('.ai-send-btn');
        this.modal = document.getElementById('modalOverlay');

        if (!this.messageContainer || !this.inputField || !this.sendButton) {
            console.warn('AI助手元素未找到');
            return;
        }

        // 绑定事件
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // 初始化LLM引擎
        if (typeof aiLLMEngine !== 'undefined') {
            aiLLMEngine.initialize().catch(err => {
                console.warn('LLM引擎初始化失败，使用模拟模式:', err);
            });
        }

        console.log('✓ AI助手初始化完成');
    }

    /**
     * 打开AI助手
     */
    open() {
        if (this.modal) {
            this.modal.style.display = 'flex';
            this.isOpen = true;
            // 自动聚焦输入框
            setTimeout(() => {
                if (this.inputField) {
                    this.inputField.focus();
                }
            }, 100);
        }
    }

    /**
     * 关闭AI助手
     */
    close() {
        if (this.modal) {
            this.modal.style.display = 'none';
            this.isOpen = false;
        }
    }

    /**
     * 发送消息
     */
    async sendMessage() {
        const message = this.inputField.value.trim();
        
        if (!message || this.isWaitingForResponse) {
            return;
        }

        // 清空输入框
        this.inputField.value = '';

        // 显示用户消息
        this.addMessage(message, 'user');

        // 显示加载状态
        this.isWaitingForResponse = true;
        this.addLoadingMessage();

        try {
            // 获取AI回复
            const response = await aiLLMEngine.sendMessage(message, this.currentLanguage);
            
            // 移除加载消息
            this.removeLoadingMessage();
            
            // 显示AI回复
            this.addMessage(response, 'system');
        } catch (error) {
            console.error('获取AI回复失败:', error);
            
            // 移除加载消息
            this.removeLoadingMessage();
            
            // 显示错误消息
            const errorMsg = this.currentLanguage === 'zh' 
                ? '抱歉，我遇到了一个问题。请稍后再试。'
                : 'Sorry, I encountered an error. Please try again later.';
            this.addMessage(errorMsg, 'error');
        } finally {
            this.isWaitingForResponse = false;
        }
    }

    /**
     * 添加消息到聊天历史
     */
    addMessage(text, type = 'system') {
        if (!this.messageContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${type}`;

        const iconSpan = document.createElement('span');
        iconSpan.className = 'message-icon';
        
        if (type === 'user') {
            iconSpan.textContent = '👤';
        } else if (type === 'system') {
            iconSpan.textContent = '🤖';
        } else if (type === 'error') {
            iconSpan.textContent = '⚠️';
        }

        const textSpan = document.createElement('span');
        textSpan.className = 'message-text';
        textSpan.textContent = text;

        messageDiv.appendChild(iconSpan);
        messageDiv.appendChild(textSpan);
        this.messageContainer.appendChild(messageDiv);

        // 自动滚动到底部
        this.scrollToBottom();
    }

    /**
     * 添加加载消息
     */
    addLoadingMessage() {
        if (!this.messageContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'ai-message system loading';
        messageDiv.id = 'ai-loading-message';

        const iconSpan = document.createElement('span');
        iconSpan.className = 'message-icon';
        iconSpan.textContent = '🤖';

        const textSpan = document.createElement('span');
        textSpan.className = 'message-text';
        
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'ai-loading';
        loadingDiv.innerHTML = '<span></span><span></span><span></span>';
        
        textSpan.appendChild(loadingDiv);

        messageDiv.appendChild(iconSpan);
        messageDiv.appendChild(textSpan);
        this.messageContainer.appendChild(messageDiv);

        // 自动滚动到底部
        this.scrollToBottom();
    }

    /**
     * 移除加载消息
     */
    removeLoadingMessage() {
        const loadingMsg = document.getElementById('ai-loading-message');
        if (loadingMsg) {
            loadingMsg.remove();
        }
    }

    /**
     * 滚动到底部
     */
    scrollToBottom() {
        if (this.messageContainer) {
            setTimeout(() => {
                this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
            }, 0);
        }
    }

    /**
     * 设置语言
     */
    setLanguage(lang) {
        this.currentLanguage = lang;
    }

    /**
     * 清除聊天历史
     */
    clearHistory() {
        if (this.messageContainer) {
            this.messageContainer.innerHTML = '';
        }
        if (typeof aiLLMEngine !== 'undefined') {
            aiLLMEngine.clearHistory();
        }
    }
}

// 创建全局AI助手实例
const aiAssistant = new AIAssistant();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    aiAssistant.init();
});

/**
 * 全局函数：打开AI助手
 */
function openAIAssistant() {
    aiAssistant.open();
}

/**
 * 全局函数：关闭AI助手
 */
function closeAIAssistant() {
    aiAssistant.close();
}

/**
 * 全局函数：切换语言时更新AI助手
 */
function updateAIAssistantLanguage(lang) {
    if (typeof aiAssistant !== 'undefined') {
        aiAssistant.setLanguage(lang);
    }
}
