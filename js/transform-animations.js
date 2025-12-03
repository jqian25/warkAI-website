// WarkAI 变形动画控制器 - 暗黑机甲风格

class MechaTransformController {
    constructor() {
        this.isTransforming = false;
        this.transformQueue = [];
        this.activeHologram = null;
        this.init();
    }

    init() {
        this.setupTransformTriggers();
        this.createMechanicalElements();
        this.initializeHUD();
        this.startAmbientAnimations();
    }

    // 设置变形触发器
    setupTransformTriggers() {
        const parts = document.querySelectorAll('.gundam-part');
        
        parts.forEach(part => {
            part.classList.add('transform-trigger');
            
            // 鼠标悬停效果
            part.addEventListener('mouseenter', (e) => {
                this.onPartHover(e.target);
            });
            
            part.addEventListener('mouseleave', (e) => {
                this.onPartLeave(e.target);
            });
            
            // 点击变形效果
            part.addEventListener('click', (e) => {
                e.preventDefault();
                this.triggerTransform(e.target);
            });
        });
    }

    // 部件悬停效果
    onPartHover(part) {
        if (this.isTransforming) return;
        
        // 添加目标锁定效果
        part.classList.add('target-locked');
        
        // 创建扫描线
        this.createScanLines(part);
        
        // 播放机械音效（视觉反馈）
        this.playMechanicalFeedback(part);
        
        // 显示部件信息
        this.showPartInfo(part);
    }

    // 部件离开效果
    onPartLeave(part) {
        part.classList.remove('target-locked');
        this.removeScanLines(part);
        this.hidePartInfo();
    }

    // 触发变形动画
    async triggerTransform(part) {
        if (this.isTransforming) {
            this.transformQueue.push(part);
            return;
        }

        this.isTransforming = true;
        
        try {
            // 获取部件类型
            const partType = this.getPartType(part);
            
            // 执行变形序列
            await this.executeTransformSequence(part, partType);
            
            // 显示HUD全息界面
            await this.showHologram(part);
            
        } catch (error) {
            console.error('Transform animation error:', error);
        } finally {
            this.isTransforming = false;
            this.processQueue();
        }
    }

    // 获取部件类型
    getPartType(part) {
        if (part.classList.contains('head')) return 'head';
        if (part.classList.contains('core')) return 'core';
        if (part.classList.contains('arms')) return 'arms';
        if (part.classList.contains('legs')) return 'legs';
        if (part.classList.contains('platform')) return 'platform';
        return 'unknown';
    }

    // 执行变形序列
    async executeTransformSequence(part, partType) {
        // 第一阶段：准备变形
        await this.prepareTransform(part);
        
        // 第二阶段：机械分解
        await this.mechanicalDisassembly(part, partType);
        
        // 第三阶段：零件重组
        await this.mechanicalReassembly(part, partType);
        
        // 第四阶段：变形完成
        await this.completeTransform(part);
    }

    // 准备变形
    async prepareTransform(part) {
        return new Promise(resolve => {
            // 添加能量脉冲效果
            const energyPulse = document.createElement('div');
            energyPulse.className = 'energy-pulse';
            part.appendChild(energyPulse);
            
            // 创建机械零件
            this.createMechanicalDebris(part);
            
            // 播放准备动画
            part.classList.add('mechanical-feedback', 'activated');
            
            setTimeout(() => {
                part.classList.remove('activated');
                resolve();
            }, 600);
        });
    }

    // 机械分解动画
    async mechanicalDisassembly(part, partType) {
        return new Promise(resolve => {
            // 添加对应的变形动画类
            part.classList.add('mecha-part', 'transforming');
            
            // 根据部件类型添加特定动画
            switch (partType) {
                case 'head':
                    part.classList.add('head-transform');
                    break;
                case 'core':
                    part.classList.add('core-transform');
                    break;
                case 'arms':
                    part.classList.add('arms-transform');
                    break;
                case 'legs':
                    part.classList.add('legs-transform');
                    break;
                case 'platform':
                    part.classList.add('platform-transform');
                    break;
            }
            
            // 创建齿轮动画
            this.createGearAnimations(part);
            
            // 创建数据流
            this.createDataStreams(part);
            
            setTimeout(resolve, this.getTransformDuration(partType));
        });
    }

    // 零件重组动画
    async mechanicalReassembly(part, partType) {
        return new Promise(resolve => {
            // 移除分解动画类
            part.classList.remove('transforming');
            
            // 添加重组效果
            part.classList.add('transform-complete');
            
            setTimeout(() => {
                part.classList.remove('transform-complete');
                resolve();
            }, 1000);
        });
    }

