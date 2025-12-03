// パイロットモジュール機能 - 日本語版
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
        // 言語スイッチャーイベント
        const langCurrent = document.getElementById('langCurrent');
        const langDropdown = document.getElementById('langDropdown');
        
        if (langCurrent && langDropdown) {
            langCurrent.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelector('.language-switcher').classList.toggle('active');
            });
        }

        // パイロットモジュールイベント
        const pilotTrigger = document.getElementById('pilotTrigger');
        const pilotDropdown = document.getElementById('pilotDropdown');
        
        if (pilotTrigger && pilotDropdown) {
            pilotTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelector('.pilot-module').classList.toggle('active');
            });
        }

        // 外部クリックでドロップダウンを閉じる
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language-switcher')) {
                document.querySelector('.language-switcher')?.classList.remove('active');
            }
            if (!e.target.closest('.pilot-module')) {
                document.querySelector('.pilot-module')?.classList.remove('active');
            }
        });

        // モーダル閉じるイベント
        const modalOverlay = document.getElementById('modalOverlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    this.closeModal();
                }
            });
        }
    }

    loadUserData() {
        // localStorageからユーザーデータを読み込み
        const userData = localStorage.getItem('warkAI_user');
        if (userData) {
            try {
                this.currentUser = JSON.parse(userData);
                this.isLoggedIn = true;
            } catch (e) {
                console.error('ユーザーデータの解析に失敗:', e);
                localStorage.removeItem('warkAI_user');
            }
        }
    }

    updateUI() {
        const pilotName = document.getElementById('pilotName');
        const pilotStatus = document.getElementById('pilotStatus');
        
        if (this.isLoggedIn && this.currentUser) {
            if (pilotName) pilotName.textContent = this.currentUser.name || 'パイロット';
            if (pilotStatus) {
                pilotStatus.textContent = '認証済み';
                pilotStatus.classList.add('authenticated');
            }
        } else {
            if (pilotName) pilotName.textContent = 'ゲストパイロット';
            if (pilotStatus) {
                pilotStatus.textContent = '未認証';
                pilotStatus.classList.remove('authenticated');
            }
        }
    }

    showModal(content) {
        const modalOverlay = document.getElementById('modalOverlay');
        const modalContainer = document.getElementById('modalContainer');
        
        if (modalOverlay && modalContainer) {
            modalContainer.innerHTML = content;
            modalOverlay.classList.add('active');
            
            // 閉じるボタンイベントを追加
            const closeBtn = modalContainer.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeModal());
            }
        }
    }

    closeModal() {
        const modalOverlay = document.getElementById('modalOverlay');
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    }

    showProfile() {
        const profileContent = `
            <div class="modal-header">
                <h2 class="modal-title">
                    <span class="menu-icon">👤</span>
                    プロフィールセンター
                </h2>
                <p class="modal-subtitle">パイロットプロフィールを管理</p>
                <button class="modal-close">✕</button>
            </div>
            <div class="modal-body">
                ${this.isLoggedIn ? this.getProfileForm() : this.getLoginPrompt()}
            </div>
        `;
        this.showModal(profileContent);
    }

    getProfileForm() {
        return `
            <form id="profileForm">
                <div class="form-group">
                    <label class="form-label">パイロット名</label>
                    <input type="text" class="form-input" id="userName" value="${this.currentUser?.name || ''}" placeholder="お名前を入力してください">
                </div>
                <div class="form-group">
                    <label class="form-label">メールアドレス</label>
                    <input type="email" class="form-input" id="userEmail" value="${this.currentUser?.email || ''}" placeholder="メールアドレスを入力してください">
                </div>
                <div class="form-group">
                    <label class="form-label">会社・組織</label>
                    <input type="text" class="form-input" id="userCompany" value="${this.currentUser?.company || ''}" placeholder="会社または組織名を入力してください">
                </div>
                <div class="form-group">
                    <label class="form-label">役職</label>
                    <input type="text" class="form-input" id="userPosition" value="${this.currentUser?.position || ''}" placeholder="役職を入力してください">
                </div>
                <div class="modal-footer">
                    <button type="button" class="form-button secondary" onclick="pilotModule.logout()">ログアウト</button>
                    <button type="submit" class="form-button">変更を保存</button>
                </div>
            </form>
        `;
    }

    getLoginPrompt() {
        return `
            <div style="text-align: center; padding: 20px;">
                <div style="font-size: 48px; margin-bottom: 20px;">🔐</div>
                <h3 style="color: #ffffff; margin-bottom: 16px;">まずログインしてください</h3>
                <p style="color: #aaaaaa; margin-bottom: 24px;">ログインして個人情報を管理し、設定を保存できます</p>
                <div class="modal-footer">
                    <button type="button" class="form-button" onclick="window.location.href='login-ja.html'">ログインページへ</button>
                </div>
            </div>
        `;
    }

    showFeedback() {
        const feedbackContent = `
            <div class="modal-header">
                <h2 class="modal-title">
                    <span class="menu-icon">💬</span>
                    フィードバック
                </h2>
                <p class="modal-subtitle">あなたのご意見は私たちにとって重要です</p>
                <button class="modal-close">✕</button>
            </div>
            <div class="modal-body">
                <form id="feedbackForm">
                    <div class="form-group">
                        <label class="form-label">フィードバックタイプ</label>
                        <select class="form-input" id="feedbackType">
                            <option value="bug">バグレポート</option>
                            <option value="feature">機能リクエスト</option>
                            <option value="improvement">改善提案</option>
                            <option value="other">その他</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">タイトル</label>
                        <input type="text" class="form-input" id="feedbackTitle" placeholder="問題や提案の簡潔な説明">
                    </div>
                    <div class="form-group">
                        <label class="form-label">詳細説明</label>
                        <textarea class="form-input form-textarea" id="feedbackContent" placeholder="フィードバック内容を詳しく説明してください..."></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">連絡先メール（任意）</label>
                        <input type="email" class="form-input" id="feedbackEmail" value="${this.currentUser?.email || ''}" placeholder="返信が必要な場合はメールを残してください">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="form-button secondary" onclick="pilotModule.closeModal()">キャンセル</button>
                        <button type="submit" class="form-button">フィードバック送信</button>
                    </div>
                </form>
            </div>
        `;
        this.showModal(feedbackContent);
        
        // フォーム送信イベントを追加
        setTimeout(() => {
            const form = document.getElementById('feedbackForm');
            if (form) {
                form.addEventListener('submit', (e) => this.submitFeedback(e));
            }
        }, 100);
    }

    showCooperation() {
        const cooperationContent = `
            <div class="modal-header">
                <h2 class="modal-title">
                    <span class="menu-icon">🤝</span>
                    協力
                </h2>
                <p class="modal-subtitle">協力の機会を探り、共に未来を創造</p>
                <button class="modal-close">✕</button>
            </div>
            <div class="modal-body">
                <form id="cooperationForm">
                    <div class="form-group">
                        <label class="form-label">協力タイプ</label>
                        <select class="form-input" id="cooperationType">
                            <option value="technology">技術協力</option>
                            <option value="business">ビジネス協力</option>
                            <option value="investment">投資相談</option>
                            <option value="partnership">戦略パートナーシップ</option>
                            <option value="other">その他の協力</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">会社・組織名</label>
                        <input type="text" class="form-input" id="coopCompany" value="${this.currentUser?.company || ''}" placeholder="会社または組織名を入力してください">
                    </div>
                    <div class="form-group">
                        <label class="form-label">連絡担当者</label>
                        <input type="text" class="form-input" id="coopContact" value="${this.currentUser?.name || ''}" placeholder="連絡担当者名を入力してください">
                    </div>
                    <div class="form-group">
                        <label class="form-label">連絡先メール</label>
                        <input type="email" class="form-input" id="coopEmail" value="${this.currentUser?.email || ''}" placeholder="連絡先メールを入力してください" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">連絡先電話</label>
                        <input type="tel" class="form-input" id="coopPhone" placeholder="連絡先電話を入力してください">
                    </div>
                    <div class="form-group">
                        <label class="form-label">協力詳細</label>
                        <textarea class="form-input form-textarea" id="coopDetails" placeholder="協力の意図、期待する目標などを詳しく説明してください..."></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="form-button secondary" onclick="pilotModule.closeModal()">キャンセル</button>
                        <button type="submit" class="form-button">申請を送信</button>
                    </div>
                </form>
            </div>
        `;
        this.showModal(cooperationContent);
        
        // フォーム送信イベントを追加
        setTimeout(() => {
            const form = document.getElementById('cooperationForm');
            if (form) {
                form.addEventListener('submit', (e) => this.submitCooperation(e));
            }
        }, 100);
    }

    submitFeedback(e) {
        e.preventDefault();
        
        const formData = {
            type: document.getElementById('feedbackType').value,
            title: document.getElementById('feedbackTitle').value,
            content: document.getElementById('feedbackContent').value,
            email: document.getElementById('feedbackEmail').value,
            timestamp: new Date().toISOString(),
            user: this.currentUser?.name || '匿名ユーザー'
        };
        
        // localStorageに保存（実際のプロジェクトではサーバーに送信）
        const feedbacks = JSON.parse(localStorage.getItem('warkAI_feedbacks') || '[]');
        feedbacks.push(formData);
        localStorage.setItem('warkAI_feedbacks', JSON.stringify(feedbacks));
        
        // 成功メッセージを表示
        this.showSuccessMessage('フィードバック送信成功', 'フィードバックをありがとうございます。ご提案を真剣に検討いたします！');
    }

    submitCooperation(e) {
        e.preventDefault();
        
        const formData = {
            type: document.getElementById('cooperationType').value,
            company: document.getElementById('coopCompany').value,
            contact: document.getElementById('coopContact').value,
            email: document.getElementById('coopEmail').value,
            phone: document.getElementById('coopPhone').value,
            details: document.getElementById('coopDetails').value,
            timestamp: new Date().toISOString()
        };
        
        // localStorageに保存（実際のプロジェクトではサーバーに送信）
        const cooperations = JSON.parse(localStorage.getItem('warkAI_cooperations') || '[]');
        cooperations.push(formData);
        localStorage.setItem('warkAI_cooperations', JSON.stringify(cooperations));
        
        // 成功メッセージを表示
        this.showSuccessMessage('協力申請送信成功', 'できるだけ早くご連絡し、協力の詳細について話し合います！');
    }

    showSuccessMessage(title, message) {
        const successContent = `
            <div class="modal-header">
                <h2 class="modal-title">
                    <span style="color: #00ff88;">✓</span>
                    ${title}
                </h2>
                <button class="modal-close">✕</button>
            </div>
            <div class="modal-body">
                <div style="text-align: center; padding: 20px;">
                    <div style="font-size: 48px; color: #00ff88; margin-bottom: 20px;">✓</div>
                    <p style="color: #ffffff; font-size: 16px; margin-bottom: 24px;">${message}</p>
                    <div class="modal-footer">
                        <button type="button" class="form-button" onclick="pilotModule.closeModal()">OK</button>
                    </div>
                </div>
            </div>
        `;
        this.showModal(successContent);
    }

    logout() {
        localStorage.removeItem('warkAI_user');
        this.currentUser = null;
        this.isLoggedIn = false;
        this.updateUI();
        this.closeModal();
        
        // ログアウト成功メッセージを表示
        this.showSuccessMessage('ログアウト成功', 'WarkAIシステムをご利用いただき、ありがとうございました。またのご訪問をお待ちしております！');
    }
}

