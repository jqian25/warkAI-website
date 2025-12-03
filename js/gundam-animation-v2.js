/**
 * 高达图片序列动画系统 v2
 * 使用实际生成的图片帧进行动画播放
 */

class GundamImageAnimation {
    constructor(imageElementSelector = '.gundam-image') {
        this.imageElement = document.querySelector(imageElementSelector);
        this.currentAnimation = null;
        this.isAnimating = false;
        this.frameIndex = 0;
        this.animationFrameId = null;
        this.originalSrc = null;
        
        // 动画配置 - 使用实际生成的图片帧
        this.animations = {
            // 开枪动画 - 5个关键帧
            shoot: {
                name: '开枪',
                nameEn: 'Shoot',
                nameJa: '射撃',
                frames: [
                    'images/gundam-animations/shoot/frame_00.png',
                    'images/gundam-animations/shoot/frame_04.png',
                    'images/gundam-animations/shoot/frame_08.png',
                    'images/gundam-animations/shoot/frame_12.png',
                    'images/gundam-animations/shoot/frame_16.png'
                ],
                frameDelay: 120, // 毫秒/帧
                loop: false,
                description: '高达发射光束步枪'
            },
            
            // 转身动画 - 5个关键帧
            turn: {
                name: '转身',
                nameEn: 'Turn',
                nameJa: '回転',
                frames: [
                    'images/gundam-animations/turn/frame_00.png',
                    'images/gundam-animations/turn/frame_04.png',
                    'images/gundam-animations/turn/frame_08.png',
                    'images/gundam-animations/turn/frame_12.png',
                    'images/gundam-animations/turn/frame_16.png'
                ],
                frameDelay: 150,
                loop: false,
                description: '高达旋转180度'
            },
            
            // 跳跃动画 - 3个关键帧
            jump: {
                name: '跳跃',
                nameEn: 'Jump',
                nameJa: 'ジャンプ',
                frames: [
                    'images/gundam-animations/jump/frame_00.png',
                    'images/gundam-animations/jump/frame_08.png',
                    'images/gundam-animations/jump/frame_16.png'
                ],
                frameDelay: 200,
                loop: false,
                description: '高达跳跃动作'
            },
            
            // 攻击动画 - 2个关键帧
            attack: {
                name: '攻击',
                nameEn: 'Attack',
                nameJa: '攻撃',
                frames: [
                    'images/gundam-animations/attack/frame_00.png',
                    'images/gundam-animations/attack/frame_08.png',
                    'images/gundam-animations/attack/frame_00.png'
                ],
                frameDelay: 150,
                loop: false,
                description: '高达光束剑攻击'
            },
            
            // 闪避动画 - 5个关键帧
            dodge: {
                name: '闪避',
                nameEn: 'Dodge',
                nameJa: '回避',
                frames: [
                    'images/gundam-animations/dodge/frame_00.png',
                    'images/gundam-animations/dodge/frame_04.png',
                    'images/gundam-animations/dodge/frame_08.png',
                    'images/gundam-animations/dodge/frame_12.png',
                    'images/gundam-animations/dodge/frame_16.png'
                ],
                frameDelay: 100,
                loop: false,
                description: '高达快速闪避'
            }
        };
        
        // 统计信息
        this.stats = {
            animationsPlayed: 0,
            totalFramesDisplayed: 0
        };
        
        this.init();
    }
    
    /**
     * 初始化动画系统
     */
    init() {
        if (!this.imageElement) {
            console.warn('GundamImageAnimation: 图片元素未找到');
            return;
        }
        
        // 保存原始图片路径
        this.originalSrc = this.imageElement.src;
        
        // 预加载所有动画帧
        this.preloadAnimationFrames();
        
        console.log('✓ 高达图片序列动画系统已初始化');
    }
    