    // 完成变形
    async completeTransform(part) {
        return new Promise(resolve => {
            // 清理动画类
            const animationClasses = [
                'head-transform', 'core-transform', 'arms-transform', 
                'legs-transform', 'platform-transform'
            ];
            
            animationClasses.forEach(cls => {
                part.classList.remove(cls);
            });
            
            // 清理临时元素
            this.cleanupTemporaryElements(part);
            
            resolve();
        });
    }

    // 显示HUD全息界面
    async showHologram(part) {
        return new Promise(resolve => {
            const targetUrl = part.getAttribute('data-target');
            if (!targetUrl) {
                resolve();
                return;
            }

            // 创建HUD全息容器
            const hologram = document.createElement('div');
            hologram.className = 'hud-hologram';
            hologram.innerHTML = `
                <div class="hud-content">
                    <div class="scan-lines"></div>
                    <div class="hud-header">
                        <h2>数据传输中...</h2>
                        <div class="loading-indicator">
                            <div class="loading-bar"></div>
                        </div>
                    </div>
                    <iframe src="${targetUrl}" style="width: 100%; height: 400px; border: none; background: transparent;"></iframe>
                    <div class="hud-controls">
                        <button class="hud-close-btn" onclick="mechaController.closeHologram()">关闭全息显示</button>
                        <button class="hud-fullscreen-btn" onclick="window.open('${targetUrl}', '_blank')">全屏查看</button>
                    </div>
                </div>
            `;

            document.body.appendChild(hologram);
            this.activeHologram = hologram;

            // 激活全息显示
            setTimeout(() => {
                hologram.classList.add('active');
                resolve();
            }, 100);
        });
    }

    // 关闭HUD全息界面
    closeHologram() {
        if (!this.activeHologram) return;

        this.activeHologram.classList.remove('active');
        
        setTimeout(() => {
            if (this.activeHologram && this.activeHologram.parentNode) {
                this.activeHologram.parentNode.removeChild(this.activeHologram);
            }
            this.activeHologram = null;
        }, 800);
    }

    // 创建机械元素
    createMechanicalElements() {
        const container = document.querySelector('.gundam-navigator');
        if (!container) return;

        // 创建背景齿轮
        for (let i = 0; i < 5; i++) {
            const gear = document.createElement('div');
            gear.className = `gear ${i % 2 === 0 ? 'reverse' : ''}`;
            gear.style.cssText = `
                position: absolute;
                top: ${Math.random() * 80 + 10}%;
                left: ${Math.random() * 80 + 10}%;
                opacity: 0.1;
                z-index: -1;
            `;
            container.appendChild(gear);
        }
    }

    // 创建扫描线
    createScanLines(part) {
        const scanLines = document.createElement('div');
        scanLines.className = 'scan-lines';
        part.appendChild(scanLines);
    }

    // 移除扫描线
    removeScanLines(part) {
        const scanLines = part.querySelector('.scan-lines');
        if (scanLines) {
            scanLines.remove();
        }
    }

    // 播放机械反馈效果
    playMechanicalFeedback(part) {
        part.classList.add('mechanical-feedback');
        
        setTimeout(() => {
            part.classList.add('activated');
        }, 50);
        
        setTimeout(() => {
            part.classList.remove('activated');
        }, 650);
    }

    // 创建机械碎片
    createMechanicalDebris(part) {
        const rect = part.getBoundingClientRect();
        
        for (let i = 0; i < 8; i++) {
            const debris = document.createElement('div');
            debris.className = 'mechanical-debris';
            debris.style.cssText = `
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                --debris-x: ${(Math.random() - 0.5) * 200}px;
                --debris-y: ${-Math.random() * 150 - 50}px;
            `;
            
            document.body.appendChild(debris);
            
            setTimeout(() => {
                if (debris.parentNode) {
                    debris.parentNode.removeChild(debris);
                }
            }, 3000);
        }
    }

    // 创建齿轮动画
    createGearAnimations(part) {
        const rect = part.getBoundingClientRect();
        
        for (let i = 0; i < 3; i++) {
            const gear = document.createElement('div');
            gear.className = `gear ${i % 2 === 0 ? 'reverse' : ''}`;
            gear.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                z-index: 1000;
                opacity: 0.7;
            `;
            
            document.body.appendChild(gear);
            
            setTimeout(() => {
                if (gear.parentNode) {
                    gear.parentNode.removeChild(gear);
                }
            }, 2000);
        }
    }

    // 创建数据流
    createDataStreams(part) {
        const rect = part.getBoundingClientRect();
        
        for (let i = 0; i < 5; i++) {
            const stream = document.createElement('div');
            stream.className = 'data-stream';
            stream.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: 0;
                z-index: 999;
                animation-delay: ${Math.random() * 1}s;
            `;
            
            document.body.appendChild(stream);
            
            setTimeout(() => {
                if (stream.parentNode) {
                    stream.parentNode.removeChild(stream);
                }
            }, 2000);
        }
    }

