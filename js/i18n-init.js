// i18n Initialization and Management
class I18nManager {
    constructor() {
        this.currentLanguage = this.getStoredLanguage() || 'zh';
        this.translations = {};
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.applyLanguage(this.currentLanguage);
        this.setupLanguageSwitcher();
    }

    async loadTranslations() {
        try {
            const languages = ['zh', 'en', 'ja'];
            for (const lang of languages) {
                const response = await fetch(`/locales/${lang}.json`);
                this.translations[lang] = await response.json();
            }
        } catch (error) {
            console.error('Failed to load translations:', error);
        }
    }

    getStoredLanguage() {
        return localStorage.getItem('preferredLanguage');
    }

    setStoredLanguage(lang) {
        localStorage.setItem('preferredLanguage', lang);
    }

    applyLanguage(lang) {
        if (!this.translations[lang]) {
            console.warn(`Language ${lang} not available`);
            return;
        }

        this.currentLanguage = lang;
        this.setStoredLanguage(lang);

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const text = this.getTranslation(key);
            if (text) {
                element.textContent = text;
            }
        });

        // Update all elements with data-i18n-html attribute
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            const html = this.getTranslation(key);
            if (html) {
                element.innerHTML = html;
            }
        });

        // Update page language attribute
        document.documentElement.lang = lang;
        
        // Update language switcher display
        this.updateLanguageSwitcher();
    }

    getTranslation(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLanguage];
        
        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return null;
            }
        }
        
        return value;
    }

    setupLanguageSwitcher() {
        const langCurrent = document.getElementById('langCurrent');

        // 注意：lang-option元素已通过onclick属性处理，无需重复添加事件监听器
        // 这里只需要确保switchLanguage全局函数可用（已在下方定义）
    }

    switchLanguage(lang) {
        this.applyLanguage(lang);
        
        // Close the dropdown
        const switcher = document.querySelector('.language-switcher');
        if (switcher) {
            switcher.classList.remove('active');
        }

        // Update URL if needed (optional)
        // window.history.pushState({}, '', `?lang=${lang}`);
    }

    updateLanguageSwitcher() {
        const langCurrent = document.getElementById('langCurrent');
        if (!langCurrent) return;

        const langMap = {
            'zh': { flag: '🇨🇳', name: '中文' },
            'en': { flag: '🇺🇸', name: 'English' },
            'ja': { flag: '🇯🇵', name: '日本語' }
        };

        const current = langMap[this.currentLanguage];
        if (current) {
            langCurrent.innerHTML = `
                <span class="lang-flag">${current.flag}</span>
                <span class="lang-name">${current.name}</span>
                <span class="lang-arrow">▼</span>
            `;
        }
    }

    // Helper function to get translation for use in JavaScript
    t(key) {
        return this.getTranslation(key) || key;
    }
}

// Initialize i18n when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.i18n = new I18nManager();
    });
} else {
    window.i18n = new I18nManager();
}

// Global function for backward compatibility
function switchLanguage(lang) {
    if (window.i18n) {
        window.i18n.switchLanguage(lang);
    }
}
