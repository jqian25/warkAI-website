// WarkAI 多语言国际化系统 - 暗黑机甲风格

class WarkAII18n {
    constructor() {
        this.currentLanguage = 'zh';
        this.translations = {};
        this.observers = [];
        this.init();
    }

    init() {
        this.loadTranslations();
        this.detectLanguage();
        this.setupLanguageSwitchers();
        this.applyTranslations();
    }

    // 加载翻译数据
    loadTranslations() {
        this.translations = {
            'zh': {
                // 通用
                'common': {
                    'loading': '加载中...',
                    'error': '错误',
                    'success': '成功',
                    'confirm': '确认',
                    'cancel': '取消',
                    'close': '关闭',
                    'back': '返回',
                    'next': '下一步',
                    'previous': '上一步',
                    'save': '保存',
                    'edit': '编辑',
                    'delete': '删除',
                    'view': '查看',
                    'download': '下载'
                },
                
                // 主页面
                'main': {
                    'title': 'WarkAI: 人机智能新纪元',
                    'subtitle': '融合AI、AR与机器人技术，重塑未来生产力',
                    'systemStatus': '系统状态',
                    'online': '在线',
                    'energy': '能量',
                    'coordinates': '坐标',
                    'version': 'WarkAI OS v2.5.0',
                    'instruction': '点击机体各部位，探索 WarkAI 商业计划',
                    'terminalTitle': 'GUNDAM-TERMINAL',
                    'terminalStatus': 'ACTIVE',
                    'bootComplete': '// WarkAI OS v2.5.0 启动完成',
                    'welcomeBack': '// 欢迎回来，驾驶员',
                    'mechaStatus': '// 机体状态: 最佳',
                    'missionBrief': '// 任务简报: 探索WarkAI商业计划书',
                    'selectModule': '// 请选择要查看的模块'
                },
                
                // 导航部件
                'navigation': {
                    'head': '团队介绍与愿景',
                    'core': '执行摘要与商业模式',
                    'arms': '核心产品线',
                    'legs': '市场应用与路线图',
                    'platform': 'WarkAI OS 核心技术与AI平台'
                },
                
                // 登录页面
                'login': {
                    'title': '系统认证',
                    'subtitle': '请输入您的凭据以访问WarkAI系统',
                    'username': '用户名',
                    'password': '密码',
                    'rememberMe': '记住登录状态',
                    'loginButton': '启动系统',
                    'forgotPassword': '忘记密码？',
                    'registerLink': '注册新账户',
                    'guestMode': '访客模式',
                    'systemInfo': '系统信息',
                    'systemVersion': '系统版本',
                    'buildVersion': '构建版本',
                    'securityLevel': '安全级别',
                    'onlineUsers': '在线用户',
                    'systemLoad': '系统负载',
                    'high': '高级',
                    'authMode': '认证模式',
                    'backToConsole': '返回主控制台'
                },
                
                // 启动序列
                'boot': {
                    'systemInit': '系统初始化',
                    'coreModules': '核心模块加载',
                    'securityProtocol': '安全协议激活',
                    'uiPreparation': '用户界面准备',
                    'authSystem': '认证系统就绪',
                    'waiting': '等待中...',
                    'inProgress': '进行中...',
                    'completed': '完成'
                },
                
                // HUD界面
                'hud': {
                    'dataTransmission': '数据传输中...',
                    'hologramDisplay': '全息显示',
                    'closeHologram': '关闭全息显示',
                    'fullscreenView': '全屏查看',
                    'scanningTarget': '扫描目标中...',
                    'targetLocked': '目标锁定',
                    'transforming': '变形中...',
                    'transformComplete': '变形完成'
                },
                
                // 数据可视化
                'charts': {
                    'marketSize': '市场规模',
                    'revenue': '营收预测',
                    'userGrowth': '用户增长',
                    'marketShare': '市场份额',
                    'investment': '投资分析',
                    'timeline': '发展时间线',
                    'competition': '竞争分析',
                    'technology': '技术指标',
                    'performance': '性能数据',
                    'efficiency': '效率提升'
                }
            },
            
            'en': {
                // Common
                'common': {
                    'loading': 'Loading...',
                    'error': 'Error',
                    'success': 'Success',
                    'confirm': 'Confirm',
                    'cancel': 'Cancel',
                    'close': 'Close',
                    'back': 'Back',
                    'next': 'Next',
                    'previous': 'Previous',
                    'save': 'Save',
                    'edit': 'Edit',
                    'delete': 'Delete',
                    'view': 'View',
                    'download': 'Download'
                },
                
                // Main page
                'main': {
                    'title': 'WarkAI: The New Era of Human-Machine Intelligence',
                    'subtitle': 'Integrating AI, AR and Robotics to Reshape Future Productivity',
                    'systemStatus': 'System Status',
                    'online': 'Online',
                    'energy': 'Energy',
                    'coordinates': 'Coordinates',
                    'version': 'WarkAI OS v2.5.0',
                    'instruction': 'Click on mecha parts to explore WarkAI business plan',
                    'terminalTitle': 'GUNDAM-TERMINAL',
                    'terminalStatus': 'ACTIVE',
                    'bootComplete': '// WarkAI OS v2.5.0 boot complete',
                    'welcomeBack': '// Welcome back, pilot',
                    'mechaStatus': '// Mecha status: Optimal',
                    'missionBrief': '// Mission brief: Explore WarkAI business plan',
                    'selectModule': '// Please select module to view'
                },
                
                // Navigation parts
                'navigation': {
                    'head': 'Team Introduction & Vision',
                    'core': 'Executive Summary & Business Model',
                    'arms': 'Core Product Lines',
                    'legs': 'Market Applications & Roadmap',
                    'platform': 'WarkAI OS Core Technology & AI Platform'
                },
                
                // Login page
                'login': {
                    'title': 'System Authentication',
                    'subtitle': 'Please enter your credentials to access WarkAI system',
                    'username': 'Username',
                    'password': 'Password',
                    'rememberMe': 'Remember login status',
                    'loginButton': 'Launch System',
                    'forgotPassword': 'Forgot password?',
                    'registerLink': 'Register new account',
                    'guestMode': 'Guest Mode',
                    'systemInfo': 'System Information',
                    'systemVersion': 'System Version',
                    'buildVersion': 'Build Version',
                    'securityLevel': 'Security Level',
                    'onlineUsers': 'Online Users',
                    'systemLoad': 'System Load',
                    'high': 'High',
                    'authMode': 'Auth Mode',
                    'backToConsole': 'Back to Main Console'
                },
                
                // Boot sequence
                'boot': {
                    'systemInit': 'System Initialization',
                    'coreModules': 'Core Modules Loading',
                    'securityProtocol': 'Security Protocol Activation',
                    'uiPreparation': 'UI Preparation',
                    'authSystem': 'Authentication System Ready',
                    'waiting': 'Waiting...',
                    'inProgress': 'In Progress...',
                    'completed': 'Completed'
                },
                
                // HUD interface
                'hud': {
                    'dataTransmission': 'Data transmission in progress...',
                    'hologramDisplay': 'Hologram Display',
                    'closeHologram': 'Close Hologram Display',
                    'fullscreenView': 'Fullscreen View',
                    'scanningTarget': 'Scanning target...',
                    'targetLocked': 'Target Locked',
                    'transforming': 'Transforming...',
                    'transformComplete': 'Transform Complete'
                },
                
                // Data visualization
                'charts': {
                    'marketSize': 'Market Size',
                    'revenue': 'Revenue Forecast',
                    'userGrowth': 'User Growth',
                    'marketShare': 'Market Share',
                    'investment': 'Investment Analysis',
                    'timeline': 'Development Timeline',
                    'competition': 'Competition Analysis',
                    'technology': 'Technology Metrics',
                    'performance': 'Performance Data',
                    'efficiency': 'Efficiency Improvement'
                }
            },
            
            'ja': {
                // 共通
                'common': {
                    'loading': '読み込み中...',
                    'error': 'エラー',
                    'success': '成功',
                    'confirm': '確認',
                    'cancel': 'キャンセル',
                    'close': '閉じる',
                    'back': '戻る',
                    'next': '次へ',
                    'previous': '前へ',
                    'save': '保存',
                    'edit': '編集',
                    'delete': '削除',
                    'view': '表示',
                    'download': 'ダウンロード'
                },
                
                // メインページ
                'main': {
                    'title': 'WarkAI: 人機知能新時代',
                    'subtitle': 'AI、AR、ロボット技術を融合し、未来の生産性を再構築',
                    'systemStatus': 'システム状態',
                    'online': 'オンライン',
                    'energy': 'エネルギー',
                    'coordinates': '座標',
                    'version': 'WarkAI OS v2.5.0',
                    'instruction': '機体各部をクリックして、WarkAIビジネスプランを探索',
                    'terminalTitle': 'GUNDAM-TERMINAL',
                    'terminalStatus': 'ACTIVE',
                    'bootComplete': '// WarkAI OS v2.5.0 起動完了',
                    'welcomeBack': '// おかえりなさい、パイロット',
                    'mechaStatus': '// 機体状態: 最適',
                    'missionBrief': '// ミッション概要: WarkAIビジネスプラン探索',
                    'selectModule': '// 表示するモジュールを選択してください'
                },
                
                // ナビゲーション部品
                'navigation': {
                    'head': 'チーム紹介とビジョン',
                    'core': 'エグゼクティブサマリーとビジネスモデル',
                    'arms': 'コア製品ライン',
                    'legs': '市場応用とロードマップ',
                    'platform': 'WarkAI OSコア技術とAIプラットフォーム'
                },
                
                // ログインページ
                'login': {
                    'title': 'システム認証',
                    'subtitle': 'WarkAIシステムにアクセスするための認証情報を入力してください',
                    'username': 'ユーザー名',
                    'password': 'パスワード',
                    'rememberMe': 'ログイン状態を記憶',
                    'loginButton': 'システム起動',
                    'forgotPassword': 'パスワードを忘れましたか？',
                    'registerLink': '新規アカウント登録',
                    'guestMode': 'ゲストモード',
                    'systemInfo': 'システム情報',
                    'systemVersion': 'システムバージョン',
                    'buildVersion': 'ビルドバージョン',
                    'securityLevel': 'セキュリティレベル',
                    'onlineUsers': 'オンラインユーザー',
                    'systemLoad': 'システム負荷',
                    'high': '高',
                    'authMode': '認証モード',
                    'backToConsole': 'メインコンソールに戻る'
                },
                
                // 起動シーケンス
                'boot': {
                    'systemInit': 'システム初期化',
                    'coreModules': 'コアモジュール読み込み',
                    'securityProtocol': 'セキュリティプロトコル有効化',
                    'uiPreparation': 'UI準備',
                    'authSystem': '認証システム準備完了',
                    'waiting': '待機中...',
                    'inProgress': '進行中...',
                    'completed': '完了'
                },
                
                // HUDインターフェース
                'hud': {
                    'dataTransmission': 'データ転送中...',
                    'hologramDisplay': 'ホログラム表示',
                    'closeHologram': 'ホログラム表示を閉じる',
                    'fullscreenView': 'フルスクリーン表示',
                    'scanningTarget': 'ターゲットスキャン中...',
                    'targetLocked': 'ターゲットロック',
                    'transforming': '変形中...',
                    'transformComplete': '変形完了'
                },
                
                // データ可視化
                'charts': {
                    'marketSize': '市場規模',
                    'revenue': '収益予測',
                    'userGrowth': 'ユーザー成長',
                    'marketShare': '市場シェア',
                    'investment': '投資分析',
                    'timeline': '開発タイムライン',
                    'competition': '競合分析',
                    'technology': '技術指標',
                    'performance': 'パフォーマンスデータ',
                    'efficiency': '効率向上'
                }
            }
        };
    }

