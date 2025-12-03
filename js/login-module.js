/**
 * 登录模块 - 独立实现
 * 用于处理登录系统的显示和交互
 */

// 全局函数 - 显示登录模态框
function showLogin() {
    if (!pilotModule) {
        console.warn('pilotModule 未初始化');
        return;
    }
    
    const loginContent = `
        <div class="modal-header">
            <h2 class="modal-title">
                <span class="menu-icon">🔐</span>
                登录系统
            </h2>
            <p class="modal-subtitle">登录以访问更多功能</p>
            <button class="modal-close">✕</button>
        </div>
        <div class="modal-body">
            <form id="loginForm">
                <div class="form-group">
                    <label class="form-label">驾驶员姓名</label>
                    <input type="text" class="form-input" id="loginName" placeholder="请输入您的姓名" required>
                </div>
                <div class="form-group">
                    <label class="form-label">邮箱地址</label>
                    <input type="email" class="form-input" id="loginEmail" placeholder="请输入邮箱地址" required>
                </div>
                <div class="form-group">
                    <label class="form-label">密码</label>
                    <input type="password" class="form-input" id="loginPassword" placeholder="请输入密码" required>
                </div>
                <div class="modal-footer">
                    <button type="button" class="form-button secondary" onclick="pilotModule.closeModal()">取消</button>
                    <button type="submit" class="form-button">登录</button>
                </div>
            </form>
        </div>
    `;
    
    // 直接调用showModal方法
    if (pilotModule && pilotModule.showModal) {
        pilotModule.showModal(loginContent);
        
        setTimeout(() => {
            const form = document.getElementById('loginForm');
            if (form) {
                form.addEventListener('submit', (e) => submitLogin(e));
            }
        }, 100);
    }
}

// 提交登录表单
function submitLogin(e) {
    e.preventDefault();
    
    const name = document.getElementById('loginName').value;
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!name || !email || !password) {
        alert('请填写所有必填项！');
        return;
    }
    
    const userData = {
        name: name,
        email: email,
        password: password,
        loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('warkAI_user', JSON.stringify(userData));
    
    if (pilotModule) {
        pilotModule.currentUser = userData;
        pilotModule.isLoggedIn = true;
        pilotModule.updateUI();
        pilotModule.closeModal();
    }
    
    alert('登录成功！');
}

console.log('✓ 登录模块已加载');
