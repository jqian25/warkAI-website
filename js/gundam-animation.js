/**
 * 高达动画管理系统
 * 支持多种动画序列：开枪、移动、转身等
 */

class GundamAnimation {
    constructor(containerSelector = '.gundam-image') {
        this.container = document.querySelector(containerSelector);
        this.currentAnimation = null;
        this.isAnimating = false;
        this.frameIndex = 0;
        this.animationFrameId = null;
        
        // 动画配置
        this.animations = {
            // 开枪动画 - 16帧
            shoot: {
                name: '开枪',
                frames: 16,
                duration: 600, // 毫秒
                frameDelay: 37.5, // 毫秒/帧
                description: '高达发射武器',
                keyframes: [
                    { frame: 0, rotation: 0, scale: 1, opacity: 1 },
                    { frame: 2, rotation: -5, scale: 1.02, opacity: 1 },
                    { frame: 4, rotation: -10, scale: 1.05, opacity: 1 },
                    { frame: 6, rotation: -8, scale: 1.03, opacity: 1 },
                    { frame: 8, rotation: 0, scale: 1, opacity: 1 },
                    { frame: 10, rotation: 5, scale: 0.98, opacity: 1 },
                    { frame: 12, rotation: 2, scale: 0.99, opacity: 1 },
                    { frame: 14, rotation: 0, scale: 1, opacity: 1 },
                    { frame: 16, rotation: 0, scale: 1, opacity: 1 }
                ]
            },
            
            // 转身动画 - 16帧
            turn: {
                name: '转身',
                frames: 16,
                duration: 800,
                frameDelay: 50,
                description: '高达转身',
                keyframes: [
                    { frame: 0, rotation: 0, scale: 1, opacity: 1 },
                    { frame: 2, rotation: 22.5, scale: 1, opacity: 1 },
                    { frame: 4, rotation: 45, scale: 1, opacity: 1 },
                    { frame: 6, rotation: 67.5, scale: 1, opacity: 1 },
                    { frame: 8, rotation: 90, scale: 1, opacity: 1 },
                    { frame: 10, rotation: 112.5, scale: 1, opacity: 1 },
                    { frame: 12, rotation: 135, scale: 1, opacity: 1 },
                    { frame: 14, rotation: 157.5, scale: 1, opacity: 1 },
                    { frame: 16, rotation: 180, scale: 1, opacity: 1 }
                ]
            },
            
            // 跳跃动画 - 16帧
            jump: {
                name: '跳跃',
                frames: 16,
                duration: 800,
                frameDelay: 50,
                description: '高达跳跃',
                keyframes: [
                    { frame: 0, translateY: 0, scale: 1, opacity: 1 },
                    { frame: 2, translateY: -20, scale: 1.02, opacity: 1 },
                    { frame: 4, translateY: -50, scale: 1.05, opacity: 1 },
                    { frame: 6, translateY: -80, scale: 1.08, opacity: 1 },
                    { frame: 8, translateY: -100, scale: 1.1, opacity: 1 },
                    { frame: 10, translateY: -80, scale: 1.08, opacity: 1 },
                    { frame: 12, translateY: -50, scale: 1.05, opacity: 1 },
                    { frame: 14, translateY: -20, scale: 1.02, opacity: 1 },
                    { frame: 16, translateY: 0, scale: 1, opacity: 1 }
                ]
            },
            
            // 攻击动画 - 16帧
            attack: {
                name: '攻击',
                frames: 16,
                duration: 700,
                frameDelay: 43.75,
                description: '高达近距离攻击',
                keyframes: [
                    { frame: 0, rotation: 0, scale: 1, opacity: 1 },
                    { frame: 2, rotation: -15, scale: 1.05, opacity: 1 },
                    { frame: 4, rotation: -30, scale: 1.1, opacity: 1 },
                    { frame: 6, rotation: -25, scale: 1.08, opacity: 1 },
                    { frame: 8, rotation: 0, scale: 1, opacity: 1 },
                    { frame: 10, rotation: 15, scale: 1.05, opacity: 1 },
                    { frame: 12, rotation: 10, scale: 1.02, opacity: 1 },
                    { frame: 14, rotation: 5, scale: 1.01, opacity: 1 },
                    { frame: 16, rotation: 0, scale: 1, opacity: 1 }
                ]
            },
            
            // 闪避动画 - 16帧
            dodge: {
                name: '闪避',
                frames: 16,
                duration: 600,
                frameDelay: 37.5,
                description: '高达快速闪避',
                keyframes: [
                    { frame: 0, translateX: 0, scale: 1, opacity: 1 },
                    { frame: 2, translateX: -30, scale: 0.95, opacity: 1 },
                    { frame: 4, translateX: -60, scale: 0.9, opacity: 0.8 },
                    { frame: 6, translateX: -80, scale: 0.85, opacity: 0.6 },
                    { frame: 8, translateX: -60, scale: 0.9, opacity: 0.8 },
                    { frame: 10, translateX: -30, scale: 0.95, opacity: 1 },
                    { frame: 12, translateX: 0, scale: 1, opacity: 1 },
                    { frame: 14, translateX: 20, scale: 1.02, opacity: 1 },
                    { frame: 16, translateX: 0, scale: 1, opacity: 1 }
                ]
            }
        };
        
        this.init();
    }
    
