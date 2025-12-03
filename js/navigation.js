// WarkAI 导航模块 - 统一处理页面导航和返回功能

class WarkAINavigation {
    constructor() {
        this.currentLanguage = localStorage.getItem('warkAI-language') || 'zh';
        this.translations = {
            'zh': {
                'transforming': '变形中...',
                'returning': '返回主控制台...',
                'navigationMode': '导航模式',
                'mainConsoleMode': '主控制台模式',
                'transformComplete': '变形完成',
                'systemOnline': '系统在线'
            },
            'en': {
                'transforming': 'Transforming...',
                'returning': 'Returning to Main Console...',
                'navigationMode': 'Navigation Mode',
                'mainConsoleMode': 'Main Console Mode',
                'transformComplete': 'Transform Complete',
                'systemOnline': 'System Online'
            },
            'ja': {
                'transforming': '変形中...',
                'returning': 'メインコンソールに戻ります...',
                'navigationMode': 'ナビゲーションモード',
                'mainConsoleMode': 'メインコンソールモード',
                'transformComplete': '変形完了',
                'systemOnline': 'システムオンライン'
            }
        };
        
        this.init();
    }
    
    init() {
        this.initBackButton();
        this.initLanguageSwitcher();
        this.initHudTime();
        this.updateLanguage(this.currentLanguage);
    }
    
