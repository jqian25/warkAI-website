// WarkAI 多语言配置文件
const LanguageConfig = {
    // 中文配置
    zh: {
        code: 'zh',
        name: '中文',
        flag: '🇨🇳',
        pages: {
            index: 'index.html',
            team: 'pages/team.html',
            summary: 'pages/summary.html',
            products: 'pages/products.html',
            market: 'pages/market.html',
            technology: 'pages/technology.html',
            login: 'login.html'
        },
        ui: {
            systemStatus: '系统状态',
            online: '在线',
            energy: '能量',
            pilotModule: '驾驶员模块',
            login: '登录',
            logout: '登出',
            register: '注册',
            profile: '个人中心',
            feedback: '意见反馈',
            cooperation: '合作洽谈',
            guest: '访客驾驶员',
            unauthenticated: '未认证',
            authenticated: '已认证',
            clickToExplore: '点击机体各部位，探索 WarkAI 商业计划',
            transforming: '变形中...',
            systemInitializing: '系统初始化中...',
            coreLoading: '加载核心模块...',
            securityActivating: '激活安全协议...',
            uiPreparing: '准备用户界面...',
            authStarting: '启动认证系统...',
            startupComplete: '系统启动完成'
        }
    },

    // 英文配置
    en: {
        code: 'en',
        name: 'English',
        flag: '🇺🇸',
        pages: {
            index: 'index-en.html',
            team: 'pages/team-en.html',
            summary: 'pages/summary-en.html',
            products: 'pages/products-en.html',
            market: 'pages/market-en.html',
            technology: 'pages/technology-en.html',
            login: 'login-en.html'
        },
        ui: {
            systemStatus: 'System Status',
            online: 'Online',
            energy: 'Energy',
            pilotModule: 'Pilot Module',
            login: 'Login',
            logout: 'Logout',
            register: 'Register',
            profile: 'Profile',
            feedback: 'Feedback',
            cooperation: 'Cooperation',
            guest: 'Guest Pilot',
            unauthenticated: 'Unauthenticated',
            authenticated: 'Authenticated',
            clickToExplore: 'Click on mecha parts to explore WarkAI business plan',
            transforming: 'Transforming...',
            systemInitializing: 'System Initializing...',
            coreLoading: 'Loading Core Modules...',
            securityActivating: 'Activating Security Protocol...',
            uiPreparing: 'Preparing User Interface...',
            authStarting: 'Starting Authentication System...',
            startupComplete: 'System Startup Complete'
        }
    },

    // 日文配置
    ja: {
        code: 'ja',
        name: '日本語',
        flag: '🇯🇵',
        pages: {
            index: 'index-ja.html',
            team: 'pages/team-ja.html',
            summary: 'pages/summary-ja.html',
            products: 'pages/products-ja.html',
            market: 'pages/market-ja.html',
            technology: 'pages/technology-ja.html',
            login: 'login-ja.html'
        },
        ui: {
            systemStatus: 'システム状態',
            online: 'オンライン',
            energy: 'エネルギー',
            pilotModule: 'パイロットモジュール',
            login: 'ログイン',
            logout: 'ログアウト',
            register: '登録',
            profile: 'プロフィール',
            feedback: 'フィードバック',
            cooperation: '協力',
            guest: 'ゲストパイロット',
            unauthenticated: '未認証',
            authenticated: '認証済み',
            clickToExplore: 'メカの各部位をクリックして、WarkAIビジネスプランを探索',
            transforming: '変形中...',
            systemInitializing: 'システム初期化中...',
            coreLoading: 'コアモジュール読み込み中...',
            securityActivating: 'セキュリティプロトコル起動中...',
            uiPreparing: 'ユーザーインターフェース準備中...',
            authStarting: '認証システム起動中...',
            startupComplete: 'システム起動完了'
        }
    }
};

// 获取当前语言配置
function getCurrentLanguage() {
    const path = window.location.pathname;
    if (path.includes('-en.html')) return 'en';
    if (path.includes('-ja.html')) return 'ja';
    return 'zh';
}

// 获取语言配置
function getLanguageConfig(lang = null) {
    const currentLang = lang || getCurrentLanguage();
    return LanguageConfig[currentLang] || LanguageConfig.zh;
}

// 切换语言
function switchLanguage(targetLang) {
    const currentLang = getCurrentLanguage();
    if (currentLang === targetLang) return;
    
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop();
    
    // 确定当前页面类型
    let pageType = 'index';
    if (currentFile.includes('team')) pageType = 'team';
    else if (currentFile.includes('summary')) pageType = 'summary';
    else if (currentFile.includes('products')) pageType = 'products';
    else if (currentFile.includes('market')) pageType = 'market';
    else if (currentFile.includes('technology')) pageType = 'technology';
    else if (currentFile.includes('login')) pageType = 'login';
    
    // 获取目标语言的页面路径
    const targetConfig = LanguageConfig[targetLang];
    const targetPage = targetConfig.pages[pageType];
    
    // 跳转到目标页面
    window.location.href = targetPage;
}

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LanguageConfig, getCurrentLanguage, getLanguageConfig, switchLanguage };
}
