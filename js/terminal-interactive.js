/**
 * 终端交互模块 - 瞄准镜效果和点击跳转
 */

class TerminalInteractive {
    constructor() {
        this.terminalContent = document.getElementById('terminalContent');
        this.interactiveLines = [];
        this.init();
    }

    init() {
        if (!this.terminalContent) {
            console.warn('Terminal content not found');
            return;
        }

        // 定义交互行的配置
        const interactiveConfig = [
            {
                text: '// 欢迎回来，驾驶员',
                url: '/login.html',
                description: '进入登录系统'
            },
            {
                text: '// 机体状态: 最佳',
                url: '/game.html',
                description: '启动高达模拟游戏'
            },
            {
                text: '// 任务简报: 探索WarkAI商业计划书',
                url: '/pages/summary.html',
                description: '查看商业计划'
            }
        ];

        // 获取所有终端行
        const allLines = this.terminalContent.querySelectorAll('.terminal-line');

        // 遍历所有行，找到匹配的交互行
        allLines.forEach((line, index) => {
            const lineText = line.textContent.trim();
            const config = interactiveConfig.find(cfg => cfg.text === lineText);

            if (config) {
                // 转换为交互行
                this.makeLineInteractive(line, config);
                this.interactiveLines.push({
                    element: line,
                    config: config,
                    index: index
                });
            }
        });

        console.log(`Initialized ${this.interactiveLines.length} interactive terminal lines`);
    }

    /**
     * 将普通行转换为交互行
     */
    makeLineInteractive(lineElement, config) {
        // 添加交互类
        lineElement.classList.add('terminal-interactive-line');
        lineElement.style.cursor = 'pointer';

        // 创建瞄准镜容器
        const reticleContainer = document.createElement('div');
        reticleContainer.className = 'reticle-container';
        reticleContainer.innerHTML = `
            <div class="reticle-circle"></div>
            <div class="reticle-cross"></div>
            <div class="reticle-corner top-left"></div>
            <div class="reticle-corner top-right"></div>
            <div class="reticle-corner bottom-left"></div>
            <div class="reticle-corner bottom-right"></div>
        `;

        // 在行的开头插入瞄准镜
        lineElement.insertBefore(reticleContainer, lineElement.firstChild);

        // 添加点击事件
        lineElement.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.handleLineClick(lineElement, config);
        });

        // 添加悬停效果
        lineElement.addEventListener('mouseenter', () => {
            this.onLineHover(lineElement, config);
        });

        lineElement.addEventListener('mouseleave', () => {
            this.onLineLeave(lineElement);
        });

        // 添加数据属性便于识别
        lineElement.dataset.interactive = 'true';
        lineElement.dataset.target = config.url;
        lineElement.title = config.description;
    }

    /**
     * 行悬停时的效果
     */
    onLineHover(lineElement, config) {
        // 可以在这里添加额外的悬停效果
        // 例如：显示提示信息
        if (!lineElement.dataset.tooltipShown) {
            // 创建提示信息
            const tooltip = document.createElement('div');
            tooltip.className = 'terminal-tooltip';
            tooltip.textContent = config.description;
            tooltip.style.cssText = `
                position: absolute;
                right: -150px;
                top: 50%;
                transform: translateY(-50%);
                background-color: rgba(0, 163, 255, 0.2);
                border: 1px solid rgba(0, 163, 255, 0.5);
                padding: 5px 10px;
                border-radius: 3px;
                font-size: 12px;
                white-space: nowrap;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            lineElement.style.position = 'relative';
            lineElement.appendChild(tooltip);
            lineElement.dataset.tooltipShown = 'true';

            // 延迟显示提示
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 100);
        }
    }

    /**
     * 行离开时的效果
     */
    onLineLeave(lineElement) {
        // 隐藏提示信息
        const tooltip = lineElement.querySelector('.terminal-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
        }
    }

    /**
     * 处理行点击事件
     */
    handleLineClick(lineElement, config) {
        // 添加闪光动画
        lineElement.classList.add('active');

        // 播放点击音效（如果有）
        this.playClickSound();

        // 显示扫描效果
        this.showScanEffect(lineElement);

        // 延迟导航，让动画播放完成
        setTimeout(() => {
            // 检查是否是当前页面
            const currentPath = window.location.pathname;
            const targetPath = config.url;

            if (currentPath.endsWith(targetPath) || currentPath.endsWith(targetPath.split('/').pop())) {
                // 已在目标页面，只显示通知
                this.showNotification('已在目标页面');
            } else {
                // 导航到目标页面
                window.location.href = config.url;
            }
        }, 600);

        // 移除动画类
        setTimeout(() => {
            lineElement.classList.remove('active');
        }, 600);
    }

    /**
     * 显示扫描效果
     */
    showScanEffect(lineElement) {
        const scanLine = document.createElement('div');
        scanLine.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(0, 163, 255, 0.8), transparent);
            animation: scan-effect 0.8s ease-out;
            pointer-events: none;
        `;

        // 添加动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes scan-effect {
                0% {
                    top: 0;
                    opacity: 1;
                }
                100% {
                    top: 100%;
                    opacity: 0;
                }
            }
        `;
        if (!document.querySelector('style[data-scan-effect]')) {
            style.setAttribute('data-scan-effect', 'true');
            document.head.appendChild(style);
        }

        lineElement.style.position = 'relative';
        lineElement.appendChild(scanLine);

        setTimeout(() => {
            scanLine.remove();
        }, 800);
    }

    /**
     * 播放点击音效
     */
    playClickSound() {
        // 创建简单的音效（使用Web Audio API）
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            // 设置音效参数
            oscillator.frequency.value = 800; // 频率
            oscillator.type = 'sine'; // 波形

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // 如果Web Audio API不可用，静默失败
            console.debug('Web Audio API not available');
        }
    }

    /**
     * 显示通知信息
     */
    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: rgba(0, 163, 255, 0.2);
            border: 1px solid rgba(0, 163, 255, 0.5);
            color: var(--accent-blue);
            padding: 15px 20px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            z-index: 10000;
            animation: notification-slide 0.5s ease-out;
            box-shadow: 0 0 15px rgba(0, 163, 255, 0.4);
        `;
        notification.textContent = `// ${message}`;

        // 添加动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes notification-slide {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        if (!document.querySelector('style[data-notification]')) {
            style.setAttribute('data-notification', 'true');
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // 自动移除
        setTimeout(() => {
            notification.style.animation = 'notification-slide 0.5s ease-out reverse';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }

    /**
     * 获取交互行信息
     */
    getInteractiveLines() {
        return this.interactiveLines;
    }

    /**
     * 启用/禁用特定行
     */
    setLineEnabled(index, enabled) {
        if (this.interactiveLines[index]) {
            const line = this.interactiveLines[index].element;
            if (enabled) {
                line.classList.remove('disabled');
                line.style.cursor = 'pointer';
            } else {
                line.classList.add('disabled');
                line.style.cursor = 'default';
            }
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 等待启动序列完成
    const checkTerminal = setInterval(() => {
        const terminalContent = document.getElementById('terminalContent');
        if (terminalContent && terminalContent.classList.contains('show')) {
            clearInterval(checkTerminal);
            window.terminalInteractive = new TerminalInteractive();
        }
    }, 100);

    // 最多等待10秒
    setTimeout(() => {
        clearInterval(checkTerminal);
        if (!window.terminalInteractive) {
            window.terminalInteractive = new TerminalInteractive();
        }
    }, 10000);
});
