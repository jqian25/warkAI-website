// 扎古变形系统 JavaScript

class ZakuTransformer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentMode = 'mecha'; // mecha, jet, tank
        this.isTransforming = false;
        this.transformSequence = ['mecha', 'jet', 'tank'];
        
        // 图片路径
        this.images = {
            mecha: 'images/zaku_head.png',
            jet: 'images/zaku_jet_mode.png',
            tank: 'images/zaku_tank_mode.png'
        };
        
        // 音效文件（如果有的话）
        this.sounds = {
            transform: null, // 将在后面添加音效
            eyeBlink: null
        };
        
        this.init();
    }
    
    init() {
        if (!this.container) return;
        
        this.createZakuStructure();
        this.bindEvents();
        this.startEyeBlinkAnimation();
        this.startIdleAnimations();
    }
    
    createZakuStructure() {
        this.container.innerHTML = `
            <div class="zaku-image-container">
                <img class="zaku-image" src="${this.images[this.currentMode]}" alt="Zaku ${this.currentMode}">
                <div class="zaku-eye-glow"></div>
                <div class="scan-lines"></div>
                <div class="transform-particles"></div>
                <div class="energy-ring"></div>
                <div class="sound-indicator"></div>
            </div>
            <div class="transform-mode-indicator"></div>
            <div class="transform-controls">
                <button class="transform-btn active" data-mode="mecha">MS</button>
                <button class="transform-btn" data-mode="jet">JET</button>
                <button class="transform-btn" data-mode="tank">TANK</button>
            </div>
        `;
        
        this.zakuImage = this.container.querySelector('.zaku-image');
        this.eyeGlow = this.container.querySelector('.zaku-eye-glow');
        this.particlesContainer = this.container.querySelector('.transform-particles');
        this.energyRing = this.container.querySelector('.energy-ring');
        this.soundIndicator = this.container.querySelector('.sound-indicator');
        
        // 设置初始模式
        this.container.className = `zaku-container mode-${this.currentMode}`;
    }
    
    bindEvents() {
        // 点击变形
        this.container.addEventListener('click', (e) => {
            if (!e.target.classList.contains('transform-btn')) {
                this.transformToNext();
            }
        });
        
        // 按钮控制
        const transformBtns = this.container.querySelectorAll('.transform-btn');
        transformBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const targetMode = btn.dataset.mode;
                if (targetMode !== this.currentMode) {
                    this.transformTo(targetMode);
                }
            });
        });
        
        // 鼠标悬停效果
        this.container.addEventListener('mouseenter', () => {
            this.intensifyEffects();
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.normalizeEffects();
        });
    }
    
    // 变形到下一个模式
    transformToNext() {
        if (this.isTransforming) return;
        
        const currentIndex = this.transformSequence.indexOf(this.currentMode);
        const nextIndex = (currentIndex + 1) % this.transformSequence.length;
        const nextMode = this.transformSequence[nextIndex];
        
        this.transformTo(nextMode);
    }
    
    // 变形到指定模式
    transformTo(targetMode) {
        if (this.isTransforming || targetMode === this.currentMode) return;
        
        this.isTransforming = true;
        this.container.classList.add('transforming');
        
        // 播放变形音效
        this.playTransformSound();
        
        // 创建变形粒子效果
        this.createTransformParticles();
        
        // 创建电火花效果
        this.createElectricSparks();
        
        // 变形动画序列
        setTimeout(() => {
            // 更换图片
            this.zakuImage.src = this.images[targetMode];
            this.currentMode = targetMode;
            
            // 更新模式类
            this.container.className = `zaku-container mode-${targetMode} transforming`;
            
            // 更新按钮状态
            this.updateButtonStates();
            
        }, 1000); // 在变形动画中间更换图片
        
        // 完成变形
        setTimeout(() => {
            this.container.classList.remove('transforming');
            this.isTransforming = false;
            
            // 变形完成效果
            this.createCompletionEffect();
            
        }, 2000);
    }
    
    // 更新按钮状态
    updateButtonStates() {
        const buttons = this.container.querySelectorAll('.transform-btn');
        buttons.forEach(btn => {
            if (btn.dataset.mode === this.currentMode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // 创建变形粒子效果
    createTransformParticles() {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // 随机位置
                const angle = (Math.PI * 2 * i) / particleCount;
                const radius = 50 + Math.random() * 50;
                const x = 50 + Math.cos(angle) * radius;
                const y = 50 + Math.sin(angle) * radius;
                
                particle.style.left = x + '%';
                particle.style.top = y + '%';
                
                this.particlesContainer.appendChild(particle);
                
                // 移除粒子
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 1500);
                
            }, i * 50);
        }
    }
    
    // 创建电火花效果
    createElectricSparks() {
        const sparkCount = 15;
        
        for (let i = 0; i < sparkCount; i++) {
            setTimeout(() => {
                const spark = document.createElement('div');
                spark.className = 'electric-spark';
                
                // 随机位置
                spark.style.left = (20 + Math.random() * 60) + '%';
                spark.style.top = (20 + Math.random() * 60) + '%';
                
                this.container.appendChild(spark);
                
                // 移除火花
                setTimeout(() => {
                    if (spark.parentNode) {
                        spark.parentNode.removeChild(spark);
                    }
                }, 300);
                
            }, i * 100);
        }
    }
    
    // 变形完成效果
    createCompletionEffect() {
        // 闪烁效果
        this.zakuImage.style.filter = 'brightness(1.5) saturate(1.5)';
        
        setTimeout(() => {
            this.zakuImage.style.filter = '';
        }, 500);
        
        // 能量波纹
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0;
            height: 0;
            border: 2px solid #00ff88;
            border-radius: 50%;
            opacity: 1;
            z-index: 5;
        `;
        
        this.container.appendChild(ripple);
        
        // 波纹动画
        let size = 0;
        const rippleAnimation = setInterval(() => {
            size += 10;
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.opacity = 1 - (size / 200);
            
            if (size >= 200) {
                clearInterval(rippleAnimation);
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }
        }, 20);
    }
    
    // 眼睛闪烁动画
    startEyeBlinkAnimation() {
        // CSS动画已经处理了基础闪烁，这里可以添加随机闪烁
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% 概率额外闪烁
                this.eyeGlow.style.animation = 'none';
                this.eyeGlow.style.opacity = '0.2';
                
                setTimeout(() => {
                    this.eyeGlow.style.animation = 'zakuEyeBlink 3s infinite';
                    this.eyeGlow.style.opacity = '';
                }, 100);
            }
        }, 2000);
    }
    
    // 待机动画
    startIdleAnimations() {
        // 轻微的呼吸效果
        setInterval(() => {
            if (!this.isTransforming) {
                this.zakuImage.style.transform = 'scale(1.01)';
                setTimeout(() => {
                    this.zakuImage.style.transform = '';
                }, 1000);
            }
        }, 5000);
    }
    
    // 增强效果（鼠标悬停时）
    intensifyEffects() {
        this.eyeGlow.style.boxShadow = '0 0 25px #ff0000, 0 0 50px #ff0000';
        this.zakuImage.style.filter = 'brightness(1.1) contrast(1.1)';
    }
    
    // 恢复正常效果
    normalizeEffects() {
        this.eyeGlow.style.boxShadow = '';
        this.zakuImage.style.filter = '';
    }
    
    // 播放变形音效
    playTransformSound() {
        // 显示音效指示器
        this.container.classList.add('playing-sound');
        
        setTimeout(() => {
            this.container.classList.remove('playing-sound');
        }, 500);
        
        // 如果有音效文件，在这里播放
        if (this.sounds.transform) {
            this.sounds.transform.currentTime = 0;
            this.sounds.transform.play().catch(e => {
                console.log('音效播放失败:', e);
            });
        }
    }
    
    // 设置音效文件
    setSounds(soundFiles) {
        Object.keys(soundFiles).forEach(key => {
            if (soundFiles[key]) {
                this.sounds[key] = new Audio(soundFiles[key]);
                this.sounds[key].volume = 0.5;
            }
        });
    }
    
    // 获取当前模式
    getCurrentMode() {
        return this.currentMode;
    }
    
    // 销毁实例
    destroy() {
        // 清理事件监听器和定时器
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// 全局初始化函数
function initZakuTransformer(containerId = 'zakuContainer') {
    return new ZakuTransformer(containerId);
}

// 导出类（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ZakuTransformer;
}

// 页面加载完成后自动初始化
document.addEventListener('DOMContentLoaded', () => {
    // 查找页面中的扎古容器并初始化
    const zakuContainers = document.querySelectorAll('[data-zaku-transformer]');
    zakuContainers.forEach(container => {
        new ZakuTransformer(container.id);
    });
});
