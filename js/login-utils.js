// 登录页面工具函数

// 初始化时钟
function initClock() {
    function updateClock() {
        const now = new Date();
        const timeString = now.toTimeString().split(' ')[0];
        const clockElement = document.getElementById('hudTime');
        if (clockElement) {
            clockElement.textContent = timeString;
        }
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

// 初始化输入框
function initInputs() {
    const pilotIdInput = document.getElementById('pilotId');
    const accessCodeInput = document.getElementById('accessCode');
    const loginForm = document.getElementById('loginForm');
    
    // 输入框焦点效果
    if (pilotIdInput) {
        pilotIdInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        pilotIdInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    }
    
    if (accessCodeInput) {
        accessCodeInput.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        accessCodeInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    }
    
    // 表单提交
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const pilotId = pilotIdInput?.value.trim();
            const accessCode = accessCodeInput?.value.trim();
            
            if (!pilotId || !accessCode) {
                alert('Please enter both Pilot ID and Access Code');
                return;
            }
            
            // 模拟登录
            const loginButton = document.getElementById('loginButton');
            if (loginButton) {
                loginButton.textContent = 'AUTHENTICATING...';
                loginButton.disabled = true;
                
                setTimeout(() => {
                    alert('Authentication successful! Redirecting to main system...');
                    window.location.href = 'index-en.html';
                }, 2000);
            }
        });
    }
}

// 语言切换功能
function initLanguageSwitcher() {
    const langCurrent = document.getElementById('langCurrent');
    const langDropdown = document.getElementById('langDropdown');
    
    if (langCurrent && langDropdown) {
        langCurrent.addEventListener('click', function() {
            langDropdown.classList.toggle('active');
        });
        
        // 点击外部关闭下拉菜单
        document.addEventListener('click', function(e) {
            if (!langCurrent.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.remove('active');
            }
        });
    }
}
