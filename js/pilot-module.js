// PilotModule 类 - 驾驶员模块管理系统
class PilotModule {
    constructor() {
        this.currentUser = null;
        this.isLoggedIn = false;
        this.init();
    }

    init() {
        this.initEventListeners();
        this.loadUserData();
        this.updateUI();
    }

    initEventListeners() {
        // 语言切换器事件
        const langCurrent = document.getElementById('langCurrent');
        const langDropdown = document.getElementById('langDropdown');
        
        if (langCurrent && langDropdown) {
            langCurrent.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelector('.language-switcher').classList.toggle('active');
            });
        }

        // 驾驶员模块事件
        const pilotTrigger = document.getElementById('pilotTrigger');
        const pilotDropdown = document.getElementById('pilotDropdown');
        
        if (pilotTrigger && pilotDropdown) {
            pilotTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelector('.pilot-module').classList.toggle('active');
            });
        }

        // 点击外部关闭下拉菜单
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language-switcher')) {
                document.querySelector('.language-switcher')?.classList.remove('active');
            }
            if (!e.target.closest('.pilot-module')) {
                document.querySelector('.pilot-module')?.classList.remove('active');
            }
        });

        // 模态框关闭事件
        const modalOverlay = document.getElementById('modalOverlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    this.closeModal();
                }
            });
        }

        // 菜单项点击事件
        const menuItems = document.querySelectorAll('[data-action]');
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const action = item.getAttribute('data-action');
                if (typeof this[action] === 'function') {
                    this[action]();
                }
            });
        });
    }

    loadUserData() {
        const userData = localStorage.getItem('warkAI_user');
        if (userData) {
            this.currentUser = JSON.parse(userData);
            this.isLoggedIn = true;
        }
    }

    updateUI() {
        // 更新驾驶员模块状态
        const pilotStatus = document.querySelector('.pilot-status');
        if (pilotStatus) {
            if (this.isLoggedIn && this.currentUser) {
                pilotStatus.textContent = this.currentUser.name || '驾驶员';
            } else {
                pilotStatus.textContent = '访客驾驶员';
            }
        }
    }

    showModal(content) {
        const modalOverlay = document.getElementById('modalOverlay');
        const modalContent = document.getElementById('modalContainer');
        
        if (modalContent) {
            modalContent.innerHTML = content;
            
            // 关闭按钮事件
            const closeBtn = modalContent.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeModal());
            }
        }
        
        if (modalOverlay) {
            modalOverlay.classList.add('active');
        }
    }

    closeModal() {
        const modalOverlay = document.getElementById('modalOverlay');
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    }

    showLogin() {
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
        this.showModal(loginContent);
        
        setTimeout(() => {
            const form = document.getElementById('loginForm');
            if (form) {
                form.addEventListener('submit', (e) => this.submitLogin(e));
            }
        }, 100);
    }

    submitLogin(e) {
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
        this.currentUser = userData;
        this.isLoggedIn = true;
        this.updateUI();
        this.closeModal();
        alert('登录成功！');
    }

    showProfile() {
        const profileContent = `
            <div class="modal-header">
                <h2 class="modal-title">
                    <span class="menu-icon">👤</span>
                    个人中心
                </h2>
                <p class="modal-subtitle">管理您的驾驶员档案</p>
                <button class="modal-close">✕</button>
            </div>
            <div class="modal-body">
                <form id="profileForm">
                    <div class="form-group">
                        <label class="form-label">驾驶员姓名</label>
                        <input type="text" class="form-input" id="userName" placeholder="请输入您的姓名" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">邮箱地址</label>
                        <input type="email" class="form-input" id="userEmail" placeholder="请输入邮箱地址" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">公司名称</label>
                        <input type="text" class="form-input" id="userCompany" placeholder="请输入公司名称">
                    </div>
                    <div class="form-group">
                        <label class="form-label">职位</label>
                        <input type="text" class="form-input" id="userPosition" placeholder="请输入您的职位">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="form-button secondary" onclick="pilotModule.closeModal()">取消</button>
                        <button type="submit" class="form-button">保存</button>
                    </div>
                </form>
            </div>
        `;
        this.showModal(profileContent);
        
        setTimeout(() => {
            const form = document.getElementById('profileForm');
            if (form) {
                form.addEventListener('submit', (e) => this.submitProfile(e));
            }
        }, 100);
    }

    submitProfile(e) {
        e.preventDefault();
        const userData = {
            name: document.getElementById('userName').value,
            email: document.getElementById('userEmail').value,
            company: document.getElementById('userCompany').value,
            position: document.getElementById('userPosition').value,
            lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem('warkAI_profile', JSON.stringify(userData));
        this.currentUser = userData;
        this.updateUI();
        this.closeModal();
        alert('个人信息已保存！');
    }

    showFeedback() {
        const feedbackContent = `
            <div class="modal-header">
                <h2 class="modal-title">
                    <span class="menu-icon">💬</span>
                    意见反馈
                </h2>
                <p class="modal-subtitle">我们很想听到您的意见</p>
                <button class="modal-close">✕</button>
            </div>
            <div class="modal-body">
                <form id="feedbackForm">
                    <div class="form-group">
                        <label class="form-label">您的邮箱</label>
                        <input type="email" class="form-input" id="feedbackEmail" placeholder="请输入您的邮箱" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">反馈主题</label>
                        <input type="text" class="form-input" id="feedbackSubject" placeholder="请输入反馈主题" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">反馈内容</label>
                        <textarea class="form-input" id="feedbackContent" rows="5" placeholder="请输入您的反馈内容" required></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="form-button secondary" onclick="pilotModule.closeModal()">取消</button>
                        <button type="submit" class="form-button">提交</button>
                    </div>
                </form>
            </div>
        `;
        this.showModal(feedbackContent);
        
        setTimeout(() => {
            const form = document.getElementById('feedbackForm');
            if (form) {
                form.addEventListener('submit', (e) => this.submitFeedback(e));
            }
        }, 100);
    }

    submitFeedback(e) {
        e.preventDefault();
        const feedback = {
            email: document.getElementById('feedbackEmail').value,
            subject: document.getElementById('feedbackSubject').value,
            content: document.getElementById('feedbackContent').value,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('warkAI_feedback', JSON.stringify(feedback));
        this.closeModal();
        alert('感谢您的反馈！我们会尽快处理。');
    }

    showCooperation() {
        const cooperationContent = `
            <div class="modal-header">
                <h2 class="modal-title">
                    <span class="menu-icon">🤝</span>
                    合作洽谈
                </h2>
                <p class="modal-subtitle">让我们一起创造未来</p>
                <button class="modal-close">✕</button>
            </div>
            <div class="modal-body">
                <form id="cooperationForm">
                    <div class="form-group">
                        <label class="form-label">公司名称</label>
                        <input type="text" class="form-input" id="coopCompany" placeholder="请输入公司名称" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">联系人</label>
                        <input type="text" class="form-input" id="coopContact" placeholder="请输入联系人名称" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">邮箱地址</label>
                        <input type="email" class="form-input" id="coopEmail" placeholder="请输入邮箱地址" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">合作内容</label>
                        <textarea class="form-input" id="coopContent" rows="5" placeholder="请描述您的合作意向" required></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="form-button secondary" onclick="pilotModule.closeModal()">取消</button>
                        <button type="submit" class="form-button">提交</button>
                    </div>
                </form>
            </div>
        `;
        this.showModal(cooperationContent);
        
        setTimeout(() => {
            const form = document.getElementById('cooperationForm');
            if (form) {
                form.addEventListener('submit', (e) => this.submitCooperation(e));
            }
        }, 100);
    }

    submitCooperation(e) {
        e.preventDefault();
        const cooperation = {
            company: document.getElementById('coopCompany').value,
            contact: document.getElementById('coopContact').value,
            email: document.getElementById('coopEmail').value,
            content: document.getElementById('coopContent').value,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('warkAI_cooperation', JSON.stringify(cooperation));
        this.closeModal();
        alert('感谢您的合作意向！我们会尽快与您联系。');
    }
}

// 全局函数包装器
function showLogin() {
    pilotModule.showLogin();
}

function showProfile() {
    pilotModule.showProfile();
}

function showFeedback() {
    pilotModule.showFeedback();
}

function showCooperation() {
    pilotModule.showCooperation();
}

// 初始化
let pilotModule;
document.addEventListener('DOMContentLoaded', () => {
    pilotModule = new PilotModule();
});
