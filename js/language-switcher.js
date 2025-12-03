// 语言切换器脚本
console.log('[Language Switcher] Initializing...');
function initLanguageSwitcher() {
    console.log('[Language Switcher] initLanguageSwitcher called');
    const langCurrent = document.getElementById('langCurrent');
    const languageSwitcher = document.querySelector('.language-switcher');
    
    if (!langCurrent || !languageSwitcher) {
        console.log('[Language Switcher] Elements not found. langCurrent:', !!langCurrent, 'languageSwitcher:', !!languageSwitcher);
        // 如果元素还未加载，等待 DOMContentLoaded
        if (document.readyState === 'loading') {
            console.log('[Language Switcher] Waiting for DOMContentLoaded...');
            document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
        }
        return;
    }
    console.log('[Language Switcher] Elements found, attaching event listeners...');
    
    // 语言映射
    const langMap = {
        'zh': { flag: '🇨🇳', name: '中文' },
        'en': { flag: '🇺🇸', name: 'English' },
        'ja': { flag: '🇯🇵', name: '日本語' }
    };
    
    // 点击语言选择器按钮时切换下拉菜单
    langCurrent.addEventListener('click', function(e) {
        e.stopPropagation();
        languageSwitcher.classList.toggle('active');
    });
    
    // 点击页面其他地方时关闭下拉菜单
    document.addEventListener('click', function(e) {
        if (!languageSwitcher.contains(e.target)) {
            languageSwitcher.classList.remove('active');
        }
    });
    
    // 点击语言选项时切换语言
    const langOptions = document.querySelectorAll('.lang-option');
    console.log('[Language Switcher] Found', langOptions.length, 'language options');
    langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            console.log('[Language Switcher] Language option clicked:', this.getAttribute('data-lang'));
            e.preventDefault();
            e.stopPropagation();
            
            const targetLang = this.getAttribute('data-lang');
            if (!targetLang) return;
            
            // 调用全局switchLanguage函数
            if (typeof switchLanguage === 'function') {
                switchLanguage(targetLang);
            } else if (window.i18n && typeof window.i18n.switchLanguage === 'function') {
                window.i18n.switchLanguage(targetLang);
            }
            
            // 更新当前语言显示
            const langInfo = langMap[targetLang];
            if (langInfo) {
                langCurrent.textContent = `${langInfo.flag} ${langInfo.name} ▼`;
            }
            
            // 保存语言选择到localStorage
            localStorage.setItem('selectedLanguage', targetLang);
            
            // 关闭下拉菜单
            languageSwitcher.classList.remove('active');
        });
    });
}

// 立即初始化或等待 DOM 准备好
console.log('[Language Switcher] Script loaded. document.readyState:', document.readyState);
if (document.readyState === 'loading') {
    console.log('[Language Switcher] DOM is still loading, waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
} else {
    console.log('[Language Switcher] DOM is ready, initializing immediately...');
    initLanguageSwitcher();
}