// HTML呼び出し用のグローバル関数
function switchLanguage(lang) {
    const config = getLanguageConfig();
    const targetConfig = LanguageConfig[lang];
    
    if (!targetConfig) {
        console.error('サポートされていない言語:', lang);
        return;
    }
    
    // 現在のページタイプを判定
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop();
    
    let pageType = 'index';
    if (currentFile.includes('team')) pageType = 'team';
    else if (currentFile.includes('summary')) pageType = 'summary';
    else if (currentFile.includes('products')) pageType = 'products';
    else if (currentFile.includes('market')) pageType = 'market';
    else if (currentFile.includes('technology')) pageType = 'technology';
    else if (currentFile.includes('login')) pageType = 'login';
    
    // ターゲット言語ページにジャンプ
    const targetPage = targetConfig.pages[pageType];
    if (targetPage && targetPage !== currentFile) {
        window.location.href = targetPage;
    }
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

// パイロットモジュールを初期化
let pilotModule;

document.addEventListener('DOMContentLoaded', () => {
    pilotModule = new PilotModule();
    
    // 言語スイッチャー表示を更新
    const currentLang = getCurrentLanguage();
    const langConfig = getLanguageConfig(currentLang);
    
    const langCurrent = document.getElementById('langCurrent');
    if (langCurrent && langConfig) {
        langCurrent.innerHTML = `
            <span class="lang-flag">${langConfig.flag}</span>
            <span class="lang-name">${langConfig.name}</span>
            <span class="lang-arrow">▼</span>
        `;
    }
});
