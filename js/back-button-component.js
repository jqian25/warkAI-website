// WarkAI 返回按钮组件 - 统一的返回按钮HTML结构和样式

function createBackButtonComponent() {
    return `
        <!-- 变形动画覆盖层 -->
        <div id="transformOverlay" class="transform-overlay">
            <div class="transform-container">
                <div id="transformPart" class="transform-part"></div>
                <div class="transform-info">
                    <h3 id="transformText">返回主控制台...</h3>
                    <p id="transformMode">导航模式</p>
                    <div class="transform-progress-container">
                        <div id="transformProgress" class="transform-progress"></div>
                    </div>
                    <p id="transformStatus">变形中</p>
                </div>
            </div>
        </div>

        <!-- HUD顶部 -->
        <div class="hud-top">
            <div class="hud-left">
                <div class="hud-logo">
                    <img src="../images/warkai_logo.png" alt="WarkAI Logo">
                </div>
                <div class="hud-title">WarkAI OS v1.0</div>
            </div>
            <div class="hud-center">
                <div class="hud-status">系统状态: <span class="status-online">在线</span></div>
            </div>
            <div class="hud-right">
                <div id="hudTime" class="hud-time">00:00:00</div>
                <!-- 语言切换器 -->
                <div class="language-switcher">
                    <button class="lang-button active" data-lang="zh">中文</button>
                    <button class="lang-button" data-lang="en">English</button>
                    <button class="lang-button" data-lang="ja">日本語</button>
                </div>
            </div>
        </div>

        <!-- 返回按钮 -->
        <div id="backButton" class="back-button">
            <div class="back-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
            </div>
            <span class="back-text">返回主控制台</span>
        </div>
    `;
}

function createBottomHUD() {
    return `
        <!-- 底部HUD界面 -->
        <div class="hud-bottom">
            <div class="hud-left">
                <div class="hud-coordinates">
                    <span class="coordinate">X: 42.195</span>
                    <span class="coordinate">Y: 13.114</span>
                    <span class="coordinate">Z: 08.848</span>
                </div>
            </div>
            <div class="hud-center">
                <div class="energy-display">
                    <div class="energy-label">能量</div>
                    <div class="energy-bar">
                        <div class="energy-level"></div>
                    </div>
                    <div class="energy-value">100%</div>
                </div>
            </div>
            <div class="hud-right">
                <div class="hud-info">WarkAI © 2025 | 人机智能新纪元</div>
            </div>
        </div>
    `;
}

// 初始化页面组件
function initPageComponents() {
    // 检查是否已经有变形覆盖层
    if (!document.getElementById('transformOverlay')) {
        // 在body开始处插入返回按钮组件
        document.body.insertAdjacentHTML('afterbegin', createBackButtonComponent());
    }
    
    // 检查是否已经有底部HUD
    if (!document.querySelector('.hud-bottom')) {
        // 在body结束前插入底部HUD
        document.body.insertAdjacentHTML('beforeend', createBottomHUD());
    }
}

// 更新旧版页面结构
function updateLegacyPageStructure() {
    // 查找旧版返回按钮
    const oldBackButton = document.querySelector('.back-button');
    if (oldBackButton && !oldBackButton.id) {
        // 更新旧版返回按钮
        oldBackButton.id = 'backButton';
        oldBackButton.innerHTML = `
            <div class="back-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
            </div>
            <span class="back-text">返回主控制台</span>
        `;
        oldBackButton.className = 'back-button';
    }
    
    // 查找页面标题并包装在适当的容器中
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle && !pageTitle.parentElement.classList.contains('page-title-container')) {
        const titleContainer = document.createElement('div');
        titleContainer.className = 'page-title-container';
        pageTitle.parentNode.insertBefore(titleContainer, pageTitle);
        titleContainer.appendChild(pageTitle);
        
        // 添加标题线
        const titleLine = document.createElement('div');
        titleLine.className = 'title-line';
        titleContainer.appendChild(titleLine);
    }
}

// 页面加载完成后初始化组件
document.addEventListener('DOMContentLoaded', () => {
    // 延迟执行以确保其他脚本先加载
    setTimeout(() => {
        initPageComponents();
        updateLegacyPageStructure();
    }, 50);
});

// 导出函数供其他脚本使用
window.createBackButtonComponent = createBackButtonComponent;
window.createBottomHUD = createBottomHUD;
window.initPageComponents = initPageComponents;
window.updateLegacyPageStructure = updateLegacyPageStructure;
