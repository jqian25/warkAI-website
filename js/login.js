// 初始化启动序列
function initBootSequence() {
    const startupSequence = document.getElementById('startupSequence');
    const mainContainer = document.getElementById('mainContainer');
    
    if (!startupSequence || !mainContainer) return;
    
    // 立即完成启动序列
    setTimeout(() => {
        // 隐藏启动序列 - 使用 cssText 确保所有样式都被应用
        startupSequence.style.cssText = `
            opacity: 0 !important;
            display: none !important;
            visibility: hidden !important;
            pointer-events: none !important;
            z-index: -1 !important;
        `;
        
        // 显示主容器 - 使用 cssText 确保所有样式都被应用
        mainContainer.style.cssText = `
            opacity: 1 !important;
            display: flex !important;
            visibility: visible !important;
            pointer-events: auto !important;
            z-index: 1 !important;
        `;
        mainContainer.classList.add('active');
        
        // 隐藏 modal-overlay（注册模态）
        const modalOverlay = document.getElementById('registrationModal');
        if (modalOverlay) {
            modalOverlay.style.cssText = `
                display: none !important;
                opacity: 0 !important;
                visibility: hidden !important;
                pointer-events: none !important;
                z-index: -1 !important;
            `;
        }
        
        // 初始化时钟
        initClock();
        
        // 初始化输入框功能
        initInputs();
        
        // 初始化扎古变形器
        if (typeof ZakuTransformer !== 'undefined') {
            window.zakuTransformer = new ZakuTransformer('zakuContainer');
        }
    }, 3000); // 3秒后自动完成
    
    // 状态项动画 (仅在中文版本中执行)
    const statusItems = document.querySelectorAll('.detail-line');
    if (statusItems && statusItems.length > 0) {
        statusItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 500);
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initBootSequence();
    
    // 登录表单提交
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const pilotId = document.getElementById('pilotId').value;
            const accessCode = document.getElementById('accessCode').value;
            
            if (pilotId && accessCode) {
                // 模拟登录成功
                window.location.href = 'index-en.html';
            }
        });
    }
    
    // 注册链接
    const registerLink = document.getElementById('registerLink');
    if (registerLink) {
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            openRegistrationModal();
        });
    }
});

// 打开注册模态
function openRegistrationModal() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.style.cssText = `
            display: flex !important;
            opacity: 1 !important;
            visibility: visible !important;
            pointer-events: auto !important;
            z-index: 1000 !important;
        `;
    }
}

// 关闭注册模态
function closeRegistrationModal() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.style.cssText = `
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
            z-index: -1 !important;
        `;
    }
}

// 初始化时钟
function initClock() {
    const hudTime = document.getElementById('hudTime');
    if (!hudTime) return;
    
    const updateTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        hudTime.textContent = `${hours}:${minutes}:${seconds}`;
    };
    
    updateTime();
    setInterval(updateTime, 1000);
}

// 初始化输入框功能
function initInputs() {
    const inputs = document.querySelectorAll('.login-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.borderColor = '#00ffff';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.borderColor = '#00a3ff';
        });
    });
}

// 语言切换
document.addEventListener('DOMContentLoaded', () => {
    const langCurrent = document.getElementById('langCurrent');
    const langDropdown = document.getElementById('langDropdown');
    
    if (langCurrent && langDropdown) {
        langCurrent.addEventListener('click', () => {
            langDropdown.style.display = langDropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language-switcher')) {
                langDropdown.style.display = 'none';
            }
        });
    }
});