    // 初始化返回按钮功能
    initBackButton() {
        const backButton = document.getElementById('backButton');
        if (!backButton) return;
        
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.navigateToMain();
        });
    }
    
    // 导航到主页面
    navigateToMain() {
        const transformOverlay = document.getElementById('transformOverlay');
        const transformPart = document.getElementById('transformPart');
        const transformText = document.getElementById('transformText');
        const transformMode = document.getElementById('transformMode');
        const transformProgress = document.getElementById('transformProgress');
        
        if (!transformOverlay) {
            // 如果没有变形覆盖层，直接返回主页
            window.location.href = '../index.html';
            return;
        }
        
        // 设置变形部件样式
        if (transformPart) {
            transformPart.style.backgroundImage = "url('../images/core_part.svg')";
            transformPart.style.backgroundSize = 'contain';
            transformPart.style.backgroundRepeat = 'no-repeat';
            transformPart.style.backgroundPosition = 'center';
        }
        
        // 设置变形文本
        if (transformText) {
            transformText.textContent = this.getTranslation('returning');
        }
        
        // 设置变形模式
        if (transformMode) {
            transformMode.textContent = this.getTranslation('mainConsoleMode');
        }
        
        // 显示变形覆盖层
        transformOverlay.style.display = 'flex';
        transformOverlay.style.opacity = '1';
        transformOverlay.style.pointerEvents = 'all';
        
        // 重置进度条
        if (transformProgress) {
            transformProgress.style.width = '0%';
            transformProgress.style.transition = 'width 1.5s ease-in-out';
        }
        
        // 使用setTimeout确保CSS过渡效果正常工作
        setTimeout(() => {
            if (transformProgress) {
                transformProgress.style.width = '100%';
            }
            
            // 添加变形动画
            if (typeof anime !== 'undefined' && transformPart) {
                anime({
                    targets: transformPart,
                    rotate: [0, 360],
                    scale: [0.5, 1, 0.8, 1.2, 1],
                    opacity: [0.5, 1, 0.8, 1],
                    duration: 2000,
                    easing: 'easeInOutQuad'
                });
            }
            
            // 变形完成后返回主页
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1500);
        }, 100);
    }
    
    // 初始化HUD时间显示
    initHudTime() {
        const hudTime = document.getElementById('hudTime');
        if (!hudTime) return;
        
        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            hudTime.textContent = `${hours}:${minutes}:${seconds}`;
        };
        
        // 立即更新一次
        updateTime();
        
        // 每秒更新一次
        setInterval(updateTime, 1000);
    }
    
    // 初始化语言切换器
    initLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-button');
        if (langButtons.length === 0) return;
        
        // 设置按钮状态
        langButtons.forEach(button => {
            const lang = button.getAttribute('data-lang');
            if (lang === this.currentLanguage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
            
            // 添加点击事件
            button.addEventListener('click', () => {
                this.switchLanguage(lang);
            });
        });
    }
    
    // 切换语言
    switchLanguage(langCode) {
        // 保存语言选择
        localStorage.setItem('warkAI-language', langCode);
        this.currentLanguage = langCode;
        
        // 更新按钮状态
        const langButtons = document.querySelectorAll('.lang-button');
        langButtons.forEach(button => {
            const lang = button.getAttribute('data-lang');
            if (lang === langCode) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        // 更新页面语言
        this.updateLanguage(langCode);
    }
    
    // 更新页面语言
    updateLanguage(langCode) {
        const trans = this.translations[langCode] || this.translations['zh'];
        
        // 更新返回按钮文本
        const backText = document.querySelector('.back-text');
        if (backText) {
            const backTranslations = {
                'zh': '返回主控制台',
                'en': 'Return to Main Console',
                'ja': 'メインコンソールに戻る'
            };
            backText.textContent = backTranslations[langCode] || backTranslations['zh'];
        }
        
        // 更新系统状态文本
        const statusLabel = document.querySelector('.hud-status');
        if (statusLabel) {
            const statusTranslations = {
                'zh': '系统状态',
                'en': 'System Status',
                'ja': 'システム状態'
            };
            const onlineTranslations = {
                'zh': '在线',
                'en': 'Online',
                'ja': 'オンライン'
            };
            statusLabel.innerHTML = `${statusTranslations[langCode]}: <span class="status-online">${onlineTranslations[langCode]}</span>`;
        }
        
        // 更新能量标签
        const energyLabel = document.querySelector('.energy-label');
        if (energyLabel) {
            const energyTranslations = {
                'zh': '能量',
                'en': 'Energy',
                'ja': 'エネルギー'
            };
            energyLabel.textContent = energyTranslations[langCode] || energyTranslations['zh'];
        }
        
        // 调用页面特定的语言更新函数
        if (typeof updatePageLanguage === 'function') {
            updatePageLanguage(langCode);
        }
    }
    
    // 获取翻译文本
    getTranslation(key) {
        return this.translations[this.currentLanguage][key] || this.translations['zh'][key] || key;
    }
    
    // 页面间导航
    navigateToPage(targetPage, partName = '核心') {
        const transformOverlay = document.getElementById('transformOverlay');
        const transformPart = document.getElementById('transformPart');
        const transformText = document.getElementById('transformText');
        const transformMode = document.getElementById('transformMode');
        const transformProgress = document.getElementById('transformProgress');
        
        if (!transformOverlay) {
            // 如果没有变形覆盖层，直接导航
            window.location.href = targetPage;
            return;
        }
        
        // 设置变形部件样式
        if (transformPart) {
            const partImages = {
                '头部': 'head_part.svg',
                '核心': 'core_part.svg',
                '手臂': 'arm_part.svg',
                '腿部': 'leg_part.svg',
                '机械坐台': 'platform_part.svg'
            };
            const imageName = partImages[partName] || 'core_part.svg';
            transformPart.style.backgroundImage = `url('../images/${imageName}')`;
        }
        
        // 设置变形文本
        if (transformText) {
            transformText.textContent = `${partName}${this.getTranslation('transforming')}`;
        }
        
        // 设置变形模式
        if (transformMode) {
            transformMode.textContent = `${partName}${this.getTranslation('navigationMode')}`;
        }
        
        // 显示变形覆盖层
        transformOverlay.style.display = 'flex';
        transformOverlay.style.opacity = '1';
        transformOverlay.style.pointerEvents = 'all';
        
        // 重置进度条
        if (transformProgress) {
            transformProgress.style.width = '0%';
        }
        
        // 模拟变形进度
        setTimeout(() => {
            if (transformProgress) {
                transformProgress.style.width = '100%';
            }
            
            // 添加变形动画
            if (typeof anime !== 'undefined' && transformPart) {
                anime({
                    targets: transformPart,
                    rotate: [0, 360],
                    scale: [0.5, 1, 0.8, 1.2, 1],
                    opacity: [0.5, 1, 0.8, 1],
                    duration: 2000,
                    easing: 'easeInOutQuad'
                });
            }
            
            // 变形完成后导航到目标页面
            setTimeout(() => {
                window.location.href = targetPage;
            }, 1500);
        }, 100);
    }
}

// 创建全局导航实例
let warkAINavigation;

// 页面加载完成后初始化导航
document.addEventListener('DOMContentLoaded', () => {
    warkAINavigation = new WarkAINavigation();
});

// 导出导航功能供其他脚本使用
window.WarkAINavigation = WarkAINavigation;
