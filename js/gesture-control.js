/**
 * MediaPipe 手势识别控制模块
 * 支持实时手势识别和动画触发
 */

class GestureControl {
    constructor(options = {}) {
        this.video = null;
        this.canvas = null;
        this.canvasCtx = null;
        this.gestureRecognizer = null;
        this.runningMode = 'VIDEO';
        this.webcamRunning = false;
        this.animationRunning = false;
        
        // 配置
        this.config = {
            showVideo: options.showVideo !== false, // 是否显示视频
            showLandmarks: options.showLandmarks !== false, // 是否显示手部标记
            confidenceThreshold: options.confidenceThreshold || 0.5,
            ...options
        };
        
        // 手势映射到动画
        this.gestureAnimationMap = {
            'Closed_Fist': 'shoot', // 握拳 -> 开枪
            'Open_Palm': 'dodge', // 张开手掌 -> 闪避
            'Pointing_Up': 'jump', // 指向上方 -> 跳跃
            'Thumb_Up': 'attack', // 竖起大拇指 -> 攻击
            'Victory': 'turn', // 胜利手势 -> 转身
            'Thumb_Down': null, // 竖起大拇指向下 -> 无动作
            'ILoveYou': null, // 爱你手势 -> 无动作
            'None': null // 无手势 -> 无动作
        };
        
        // 手势检测历史（用于防止抖动）
        this.gestureHistory = [];
        this.gestureHistorySize = 3;
        this.lastDetectedGesture = null;
        this.lastGestureTime = 0;
        this.gestureCooldown = 500; // 毫秒
        
        // 统计信息
        this.stats = {
            framesProcessed: 0,
            gesturesDetected: 0,
            animationsTriggered: 0
        };
    }
    
    /**
     * 初始化手势识别系统
     */
    async init() {
        try {
            console.log('初始化MediaPipe手势识别...');
            
            // 加载MediaPipe库
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/vision_bundle.js';
            script.onload = () => {
                this._setupGestureRecognizer();
            };
            document.head.appendChild(script);
            
            return true;
        } catch (error) {
            console.error('初始化失败:', error);
            return false;
        }
    }
    