    // 显示部件信息
    showPartInfo(part) {
        const label = part.querySelector('.part-label');
        if (label) {
            label.style.transform = 'scale(1.1)';
            label.style.color = '#ff3c3c';
            label.style.textShadow = '0 0 10px rgba(255, 60, 60, 0.8)';
        }
    }

    // 隐藏部件信息
    hidePartInfo() {
        const labels = document.querySelectorAll('.part-label');
        labels.forEach(label => {
            label.style.transform = '';
            label.style.color = '';
            label.style.textShadow = '';
        });
    }

    // 获取变形持续时间
    getTransformDuration(partType) {
        const durations = {
            'head': 2500,
            'core': 3000,
            'arms': 2800,
            'legs': 2200,
            'platform': 3500
        };
        return durations[partType] || 2000;
    }

    // 清理临时元素
    cleanupTemporaryElements(part) {
        const elementsToRemove = [
            '.energy-pulse',
            '.scan-lines',
            '.mechanical-debris'
        ];
        
        elementsToRemove.forEach(selector => {
            const elements = part.querySelectorAll(selector);
            elements.forEach(el => el.remove());
        });
    }

    // 初始化HUD系统
    initializeHUD() {
        // 添加HUD样式
        if (!document.querySelector('#hud-styles')) {
            const style = document.createElement('style');
            style.id = 'hud-styles';
            style.textContent = `
                .loading-indicator {
                    width: 100%;
                    height: 4px;
                    background: rgba(0, 163, 255, 0.2);
                    border-radius: 2px;
                    overflow: hidden;
                    margin: 10px 0;
                }
                
                .loading-bar {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, #00a3ff, #ff3c3c, #00a3ff);
                    background-size: 200% 100%;
                    animation: loadingProgress 2s linear infinite;
                }
                
                @keyframes loadingProgress {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                
                .hud-controls {
                    display: flex;
                    gap: 15px;
                    margin-top: 20px;
                    justify-content: center;
                }
                
                .hud-close-btn,
                .hud-fullscreen-btn {
                    padding: 10px 20px;
                    background: linear-gradient(45deg, #ff3c3c, #cc1e2e);
                    border: none;
                    border-radius: 4px;
                    color: white;
                    font-family: 'Orbitron', sans-serif;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .hud-fullscreen-btn {
                    background: linear-gradient(45deg, #00a3ff, #0066cc);
                }
                
                .hud-close-btn:hover,
                .hud-fullscreen-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                }
            `;
            document.head.appendChild(style);
        }
    }

    // 启动环境动画
    startAmbientAnimations() {
        // 定期创建环境粒子
        setInterval(() => {
            this.createAmbientParticles();
        }, 3000);
        
        // 定期更新齿轮位置
        setInterval(() => {
            this.updateAmbientGears();
        }, 5000);
    }

    // 创建环境粒子
    createAmbientParticles() {
        const container = document.querySelector('.gundam-navigator');
        if (!container) return;

        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00a3ff;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0;
            animation: particleFloat 4s ease-out forwards;
            z-index: -1;
        `;
        
        container.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 4000);
    }

    // 更新环境齿轮
    updateAmbientGears() {
        const gears = document.querySelectorAll('.gear');
        gears.forEach(gear => {
            if (Math.random() < 0.3) {
                gear.style.opacity = Math.random() * 0.2 + 0.05;
                gear.style.transform = `scale(${Math.random() * 0.5 + 0.8})`;
            }
        });
    }

    // 处理队列
    processQueue() {
        if (this.transformQueue.length > 0) {
            const nextPart = this.transformQueue.shift();
            setTimeout(() => {
                this.triggerTransform(nextPart);
            }, 500);
        }
    }
}

// 添加粒子浮动动画CSS
if (!document.querySelector('#particle-float-styles')) {
    const style = document.createElement('style');
    style.id = 'particle-float-styles';
    style.textContent = `
        @keyframes particleFloat {
            0% {
                opacity: 0;
                transform: translateY(0) scale(0);
            }
            20% {
                opacity: 1;
                transform: translateY(-20px) scale(1);
            }
            80% {
                opacity: 1;
                transform: translateY(-80px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-100px) scale(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// 全局变量
let mechaController;

// 初始化变形控制器
document.addEventListener('DOMContentLoaded', () => {
    mechaController = new MechaTransformController();
    
    // 添加键盘快捷键
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mechaController.activeHologram) {
            mechaController.closeHologram();
        }
    });
});

// 导出控制器类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MechaTransformController;
}
