/**
 * 测试账号管理系统
 * 提供免注册的测试账号
 */

// 预设的测试账号
const TEST_ACCOUNTS = {
    'test_pilot_1': {
        username: 'test_pilot_1',
        password: 'test123',
        name: '测试驾驶员 1',
        name_en: 'Test Pilot 1',
        name_ja: 'テストパイロット 1',
        email: 'pilot1@warkai.local',
        status: 'authenticated',
        level: 'Captain',
        mecha: 'RX-78-2 Gundam',
        joinDate: '2025-01-01',
        avatar: '👤'
    },
    'test_pilot_2': {
        username: 'test_pilot_2',
        password: 'test123',
        name: '测试驾驶员 2',
        name_en: 'Test Pilot 2',
        name_ja: 'テストパイロット 2',
        email: 'pilot2@warkai.local',
        status: 'authenticated',
        level: 'Lieutenant',
        mecha: 'GM',
        joinDate: '2025-01-02',
        avatar: '👨‍✈️'
    },
    'test_pilot_3': {
        username: 'test_pilot_3',
        password: 'test123',
        name: '测试驾驶员 3',
        name_en: 'Test Pilot 3',
        name_ja: 'テストパイロット 3',
        email: 'pilot3@warkai.local',
        status: 'authenticated',
        level: 'Ensign',
        mecha: 'Zaku II',
        joinDate: '2025-01-03',
        avatar: '👩‍✈️'
    }
};

// 当前登录的账号
let currentAccount = null;

/**
 * 自动登录测试账号
 * @param {string} username - 用户名 (默认: test_pilot_1)
 */
function autoLoginTestAccount(username = 'test_pilot_1') {
    const account = TEST_ACCOUNTS[username];
    if (account) {
        currentAccount = {
            ...account,
            loginTime: new Date().toISOString()
        };
        localStorage.setItem('currentAccount', JSON.stringify(currentAccount));
        localStorage.setItem('isTestAccount', 'true');
        localStorage.setItem('testAccountUsername', username);
        console.log('✓ 自动登录测试账号:', username);
        return true;
    }
    return false;
}

/**
 * 获取当前登录账号
 */
function getCurrentAccount() {
    if (!currentAccount) {
        const stored = localStorage.getItem('currentAccount');
        if (stored) {
            try {
                currentAccount = JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse stored account:', e);
            }
        }
    }
    return currentAccount;
}

/**
 * 获取当前账号的显示名称
 * @param {string} language - 语言 ('zh', 'en', 'ja')
 */
function getAccountDisplayName(language = 'zh') {
    const account = getCurrentAccount();
    if (!account) return null;
    
    switch (language) {
        case 'en':
            return account.name_en || account.name;
        case 'ja':
            return account.name_ja || account.name;
        case 'zh':
        default:
            return account.name;
    }
}

/**
 * 检查是否为测试账号
 */
function isTestAccount() {
    return localStorage.getItem('isTestAccount') === 'true';
}

/**
 * 获取所有可用的测试账号列表
 */
function getAvailableTestAccounts() {
    return Object.keys(TEST_ACCOUNTS).map(key => ({
        username: key,
        ...TEST_ACCOUNTS[key]
    }));
}

/**
 * 注销当前账号
 */
function logoutAccount() {
    currentAccount = null;
    localStorage.removeItem('currentAccount');
    localStorage.removeItem('isTestAccount');
    localStorage.removeItem('testAccountUsername');
    console.log('✓ 已注销账号');
}

/**
 * 切换测试账号
 * @param {string} username - 新的用户名
 */
function switchTestAccount(username) {
    if (TEST_ACCOUNTS[username]) {
        autoLoginTestAccount(username);
        // 刷新页面以应用新账号
        location.reload();
        return true;
    }
    return false;
}

/**
 * 初始化测试账号系统
 * 页面加载时自动登录第一个测试账号
 */
function initializeTestAccountSystem() {
    const stored = localStorage.getItem('testAccountUsername');
    if (stored && TEST_ACCOUNTS[stored]) {
        autoLoginTestAccount(stored);
    } else {
        // 默认自动登录第一个测试账号
        autoLoginTestAccount('test_pilot_1');
    }
}

// 页面加载时自动初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTestAccountSystem);
} else {
    initializeTestAccountSystem();
}

// 导出函数供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TEST_ACCOUNTS,
        autoLoginTestAccount,
        getCurrentAccount,
        getAccountDisplayName,
        isTestAccount,
        getAvailableTestAccounts,
        logoutAccount,
        switchTestAccount,
        initializeTestAccountSystem
    };
}
