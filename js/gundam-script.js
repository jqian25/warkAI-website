// 高达风格JavaScript - WarkAI商业计划书

document.addEventListener('DOMContentLoaded', () => {
    console.log('[Gundam] DOMContentLoaded 事件触发');
    
    // 初始化启动序列
    initStartupSequence();
    
    // 初始化HUD时间显示
    initHudTime();
    
    // 初始化高达导航
    initGundamNavigation();
    
    // 初始化终端打字效果
    initTerminalTyping();
});

// 初始化启动序列
function initStartupSequence() {
    const startupSequence = document.getElementById('startupSequence');
    const mainContainer = document.getElementById('mainContainer');
    const startupProgress = document.getElementById('startupProgress');
    const startupText = document.getElementById('startupText');
    const detailLines = document.querySelectorAll('.detail-line');
    
    // 模拟启动进度
    let progress = 0;
    let currentLine = 0;
    
    // 显示详情行
    function showNextLine() {
        if (currentLine < detailLines.length) {
            detailLines[currentLine].style.opacity = '1';
            detailLines[currentLine].style.transform = 'translateY(0)';
            currentLine++;
            setTimeout(showNextLine, 800);
        }
    }
    
    // 启动进度条动画
    const startupInterval = setInterval(() => {
        progress += Math.random() * 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(startupInterval);
            
            // 启动完成
            startupText.textContent = '系统启动完成';
            startupText.style.color = '#4caf50';
            
            // 延迟后显示主内容
            setTimeout(() => {
                startupSequence.style.opacity = '0';
                setTimeout(() => {
                    startupSequence.style.display = 'none';
                    mainContainer.style.opacity = '1';
                }, 1000);
            }, 1500);
        }
        startupProgress.style.width = `${progress}%`;
    }, 200);
    
    // 开始显示详情行
    setTimeout(showNextLine, 1000);
}

// 初始化HUD时间显示
function initHudTime() {
    const hudTime = document.getElementById('hudTime');
    
    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        hudTime.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    // 立即更新一次
    updateTime();
    
    // 每秒更新一次
    setInterval(updateTime, 1000);
}

// 应用菜单项的可见样式
function applyGundamPartStyles() {
    const gundamParts = document.querySelectorAll('.gundam-part');
    
    if (gundamParts.length === 0) {
        // 如果没有找到菜单项，延迟重试
        console.log('[Gundam] 菜单项还没有加载，延迟 500ms 后重试...');
        setTimeout(applyGundamPartStyles, 500);
        return;
    }
    
    gundamParts.forEach((part) => {
        part.style.border = '2px solid rgb(0, 163, 255)';
        part.style.backgroundColor = 'rgba(0, 163, 255, 0.15)';
        part.style.boxShadow = '0 0 15px rgba(0, 163, 255, 0.5)';
        part.style.zIndex = '100';
        
        const label = part.querySelector('.part-label');
        if (label) {
            label.style.opacity = '1';
            label.style.display = 'block';
            label.style.visibility = 'visible';
            label.style.color = 'rgb(0, 163, 255)';
            label.style.fontSize = '0.85rem';
            label.style.zIndex = '101';
        }
    });
    
    console.log('[Gundam] 菜单项样式应用成功');
}

// 初始化高达导航
function initGundamNavigation() {
    console.log('[Gundam] 初始化高达导航...');
    
    // 延迟应用样式，确保菜单项已加载
    setTimeout(() => {
        applyGundamPartStyles();
    }, 1000);
    
    try {
        const gundamParts = document.querySelectorAll('.gundam-part');
        console.log(`[Gundam] 找到 ${gundamParts.length} 个 gundam-part 元素`);
        
        if (gundamParts.length === 0) {
            console.error('[Gundam] 错误: 没有找到任何 gundam-part 元素!');
            return;
        }
        
        const transformOverlay = document.getElementById('transformOverlay');
        const transformPart = document.getElementById('transformPart');
        const transformText = document.getElementById('transformText');
        const transformMode = document.getElementById('transformMode');
        const transformProgress = document.getElementById('transformProgress');
        
        if (!transformOverlay || !transformPart || !transformText || !transformMode || !transformProgress) {
            console.error('[Gundam] 错误: 某些必要的元素不存在!');
            console.log(`  transformOverlay: ${transformOverlay ? '✓' : '✗'}`);
            console.log(`  transformPart: ${transformPart ? '✓' : '✗'}`);
            console.log(`  transformText: ${transformText ? '✓' : '✗'}`);
            console.log(`  transformMode: ${transformMode ? '✓' : '✗'}`);
            console.log(`  transformProgress: ${transformProgress ? '✓' : '✗'}`);
            return;
        }
        
        console.log('[Gundam] 所有必要的元素都存在');
        
        // 为每个 gundam-part 添加点击事件监听器
        gundamParts.forEach((part, index) => {
            console.log(`[Gundam] 为 ${part.id} 添加点击事件监听器...`);
            
            part.addEventListener('click', function(e) {
                console.log(`[Gundam] 点击事件触发: ${this.id}`);
                e.preventDefault();
                e.stopPropagation();
                
                const targetPage = this.getAttribute('data-target');
                const partId = this.id;
                let partName = '';
                
                console.log(`[Gundam] 目标页面: ${targetPage}`);
                
                // 设置变形部件名称和样式
                switch(partId) {
                    case 'navHead':
                        partName = '头部';
                        transformPart.style.backgroundImage = "url('images/head_part.svg')";
                        break;
                    case 'navCore':
                        partName = '核心';
                        transformPart.style.backgroundImage = "url('images/core_part.svg')";
                        break;
                    case 'navArms':
                        partName = '手臂';
                        transformPart.style.backgroundImage = "url('images/arms_part.svg')";
                        break;
                    case 'navLegs':
                        partName = '腿部';
                        transformPart.style.backgroundImage = "url('images/legs_part.svg')";
                        break;
                    case 'navPlatform':
                        partName = '机械坐台';
                        transformPart.style.backgroundImage = "url('images/platform_part.svg')";
                        break;
                }
                
                console.log(`[Gundam] 显示变形覆盖层...`);
                
                // 显示变形覆盖层
                transformOverlay.style.opacity = '1';
                transformOverlay.style.pointerEvents = 'all';
                transformText.textContent = `${partName}变形中...`;
                transformMode.textContent = `${partName}模式`;
                
                // 模拟变形进度 - 加快速度
                let progress = 0;
                const transformInterval = setInterval(() => {
                    progress += Math.random() * 20;  // 增加进度速度
                    if (progress >= 100) {
                        progress = 100;
                        clearInterval(transformInterval);
                        
                        console.log(`[Gundam] 变形完成，导航到: ${targetPage}`);
                        
                        // 变形完成后导航到目标页面
                        setTimeout(() => {
                            window.location.href = targetPage;
                        }, 200);  // 减少延迟
                    }
                    transformProgress.style.width = `${progress}%`;
                }, 50);  // 加快更新频率
                
                // 添加变形动画 - 加快速度
                if (typeof anime !== 'undefined') {
                    anime({
                        targets: transformPart,
                        rotate: [0, 360],
                        scale: [0.5, 1, 0.8, 1.2, 1],
                        opacity: [0.5, 1, 0.8, 1],
                        duration: 800,  // 减少动画时间
                        easing: 'easeInOutQuad'
                    });
                }
                
                // 添加加载指示器文本
                const originalText = transformText.textContent;
                setTimeout(() => {
                    transformText.textContent = '加载中...';
                }, 600);
            });
        });
        
        console.log('[Gundam] 高达导航初始化完成!');
        
    } catch (error) {
        console.error('[Gundam] 初始化高达导航时出错:', error);
        console.error(error.stack);
    }
}