    /**
     * 内部：设置手势识别器
     */
    async _setupGestureRecognizer() {
        try {
            const vision = await window.FilesetResolver.forVisionTasks(
                'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
            );
            
            this.gestureRecognizer = await window.GestureRecognizer.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: 'https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task'
                },
                runningMode: this.runningMode,
                numHands: 2,
                minHandDetectionConfidence: this.config.confidenceThreshold,
                minHandPresenceConfidence: this.config.confidenceThreshold,
                minTrackingConfidence: this.config.confidenceThreshold
            });
            
            console.log('✓ MediaPipe手势识别器已初始化');
        } catch (error) {
            console.error('手势识别器初始化失败:', error);
        }
    }
    
    /**
     * 启动摄像头和手势识别
     */
    async startWebcam(videoElementId = 'gestureVideo', canvasElementId = 'gestureCanvas') {
        try {
            this.video = document.getElementById(videoElementId);
            this.canvas = document.getElementById(canvasElementId);
            
            if (!this.video || !this.canvas) {
                console.warn('视频或画布元素未找到');
                return false;
            }
            
            this.canvasCtx = this.canvas.getContext('2d');
            
            // 请求摄像头权限
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: { ideal: 1280 }, height: { ideal: 720 } }
            });
            
            this.video.srcObject = stream;
            this.video.onloadedmetadata = () => {
                this.video.play();
                this.webcamRunning = true;
                this._detectGestures();
                console.log('✓ 摄像头已启动');
            };
            
            return true;
        } catch (error) {
            console.error('启动摄像头失败:', error);
            return false;
        }
    }
    
    /**
     * 内部：检测手势
     */
    _detectGestures() {
        if (!this.webcamRunning || !this.gestureRecognizer) {
            return;
        }
        
        const startTime = performance.now();
        
        // 识别手势
        const results = this.gestureRecognizer.recognizeForVideo(this.video, startTime);
        
        // 处理结果
        this._processResults(results);
        
        // 绘制结果
        if (this.config.showVideo) {
            this._drawResults(results);
        }
        
        this.stats.framesProcessed++;
        
        // 继续识别
        requestAnimationFrame(() => this._detectGestures());
    }
    
    /**
     * 内部：处理识别结果
     */
    _processResults(results) {
        if (!results.gestures || results.gestures.length === 0) {
            return;
        }
        
        // 处理每只手的手势
        for (let i = 0; i < results.gestures.length; i++) {
            const gestures = results.gestures[i];
            
            if (gestures.length > 0) {
                const topGesture = gestures[0];
                const gestureName = topGesture.categoryName;
                const confidence = topGesture.score;
                
                // 添加到历史记录
                this.gestureHistory.push({
                    gesture: gestureName,
                    confidence: confidence,
                    timestamp: Date.now()
                });
                
                // 保持历史大小
                if (this.gestureHistory.length > this.gestureHistorySize) {
                    this.gestureHistory.shift();
                }
                
                // 检查是否应该触发动画
                this._checkAndTriggerAnimation();
            }
        }
    }
    
    /**
     * 内部：检查并触发动画
     */
    _checkAndTriggerAnimation() {
        if (this.gestureHistory.length < 2) {
            return;
        }
        
        // 检查最近的手势是否一致（防止抖动）
        const recentGestures = this.gestureHistory.slice(-2).map(h => h.gesture);
        if (recentGestures[0] !== recentGestures[1]) {
            return;
        }
        
        const currentGesture = recentGestures[0];
        const now = Date.now();
        
        // 检查冷却时间和是否与上次相同
        if (currentGesture === this.lastDetectedGesture && 
            now - this.lastGestureTime < this.gestureCooldown) {
            return;
        }
        
        // 获取对应的动画
        const animationName = this.gestureAnimationMap[currentGesture];
        
        if (animationName && !this.animationRunning) {
            console.log(`🎬 检测到手势: ${currentGesture} -> 播放动画: ${animationName}`);
            
            // 触发动画
            if (typeof playGundamAnimation === 'function') {
                this.animationRunning = true;
                playGundamAnimation(animationName);
                
                // 动画完成后重置标志
                setTimeout(() => {
                    this.animationRunning = false;
                }, 800);
                
                this.stats.animationsTriggered++;
            }
            
            this.lastDetectedGesture = currentGesture;
            this.lastGestureTime = now;
            this.stats.gesturesDetected++;
        }
    }
    
    /**
     * 内部：绘制识别结果
     */
    _drawResults(results) {
        if (!this.canvas || !this.canvasCtx) {
            return;
        }
        
        // 清空画布
        this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制视频帧
        this.canvasCtx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        
        if (!this.config.showLandmarks) {
            return;
        }
        
        // 绘制手部标记
        if (results.landmarks) {
            for (let i = 0; i < results.landmarks.length; i++) {
                const landmarks = results.landmarks[i];
                
                // 绘制关键点
                for (let j = 0; j < landmarks.length; j++) {
                    const landmark = landmarks[j];
                    const x = landmark.x * this.canvas.width;
                    const y = landmark.y * this.canvas.height;
                    
                    // 绘制圆点
                    this.canvasCtx.beginPath();
                    this.canvasCtx.arc(x, y, 5, 0, 2 * Math.PI);
                    this.canvasCtx.fillStyle = '#00ff00';
                    this.canvasCtx.fill();
                }
                
                // 绘制连接线
                this._drawConnections(landmarks);
            }
        }
        
        // 绘制手势标签
        if (results.gestures) {
            for (let i = 0; i < results.gestures.length; i++) {
                const gestures = results.gestures[i];
                if (gestures.length > 0) {
                    const gesture = gestures[0];
                    this.canvasCtx.font = '16px Arial';
                    this.canvasCtx.fillStyle = '#00ffff';
                    this.canvasCtx.fillText(
                        `${gesture.categoryName} (${(gesture.score * 100).toFixed(1)}%)`,
                        10,
                        30 + i * 25
                    );
                }
            }
        }
    }
    
    /**
     * 内部：绘制手部连接线
     */
    _drawConnections(landmarks) {
        // 手部骨骼连接
        const connections = [
            [0, 1], [1, 2], [2, 3], [3, 4], // 拇指
            [0, 5], [5, 6], [6, 7], [7, 8], // 食指
            [0, 9], [9, 10], [10, 11], [11, 12], // 中指
            [0, 13], [13, 14], [14, 15], [15, 16], // 无名指
            [0, 17], [17, 18], [18, 19], [19, 20] // 小指
        ];
        
        this.canvasCtx.strokeStyle = '#00ff00';
        this.canvasCtx.lineWidth = 2;
        
        for (const [start, end] of connections) {
            const startLandmark = landmarks[start];
            const endLandmark = landmarks[end];
            
            const x1 = startLandmark.x * this.canvas.width;
            const y1 = startLandmark.y * this.canvas.height;
            const x2 = endLandmark.x * this.canvas.width;
            const y2 = endLandmark.y * this.canvas.height;
            
            this.canvasCtx.beginPath();
            this.canvasCtx.moveTo(x1, y1);
            this.canvasCtx.lineTo(x2, y2);
            this.canvasCtx.stroke();
        }
    }
    
    /**
     * 停止摄像头
     */
    stopWebcam() {
        if (this.video && this.video.srcObject) {
            const tracks = this.video.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            this.webcamRunning = false;
            console.log('✓ 摄像头已停止');
        }
    }
    
    /**
     * 设置手势到动画的映射
     */
    setGestureAnimationMap(map) {
        this.gestureAnimationMap = { ...this.gestureAnimationMap, ...map };
    }
    
    /**
     * 获取统计信息
     */
    getStats() {
        return {
            ...this.stats,
            webcamRunning: this.webcamRunning,
            lastDetectedGesture: this.lastDetectedGesture
        };
    }
    
    /**
     * 重置统计信息
     */
    resetStats() {
        this.stats = {
            framesProcessed: 0,
            gesturesDetected: 0,
            animationsTriggered: 0
        };
    }
}

// 创建全局实例
let gestureControl = null;

/**
 * 初始化手势控制系统
 */
async function initGestureControl(options = {}) {
    gestureControl = new GestureControl(options);
    await gestureControl.init();
    return gestureControl;
}

/**
 * 启动手势识别摄像头
 */
async function startGestureWebcam(videoElementId, canvasElementId) {
    if (!gestureControl) {
        console.warn('手势控制系统未初始化');
        return false;
    }
    return await gestureControl.startWebcam(videoElementId, canvasElementId);
}

/**
 * 停止手势识别摄像头
 */
function stopGestureWebcam() {
    if (gestureControl) {
        gestureControl.stopWebcam();
    }
}

/**
 * 获取手势控制统计信息
 */
function getGestureStats() {
    if (!gestureControl) {
        return null;
    }
    return gestureControl.getStats();
}
