// Pilot Module Functionality - English Version
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
        // Language switcher events
        const langCurrent = document.getElementById('langCurrent');
        const langDropdown = document.getElementById('langDropdown');
        
        if (langCurrent && langDropdown) {
            langCurrent.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelector('.language-switcher').classList.toggle('active');
            });
        }

        // Pilot module events
        const pilotTrigger = document.getElementById('pilotTrigger');
        const pilotDropdown = document.getElementById('pilotDropdown');
        
        if (pilotTrigger && pilotDropdown) {
            pilotTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                document.querySelector('.pilot-module').classList.toggle('active');
            });
        }

        // Click outside to close dropdowns
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language-switcher')) {
                document.querySelector('.language-switcher')?.classList.remove('active');
            }
            if (!e.target.closest('.pilot-module')) {
                document.querySelector('.pilot-module')?.classList.remove('active');
            }
        });

        // Modal close events
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
        // Load user data from localStorage
        const userData = localStorage.getItem('warkAI_user');
        if (userData) {
            try {
                this.currentUser = JSON.parse(userData);
                this.isLoggedIn = true;
            } catch (e) {
                console.error('Failed to parse user data:', e);
                localStorage.removeItem('warkAI_user');
            }
        }
    }

    updateUI() {
        const pilotName = document.getElementById('pilotName');
        const pilotStatus = document.getElementById('pilotStatus');
        
        if (this.isLoggedIn && this.currentUser) {
            if (pilotName) pilotName.textContent = this.currentUser.name || 'Pilot';
            if (pilotStatus) {
                pilotStatus.textContent = 'Authenticated';
                pilotStatus.classList.add('authenticated');
            }
        } else {
            if (pilotName) pilotName.textContent = 'Guest Pilot';
            if (pilotStatus) {
                pilotStatus.textContent = 'Unauthenticated';
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
            
            // Add close button event
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
                    Profile Center
                </h2>
                <p class="modal-subtitle">Manage your pilot profile</p>
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
                    <label class="form-label">Pilot Name</label>
                    <input type="text" class="form-input" id="userName" value="${this.currentUser?.name || ''}" placeholder="Enter your name">
                </div>
                <div class="form-group">
                    <label class="form-label">Email Address</label>
                    <input type="email" class="form-input" id="userEmail" value="${this.currentUser?.email || ''}" placeholder="Enter email address">
                </div>
                <div class="form-group">
                    <label class="form-label">Company/Organization</label>
                    <input type="text" class="form-input" id="userCompany" value="${this.currentUser?.company || ''}" placeholder="Enter company or organization">
                </div>
                <div class="form-group">
                    <label class="form-label">Position</label>
                    <input type="text" class="form-input" id="userPosition" value="${this.currentUser?.position || ''}" placeholder="Enter position">
                </div>
                <div class="modal-footer">
                    <button type="button" class="form-button secondary" onclick="pilotModule.logout()">Logout</button>
                    <button type="submit" class="form-button">Save Changes</button>
                </div>
            </form>
        `;
    }

    getLoginPrompt() {
        return `
            <div style="text-align: center; padding: 20px;">
                <div style="font-size: 48px; margin-bottom: 20px;">🔐</div>
                <h3 style="color: #ffffff; margin-bottom: 16px;">Please Login First</h3>
                <p style="color: #aaaaaa; margin-bottom: 24px;">Login to manage personal information and save preferences</p>
                <div class="modal-footer">
                    <button type="button" class="form-button" onclick="window.location.href='login-en.html'">Go to Login</button>
                </div>
            </div>
        `;
    }

    showFeedback() {
        const feedbackContent = `
            <div class="modal-header">
                <h2 class="modal-title">
                    <span class="menu-icon">💬</span>
                    Feedback
                </h2>
                <p class="modal-subtitle">Your suggestions are important to us</p>
                <button class="modal-close">✕</button>
            </div>
            <div class="modal-body">
                <form id="feedbackForm">
                    <div class="form-group">
                        <label class="form-label">Feedback Type</label>
                        <select class="form-input" id="feedbackType">
                            <option value="bug">Bug Report</option>
                            <option value="feature">Feature Request</option>
                            <option value="improvement">Improvement Suggestion</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Title</label>
                        <input type="text" class="form-input" id="feedbackTitle" placeholder="Brief description of the issue or suggestion">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Detailed Description</label>
                        <textarea class="form-input form-textarea" id="feedbackContent" placeholder="Please describe your feedback in detail..."></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Contact Email (Optional)</label>
                        <input type="email" class="form-input" id="feedbackEmail" value="${this.currentUser?.email || ''}" placeholder="Leave email if you need a reply">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="form-button secondary" onclick="pilotModule.closeModal()">Cancel</button>
                        <button type="submit" class="form-button">Submit Feedback</button>
                    </div>
                </form>
            </div>
        `;
        this.showModal(feedbackContent);
        
        // Add form submit event
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
                    Cooperation
                </h2>
                <p class="modal-subtitle">Explore cooperation opportunities, create the future together</p>
                <button class="modal-close">✕</button>
            </div>
            <div class="modal-body">
                <form id="cooperationForm">
                    <div class="form-group">
                        <label class="form-label">Cooperation Type</label>
                        <select class="form-input" id="cooperationType">
                            <option value="technology">Technology Cooperation</option>
                            <option value="business">Business Cooperation</option>
                            <option value="investment">Investment Discussion</option>
                            <option value="partnership">Strategic Partnership</option>
                            <option value="other">Other Cooperation</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Company/Organization Name</label>
                        <input type="text" class="form-input" id="coopCompany" value="${this.currentUser?.company || ''}" placeholder="Enter company or organization name">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Contact Person</label>
                        <input type="text" class="form-input" id="coopContact" value="${this.currentUser?.name || ''}" placeholder="Enter contact person name">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Contact Email</label>
                        <input type="email" class="form-input" id="coopEmail" value="${this.currentUser?.email || ''}" placeholder="Enter contact email" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Contact Phone</label>
                        <input type="tel" class="form-input" id="coopPhone" placeholder="Enter contact phone">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Cooperation Details</label>
                        <textarea class="form-input form-textarea" id="coopDetails" placeholder="Please describe your cooperation intentions, expected goals, etc..."></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="form-button secondary" onclick="pilotModule.closeModal()">Cancel</button>
                        <button type="submit" class="form-button">Submit Application</button>
                    </div>
                </form>
            </div>
        `;
        this.showModal(cooperationContent);
        
        // Add form submit event
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
            user: this.currentUser?.name || 'Anonymous User'
        };
        
        // Save to localStorage (should send to server in real project)
        const feedbacks = JSON.parse(localStorage.getItem('warkAI_feedbacks') || '[]');
        feedbacks.push(formData);
        localStorage.setItem('warkAI_feedbacks', JSON.stringify(feedbacks));
        
        // Show success message
        this.showSuccessMessage('Feedback Submitted Successfully', 'Thank you for your feedback, we will carefully consider your suggestions!');
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
        
        // Save to localStorage (should send to server in real project)
        const cooperations = JSON.parse(localStorage.getItem('warkAI_cooperations') || '[]');
        cooperations.push(formData);
        localStorage.setItem('warkAI_cooperations', JSON.stringify(cooperations));
        
        // Show success message
        this.showSuccessMessage('Cooperation Application Submitted Successfully', 'We will contact you as soon as possible to discuss cooperation details!');
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
        
        // Show logout success message
        this.showSuccessMessage('Logout Successful', 'Thank you for using WarkAI system, looking forward to your next visit!');
    }
}

// Global functions for HTML calls
function switchLanguage(lang) {
    const config = getLanguageConfig();
    const targetConfig = LanguageConfig[lang];
    
    if (!targetConfig) {
        console.error('Unsupported language:', lang);
        return;
    }
    
    // Determine current page type
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop();
    
    let pageType = 'index';
    if (currentFile.includes('team')) pageType = 'team';
    else if (currentFile.includes('summary')) pageType = 'summary';
    else if (currentFile.includes('products')) pageType = 'products';
    else if (currentFile.includes('market')) pageType = 'market';
    else if (currentFile.includes('technology')) pageType = 'technology';
    else if (currentFile.includes('login')) pageType = 'login';
    
    // Jump to target language page
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

// Initialize pilot module
let pilotModule;

document.addEventListener('DOMContentLoaded', () => {
    pilotModule = new PilotModule();
    
    // Update language switcher display
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
