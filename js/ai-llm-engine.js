/**
 * WarkAI AI LLM Engine
 * 集成WebLLM框架和Phi-3 Mini模型
 * 支持中文和英文对话
 */

class AILLMEngine {
    constructor() {
        this.engine = null;
        this.isLoading = false;
        this.isInitialized = false;
        this.selectedModel = 'Phi-3-mini-4k-instruct-q4f32_1-MLC';
        this.conversationHistory = [];
        this.maxHistoryLength = 10;
    }

    /**
     * 初始化WebLLM引擎
     */
    async initialize() {
        if (this.isInitialized) return;
        if (this.isLoading) return;

        this.isLoading = true;
        try {
            // 动态导入WebLLM库
            const { MLCEngine } = await import('https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@latest');
            
            // 创建引擎实例
            this.engine = new MLCEngine({
                model: this.selectedModel,
                appConfig: {
                    model_list: [
                        {
                            model_url: 'https://huggingface.co/mlc-ai/Phi-3-mini-4k-instruct-q4f32_1-MLC/resolve/main/',
                            model_id: 'Phi-3-mini-4k-instruct-q4f32_1-MLC',
                            model_lib_url: 'https://cdn.jsdelivr.net/npm/@mlc-ai/web-llm@latest/dist/phi3-mini-q4f32_1-ctx4k-webgpu.wasm',
                        }
                    ]
                }
            });

            this.isInitialized = true;
            console.log('✓ WebLLM引擎初始化成功');
            return true;
        } catch (error) {
            console.error('✗ WebLLM引擎初始化失败:', error);
            // 如果WebLLM加载失败，使用本地模拟模式
            this.useLocalMockMode();
            return false;
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * 使用本地模拟模式（当WebLLM不可用时）
     */
    useLocalMockMode() {
        console.log('⚠ 使用本地模拟模式');
        this.isInitialized = true;
        this.useMockMode = true;
    }

    /**
     * 发送消息并获取AI回复
     */
    async sendMessage(userMessage, language = 'zh') {
        if (!this.isInitialized) {
            await this.initialize();
        }

        // 添加用户消息到历史记录
        this.conversationHistory.push({
            role: 'user',
            content: userMessage,
            timestamp: new Date()
        });

        // 限制历史记录长度
        if (this.conversationHistory.length > this.maxHistoryLength) {
            this.conversationHistory.shift();
        }

        try {
            if (this.useMockMode) {
                // 使用模拟模式
                return await this.getMockResponse(userMessage, language);
            } else {
                // 使用真实WebLLM引擎
                return await this.getRealResponse(userMessage, language);
            }
        } catch (error) {
            console.error('获取AI回复失败:', error);
            return this.getErrorResponse(language);
        }
    }

    /**
     * 获取真实AI回复（使用WebLLM）
     */
    async getRealResponse(userMessage, language) {
        try {
            // 构建系统提示词
            const systemPrompt = this.getSystemPrompt(language);

            // 构建对话历史
            const messages = [
                { role: 'system', content: systemPrompt },
                ...this.conversationHistory.map(msg => ({
                    role: msg.role,
                    content: msg.content
                }))
            ];

            // 调用模型
            const response = await this.engine.chat.completions.create({
                messages: messages,
                temperature: 0.7,
                max_tokens: 512,
                top_p: 0.9,
            });

            const aiMessage = response.choices[0].message.content;

            // 添加AI回复到历史记录
            this.conversationHistory.push({
                role: 'assistant',
                content: aiMessage,
                timestamp: new Date()
            });

            return aiMessage;
        } catch (error) {
            console.error('WebLLM调用失败:', error);
            throw error;
        }
    }

    /**
     * 获取模拟AI回复（本地模式）
     */
    async getMockResponse(userMessage, language) {
        // 模拟延迟
        await new Promise(resolve => setTimeout(resolve, 500));

        const responses = {
            zh: {
                'warkAI是什么': 'WarkAI是一个融合AI、AR和机甲人技术的创新平台。我们致力于推动人机智能的新纪元，为用户提供沉浸式的体验和强大的AI助手。',
                '团队': 'WarkAI团队由来自全球的AI、AR和机械工程专家组成。我们致力于开发下一代人机交互技术。',
                '商业计划': 'WarkAI的商业计划包括：1) 开发AI驱动的AR平台 2) 创建机甲模拟游戏 3) 提供企业AI解决方案 4) 建立全球合作伙伴网络。',
                '功能': 'WarkAI提供：高达3D游戏、手势控制、AI助手、多语言支持、实时AR体验等功能。',
                '默认': '感谢您的问题！我是WarkAI的AI助手。我可以帮助您了解WarkAI的功能、团队信息和商业计划。请继续提问！'
            },
            en: {
                'what is warkAI': 'WarkAI is an innovative platform that combines AI, AR, and mecha technology. We are dedicated to advancing the new era of human-machine intelligence and providing users with immersive experiences and powerful AI assistance.',
                'team': 'The WarkAI team consists of AI, AR, and mechanical engineering experts from around the world. We are committed to developing next-generation human-machine interaction technologies.',
                'business plan': 'WarkAI\'s business plan includes: 1) Developing AI-driven AR platform 2) Creating mecha simulation games 3) Providing enterprise AI solutions 4) Building a global partnership network.',
                'features': 'WarkAI offers: Gundam 3D games, gesture control, AI assistant, multi-language support, real-time AR experience, and more.',
                'default': 'Thank you for your question! I am WarkAI\'s AI assistant. I can help you learn about WarkAI\'s features, team information, and business plans. Please feel free to ask!'
            }
        };

        const responseMap = responses[language] || responses['en'];
        const userLower = userMessage.toLowerCase();

        // 查找匹配的回复
        for (const [key, response] of Object.entries(responseMap)) {
            if (userLower.includes(key.toLowerCase())) {
                const aiMessage = response;
                this.conversationHistory.push({
                    role: 'assistant',
                    content: aiMessage,
                    timestamp: new Date()
                });
                return aiMessage;
            }
        }

        // 默认回复
        const defaultResponse = responseMap['默认'] || responseMap['default'];
        this.conversationHistory.push({
            role: 'assistant',
            content: defaultResponse,
            timestamp: new Date()
        });
        return defaultResponse;
    }

    /**
     * 获取错误回复
     */
    getErrorResponse(language) {
        const messages = {
            zh: '抱歉，我遇到了一个问题。请稍后再试。',
            en: 'Sorry, I encountered an error. Please try again later.'
        };
        return messages[language] || messages['en'];
    }

    /**
     * 获取系统提示词
     */
    getSystemPrompt(language) {
        const prompts = {
            zh: `你是WarkAI的AI助手。WarkAI是一个融合AI、AR和机甲人技术的创新平台。
            
关于WarkAI：
- 公司使命：推动人机智能的新纪元
- 核心技术：AI、AR、机甲模拟、手势识别
- 主要产品：高达3D游戏、AI助手、AR体验平台
- 团队：全球AI和AR专家组成的创新团队
- 商业计划：开发AI驱动的AR平台、创建机甲游戏、提供企业解决方案

请用友好、专业的语气回答用户的问题，并尽可能提供有用的信息。`,
            en: `You are WarkAI's AI assistant. WarkAI is an innovative platform that combines AI, AR, and mecha technology.

About WarkAI:
- Mission: Advancing the new era of human-machine intelligence
- Core Technologies: AI, AR, Mecha Simulation, Gesture Recognition
- Main Products: Gundam 3D Games, AI Assistant, AR Experience Platform
- Team: Global team of AI and AR experts
- Business Plan: Develop AI-driven AR platform, create mecha games, provide enterprise solutions

Please answer user questions in a friendly and professional manner, providing helpful information whenever possible.`
        };
        return prompts[language] || prompts['en'];
    }

    /**
     * 清除对话历史
     */
    clearHistory() {
        this.conversationHistory = [];
    }

    /**
     * 获取对话历史
     */
    getHistory() {
        return this.conversationHistory;
    }
}

// 创建全局AI引擎实例
const aiLLMEngine = new AILLMEngine();