    /**
     * 预加载所有动画帧
     */
    preloadAnimationFrames() {
        const allFrames = [];
        
        for (const animName in this.animations) {
            const anim = this.animations[animName];
            allFrames.push(...anim.frames);
        }
        
        // 去重
        const uniqueFrames = [...new Set(allFrames)];
        
        console.log(`预加载 ${uniqueFrames.length} 张动画帧...`);
        
        let loadedCount = 0;
        uniqueFrames.forEach(framePath => {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                if (loadedCount === uniqueFrames.length) {
                    console.log('✓ 所有动画帧已预加载完成');
                }
            };
            img.onerror = () => {
                console.warn(`预加载失败: ${framePath}`);
            };
            img.src = framePath;
        });
    }
    
    /**
     * 播放指定动画
     * @param {string} animationName - 动画名称
     */
    play(animationName) {
        if (this.isAnimating) {
            console.warn('动画正在播放中，请稍候...');
            return false;
        }
        
        const animation = this.animations[animationName];
        if (!animation) {
            console.error(`动画 "${animationName}" 不存在`);
            return false;
        }
        
        this.currentAnimation = animation;
        this.isAnimating = true;
        this.frameIndex = 0;
        
        console.log(`▶ 播放动画: ${animation.name} (${animation.frames.length}帧)`);
        this._playNextFrame();
        
        this.stats.animationsPlayed++;
        return true;
    }
    
    /**
     * 内部：播放下一帧
     */
    _playNextFrame() {
        if (!this.isAnimating || !this.currentAnimation) {
            return;
        }
        
        const animation = this.currentAnimation;
        
        if (this.frameIndex < animation.frames.length) {
            // 显示当前帧
            const framePath = animation.frames[this.frameIndex];
            this.imageElement.src = framePath;
            this.stats.totalFramesDisplayed++;
            
            this.frameIndex++;
            
            // 延迟后播放下一帧
            this.animationFrameId = setTimeout(() => {
                this._playNextFrame();
            }, animation.frameDelay);
        } else {
            // 动画完成
            if (animation.loop) {
                // 循环播放
                this.frameIndex = 0;
                this._playNextFrame();
            } else {
                // 结束动画
                this._finishAnimation();
            }
        }
    }
    
    /**
     * 内部：完成动画
     */
    _finishAnimation() {
        this.isAnimating = false;
        
        // 恢复到第一帧或原始图片
        if (this.currentAnimation && this.currentAnimation.frames.length > 0) {
            this.imageElement.src = this.currentAnimation.frames[0];
        } else if (this.originalSrc) {
            this.imageElement.src = this.originalSrc;
        }
        
        console.log(`✓ 动画完成: ${this.currentAnimation.name}`);
        this.currentAnimation = null;
    }
    
    /**
     * 停止当前动画
     */
    stop() {
        if (this.animationFrameId) {
            clearTimeout(this.animationFrameId);
        }
        this._finishAnimation();
        console.log('⏹ 动画已停止');
    }
    
    /**
     * 获取所有可用动画列表
     */
    getAvailableAnimations() {
        return Object.entries(this.animations).map(([key, value]) => ({
            id: key,
            name: value.name,
            nameEn: value.nameEn,
            nameJa: value.nameJa,
            description: value.description,
            frameCount: value.frames.length,
            duration: value.frames.length * value.frameDelay
        }));
    }
    
    /**
     * 获取统计信息
     */
    getStats() {
        return {
            ...this.stats,
            isAnimating: this.isAnimating,
            currentAnimation: this.currentAnimation?.name || null
        };
    }
    
    /**
     * 重置统计信息
     */
    resetStats() {
        this.stats = {
            animationsPlayed: 0,
            totalFramesDisplayed: 0
        };
    }
}

// 创建全局实例
let gundamImageAnimation = null;

/**
 * 初始化高达图片动画系统
 */
function initGundamImageAnimation(imageElementSelector = '.gundam-image') {
    gundamImageAnimation = new GundamImageAnimation(imageElementSelector);
    return gundamImageAnimation;
}

/**
 * 播放高达动画
 */
function playGundamAnimation(animationName) {
    if (!gundamImageAnimation) {
        console.warn('高达动画系统未初始化');
        return false;
    }
    return gundamImageAnimation.play(animationName);
}

/**
 * 停止高达动画
 */
function stopGundamAnimation() {
    if (gundamImageAnimation) {
        gundamImageAnimation.stop();
    }
}

/**
 * 获取可用动画列表
 */
function getGundamAnimations() {
    if (!gundamImageAnimation) {
        return [];
    }
    return gundamImageAnimation.getAvailableAnimations();
}

/**
 * 获取动画统计信息
 */
function getGundamAnimationStats() {
    if (!gundamImageAnimation) {
        return null;
    }
    return gundamImageAnimation.getStats();
}

// 页面加载时自动初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initGundamImageAnimation();
    });
} else {
    initGundamImageAnimation();
}