    /**
     * 初始化动画系统
     */
    init() {
        if (!this.container) {
            console.warn('GundamAnimation: 容器未找到');
            return;
        }
        
        // 设置容器样式
        this.container.style.transition = 'none';
        this.container.style.transformOrigin = 'center';
        
        console.log('✓ 高达动画系统已初始化');
    }
    
    /**
     * 播放指定动画
     * @param {string} animationName - 动画名称
     */
    play(animationName) {
        if (this.isAnimating) {
            console.warn('动画正在播放中，请稍候...');
            return;
        }
        
        const animation = this.animations[animationName];
        if (!animation) {
            console.error(`动画 "${animationName}" 不存在`);
            return;
        }
        
        this.currentAnimation = animation;
        this.isAnimating = true;
        this.frameIndex = 0;
        
        console.log(`▶ 播放动画: ${animation.name}`);
        this._animateFrame();
    }
    
    /**
     * 内部：播放单帧动画
     */
    _animateFrame() {
        if (!this.isAnimating || !this.currentAnimation) {
            return;
        }
        
        const animation = this.currentAnimation;
        const progress = this.frameIndex / animation.frames;
        
        // 计算当前帧的变换
        const transform = this._interpolateKeyframes(animation.keyframes, progress);
        
        // 应用变换
        this._applyTransform(transform);
        
        this.frameIndex++;
        
        if (this.frameIndex <= animation.frames) {
            this.animationFrameId = setTimeout(() => {
                this._animateFrame();
            }, animation.frameDelay);
        } else {
            // 动画完成
            this.isAnimating = false;
            this._resetTransform();
            console.log(`✓ 动画完成: ${animation.name}`);
        }
    }
    
    /**
     * 内部：插值计算关键帧
     */
    _interpolateKeyframes(keyframes, progress) {
        const frameNumber = progress * 16;
        
        // 找到前后两个关键帧
        let prevKeyframe = keyframes[0];
        let nextKeyframe = keyframes[keyframes.length - 1];
        
        for (let i = 0; i < keyframes.length - 1; i++) {
            if (keyframes[i].frame <= frameNumber && keyframes[i + 1].frame >= frameNumber) {
                prevKeyframe = keyframes[i];
                nextKeyframe = keyframes[i + 1];
                break;
            }
        }
        
        // 计算帧之间的进度
        const frameDiff = nextKeyframe.frame - prevKeyframe.frame;
        const localProgress = frameDiff === 0 ? 0 : (frameNumber - prevKeyframe.frame) / frameDiff;
        
        // 线性插值
        const result = {};
        for (const key in prevKeyframe) {
            if (key !== 'frame') {
                const prev = prevKeyframe[key];
                const next = nextKeyframe[key];
                result[key] = prev + (next - prev) * localProgress;
            }
        }
        
        return result;
    }
    
    /**
     * 内部：应用变换
     */
    _applyTransform(transform) {
        let transformString = '';
        
        if (transform.rotation !== undefined) {
            transformString += `rotate(${transform.rotation}deg) `;
        }
        if (transform.scale !== undefined) {
            transformString += `scale(${transform.scale}) `;
        }
        if (transform.translateX !== undefined) {
            transformString += `translateX(${transform.translateX}px) `;
        }
        if (transform.translateY !== undefined) {
            transformString += `translateY(${transform.translateY}px) `;
        }
        
        this.container.style.transform = transformString.trim();
        
        if (transform.opacity !== undefined) {
            this.container.style.opacity = transform.opacity;
        }
    }
    
    /**
     * 内部：重置变换
     */
    _resetTransform() {
        this.container.style.transform = 'none';
        this.container.style.opacity = '1';
    }
    
    /**
     * 停止当前动画
     */
    stop() {
        if (this.animationFrameId) {
            clearTimeout(this.animationFrameId);
        }
        this.isAnimating = false;
        this._resetTransform();
        console.log('⏹ 动画已停止');
    }
    
    /**
     * 获取所有可用动画列表
     */
    getAvailableAnimations() {
        return Object.entries(this.animations).map(([key, value]) => ({
            id: key,
            name: value.name,
            description: value.description,
            frames: value.frames,
            duration: value.duration
        }));
    }
    
    /**
     * 获取动画信息
     */
    getAnimationInfo(animationName) {
        return this.animations[animationName];
    }
}

// 创建全局实例
let gundamAnimation = null;

/**
 * 初始化高达动画系统
 */
function initGundamAnimation(containerSelector = '.gundam-image') {
    gundamAnimation = new GundamAnimation(containerSelector);
    return gundamAnimation;
}

/**
 * 播放高达动画
 */
function playGundamAnimation(animationName) {
    if (!gundamAnimation) {
        console.warn('高达动画系统未初始化');
        return;
    }
    gundamAnimation.play(animationName);
}

/**
 * 停止高达动画
 */
function stopGundamAnimation() {
    if (gundamAnimation) {
        gundamAnimation.stop();
    }
}

/**
 * 获取可用动画列表
 */
function getGundamAnimations() {
    if (!gundamAnimation) {
        return [];
    }
    return gundamAnimation.getAvailableAnimations();
}

// 页面加载时自动初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initGundamAnimation();
    });
} else {
    initGundamAnimation();
}
