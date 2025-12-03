/**
 * 启动序列和HUD初始化脚本
 * 处理启动动画、时钟更新、高达导航菜单等
 */

// ==========================================
// 启动序列动画
// ==========================================

class StartupSequence {
    constructor() {
        this.duration = 1500; // 1.5秒启动时间（优化性能）
        this.startTime = null;
    }

    start() {
        const startupSequence = document.getElementById('startupSequence');
        const startupProgress = document.getElementById('startupProgress');
        const startupText = document.getElementById('startupText');
        const startupDetails = document.getElementById('startupDetails');

        if (!startupSequence) return;

        this.startTime = Date.now();

        // 启动进度条动画
        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - this.startTime;
            const progress = Math.min((elapsed / this.duration) * 100, 100);

            if (startupProgress) {
                startupProgress.style.width = progress + '%';
            }

            // 更新启动文本
            if (progress < 25) {
                if (startupText) startupText.textContent = 'Initializing Core System...';
            } else if (progress < 50) {
                if (startupText) startupText.textContent = 'Loading AI Engine...';
            } else if (progress < 75) {
                if (startupText) startupText.textContent = 'Calibrating AR System...';
            } else if (progress < 90) {
                if (startupText) startupText.textContent = 'Connecting Robot Control Module...';
            } else {
                if (startupText) startupText.textContent = 'System Ready...';
            }

            if (progress >= 100) {
                clearInterval(progressInterval);
                // 启动完成，隐藏启动序列
                startupSequence.style.opacity = '0';
                startupSequence.style.transition = 'opacity 0.3s ease';
                
                // 显示主容器
                const mainContainer = document.getElementById('mainContainer');
                if (mainContainer) {
                    mainContainer.classList.add('show');
                }
                
                setTimeout(() => {
                    startupSequence.style.display = 'none';
                }, 300);
            }
        }, 30);
    }
}

// ==========================================
// HUD时钟更新
// ==========================================

class HUDClock {
    constructor() {
        this.hudTime = document.getElementById('hudTime');
        this.startTime = Date.now();
    }

    start() {
        setInterval(() => {
            const elapsed = Date.now() - this.startTime;
            const seconds = Math.floor((elapsed / 1000) % 60);
            const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
            const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);

            if (this.hudTime) {
                this.hudTime.textContent = 
                    String(hours).padStart(2, '0') + ':' +
                    String(minutes).padStart(2, '0') + ':' +
                    String(seconds).padStart(2, '0');
            }
        }, 1000);
    }
}

// ==========================================
// 高达导航菜单处理
// ==========================================

class GundamNavigator {
    constructor() {
        this.parts = ['navHead', 'navCore', 'navArms', 'navLegs', 'navPlatform'];
        this.init();
    }

    init() {
        this.parts.forEach(partId => {
            const part = document.getElementById(partId);
            if (part) {
                part.addEventListener('click', () => this.handlePartClick(part));
            }
        });
    }

    handlePartClick(part) {
        const target = part.dataset.target;
        if (target) {
            // 添加点击动画
            part.style.transform = 'scale(0.95)';
            setTimeout(() => {
                part.style.transform = '';
            }, 200);

            // 导航到目标页面
            console.log('导航到:', target);
            window.location.href = target;
        }
    }

    loadContent(url) {
        // 这里可以实现动态加载内容的逻辑
        console.log('加载内容:', url);
        // 可以使用fetch API加载内容
        fetch(url).then(response => response.text()).then(html => {
            const mainContainer = document.getElementById('mainContainer');
            if (mainContainer) {
                mainContainer.innerHTML = html;
                // 滚动到顶部
                window.scrollTo(0, 0);
            }
        }).catch(error => {
            console.error('加载内容失败:', error);
            // 如果AJAX加载失败，使用直接跳转
            window.location.href = url;
        });
    }
}

// ==========================================
// 初始化函数
// ==========================================

function initializeHUD() {
    // 启动启动序列
    const startup = new StartupSequence();
    startup.start();

    // 启动HUD时钟
    const clock = new HUDClock();
    clock.start();

    // 初始化高达导航菜单
    const navigator = new GundamNavigator();

    // 隐藏变形动画覆盖层
    setTimeout(() => {
        const transformOverlay = document.getElementById('transformOverlay');
        if (transformOverlay) {
            transformOverlay.style.display = 'none';
        }
    }, 2000);

    console.log('✓ HUD初始化完成');
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHUD);
} else {
    initializeHUD();
}