    // 检测语言
    detectLanguage() {
        // 从localStorage获取保存的语言设置
        const savedLang = localStorage.getItem('warkAI_language');
        if (savedLang && this.translations[savedLang]) {
            this.currentLanguage = savedLang;
            return;
        }

        // 从浏览器语言检测
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('zh')) {
            this.currentLanguage = 'zh';
        } else if (browserLang.startsWith('ja')) {
            this.currentLanguage = 'ja';
        } else {
            this.currentLanguage = 'en';
        }
    }

    // 设置语言切换器
    setupLanguageSwitchers() {
        const langButtons = document.querySelectorAll('.lang-button');
        
        langButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = button.getAttribute('data-lang');
                this.switchLanguage(lang);
            });
        });

        // 更新当前语言按钮状态
        this.updateLanguageButtons();
    }

    // 切换语言
    switchLanguage(lang) {
        if (!this.translations[lang]) {
            console.warn(`Language ${lang} not supported`);
            return;
        }

        const oldLang = this.currentLanguage;
        this.currentLanguage = lang;
        
        // 保存到localStorage
        localStorage.setItem('warkAI_language', lang);
        
        // 应用翻译
        this.applyTranslations();
        
        // 更新语言按钮状态
        this.updateLanguageButtons();
        
        // 通知观察者
        this.notifyObservers(oldLang, lang);
        
        // 触发语言切换动画
        this.triggerLanguageChangeAnimation();
    }

    // 更新语言按钮状态
    updateLanguageButtons() {
        const langButtons = document.querySelectorAll('.lang-button');
        
        langButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-lang') === this.currentLanguage) {
                button.classList.add('active');
            }
        });
    }

    // 应用翻译
    applyTranslations() {
        // 更新所有带有data-i18n属性的元素
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // 更新页面特定的翻译
        this.updatePageSpecificTranslations();
    }

    // 更新页面特定翻译
    updatePageSpecificTranslations() {
        // 根据当前页面调用相应的更新函数
        if (window.location.pathname.includes('login.html')) {
            this.updateLoginPageTranslations();
        } else if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            this.updateMainPageTranslations();
        }

        // 调用页面特定的语言更新函数
        if (typeof window.updatePageLanguage === 'function') {
            window.updatePageLanguage(this.currentLanguage);
        }
    }

    // 更新主页面翻译
    updateMainPageTranslations() {
        const translations = this.translations[this.currentLanguage];
        
        // 更新标题
        const mainTitle = document.querySelector('.main-title');
        if (mainTitle) {
            mainTitle.textContent = translations.main.title;
        }
        
        // 更新副标题
        const subtitle = document.querySelector('.subtitle');
        if (subtitle) {
            subtitle.textContent = translations.main.subtitle;
        }
        
        // 更新导航部件标签
        const partLabels = {
            'navHead': translations.navigation.head,
            'navCore': translations.navigation.core,
            'navArms': translations.navigation.arms,
            'navLegs': translations.navigation.legs,
            'navPlatform': translations.navigation.platform
        };
        
        Object.entries(partLabels).forEach(([id, text]) => {
            const element = document.getElementById(id);
            if (element) {
                const label = element.querySelector('.part-label');
                if (label) {
                    label.textContent = text;
                }
            }
        });
        
        // 更新终端内容
        this.updateTerminalContent();
    }

    // 更新登录页面翻译
    updateLoginPageTranslations() {
        const translations = this.translations[this.currentLanguage];
        
        // 更新启动序列状态
        const bootStatuses = {
            'systemInit': translations.boot.systemInit,
            'coreModules': translations.boot.coreModules,
            'securityProtocol': translations.boot.securityProtocol,
            'uiPreparation': translations.boot.uiPreparation,
            'authSystem': translations.boot.authSystem
        };
        
        Object.entries(bootStatuses).forEach(([id, text]) => {
            const element = document.querySelector(`[data-status="${id}"]`);
            if (element) {
                element.textContent = text;
            }
        });
    }

    // 更新终端内容
    updateTerminalContent() {
        const terminalContent = document.getElementById('terminalContent');
        if (!terminalContent) return;
        
        const translations = this.translations[this.currentLanguage];
        
        const terminalLines = [
            translations.main.bootComplete,
            translations.main.welcomeBack,
            translations.main.mechaStatus,
            translations.main.missionBrief,
            translations.main.selectModule
        ];
        
        terminalContent.innerHTML = '';
        
        terminalLines.forEach((line, index) => {
            setTimeout(() => {
                const lineElement = document.createElement('div');
                lineElement.className = 'terminal-line';
                lineElement.textContent = line;
                terminalContent.appendChild(lineElement);
                
                // 添加光标
                if (index === terminalLines.length - 1) {
                    const cursor = document.createElement('div');
                    cursor.className = 'terminal-line terminal-cursor';
                    cursor.textContent = '_';
                    terminalContent.appendChild(cursor);
                }
            }, index * 500);
        });
    }

    // 获取翻译文本
    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }
        
        return translation;
    }

    // 触发语言切换动画
    triggerLanguageChangeAnimation() {
        // 创建语言切换视觉效果
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, rgba(0, 163, 255, 0.1), rgba(255, 60, 60, 0.1));
            z-index: 9999;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(overlay);
        
        // 显示效果
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
        
        // 隐藏效果
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 300);
        }, 200);
        
        // 添加文字闪烁效果
        const textElements = document.querySelectorAll('h1, h2, h3, .part-label, .terminal-line');
        textElements.forEach(element => {
            element.style.animation = 'textFlicker 0.5s ease-in-out';
        });
        
        setTimeout(() => {
            textElements.forEach(element => {
                element.style.animation = '';
            });
        }, 500);
    }

    // 添加观察者
    addObserver(callback) {
        this.observers.push(callback);
    }

    // 移除观察者
    removeObserver(callback) {
        const index = this.observers.indexOf(callback);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    // 通知观察者
    notifyObservers(oldLang, newLang) {
        this.observers.forEach(callback => {
            try {
                callback(oldLang, newLang);
            } catch (error) {
                console.error('Observer callback error:', error);
            }
        });
    }

    // 获取当前语言
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // 获取支持的语言列表
    getSupportedLanguages() {
        return Object.keys(this.translations);
    }
}

// 添加文字闪烁动画CSS
if (!document.querySelector('#i18n-styles')) {
    const style = document.createElement('style');
    style.id = 'i18n-styles';
    style.textContent = `
        @keyframes textFlicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        
        .lang-button {
            padding: 5px 10px;
            margin: 0 2px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 3px;
            color: #a0a0a0;
            font-size: 0.8em;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .lang-button:hover {
            background: rgba(0, 163, 255, 0.2);
            border-color: #00a3ff;
            color: #ffffff;
        }
        
        .lang-button.active {
            background: rgba(255, 60, 60, 0.3);
            border-color: #ff3c3c;
            color: #ffffff;
            box-shadow: 0 0 10px rgba(255, 60, 60, 0.5);
        }
    `;
    document.head.appendChild(style);
}

// 全局变量
let warkAII18n;

// 初始化国际化系统
document.addEventListener('DOMContentLoaded', () => {
    warkAII18n = new WarkAII18n();
    
    // 将实例添加到全局作用域
    window.warkAII18n = warkAII18n;
});

// 导出类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WarkAII18n;
}