// 初始化终端打字效果
function initTerminalTyping() {
    const terminalContent = document.getElementById('terminalContent');
    if (!terminalContent) return;
    
    const terminalLines = terminalContent.querySelectorAll('.terminal-line:not(.terminal-cursor)');
    
    // 隐藏所有行
    terminalLines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(10px)';
    });
    
    // 逐行显示
    let currentLine = 0;
    
    function showNextLine() {
        if (currentLine >= terminalLines.length) return;
        
        const line = terminalLines[currentLine];
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
        
        const text = line.textContent;
        line.textContent = '';
        
        let charIndex = 0;
        
        function typeChar() {
            if (charIndex < text.length) {
                line.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 30);
            } else {
                currentLine++;
                setTimeout(showNextLine, 300);
            }
        }
        
        typeChar();
    }
    
    // 延迟后开始打字效果
    setTimeout(showNextLine, 2000);
}

// 创建六边形背景
function createHexBackground() {
    const mainContainer = document.getElementById('mainContainer');
    const hexBackground = document.createElement('div');
    hexBackground.className = 'hex-background';
    
    // 添加多个六边形
    for (let i = 0; i < 20; i++) {
        const hex = document.createElement('div');
        hex.className = 'hex';
        hex.style.left = `${Math.random() * 100}%`;
        hex.style.top = `${Math.random() * 100}%`;
        hex.style.animationDelay = `${Math.random() * 5}s`;
        hexBackground.appendChild(hex);
    }
    
    mainContainer.appendChild(hexBackground);
}

// 页面返回按钮功能
function initBackButton() {
    const backButton = document.querySelector('.back-button');
    if (!backButton) return;
    
    backButton.addEventListener('click', () => {
        const transformOverlay = document.getElementById('transformOverlay');
        transformOverlay.style.opacity = '1';
        transformOverlay.style.pointerEvents = 'all';
        
        // 模拟变形进度
        const transformProgress = document.getElementById('transformProgress');
        let progress = 0;
        const transformInterval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(transformInterval);
                
                // 变形完成后返回主页
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 500);
            }
            transformProgress.style.width = `${progress}%`;
        }, 100);
    });
}

// 立即初始化（备用方案）
console.log('[Gundam] 立即初始化...');
if (document.readyState === 'loading') {
    console.log('[Gundam] DOM 仍在加载中，等待 DOMContentLoaded 事件...');
} else {
    console.log('[Gundam] DOM 已加载，立即执行初始化...');
    initGundamNavigation();
}

// 添加延迟初始化，确保菜单项已加载
setTimeout(() => {
    console.log('[Gundam] 延迟初始化菜单项样式...');
    applyGundamPartStyles();
}, 2000);

// 页面加载完成后再次应用样式
window.addEventListener('load', () => {
    console.log('[Gundam] 页面加载完成，应用菜单项样式...');
    applyGundamPartStyles();
});

// 视频播放完成后应用样式
const videoContainer = document.getElementById('videoPlayerContainer');
if (videoContainer) {
    const observer = new MutationObserver(() => {
        if (videoContainer.style.display === 'none') {
            console.log('[Gundam] 视频隐藏，应用菜单项样式...');
            applyGundamPartStyles();
            observer.disconnect();
        }
    });
    observer.observe(videoContainer, { attributes: true });
}

// 内容页面动画
function initContentAnimations() {
    // 动画显示内容区块
    const contentSections = document.querySelectorAll('.content-section');
    if (contentSections.length === 0) return;
    
    contentSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });
    
    // 动画显示数据卡片
    const dataCards = document.querySelectorAll('.data-card');
    dataCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 1000 + (index * 150));
    });
}
