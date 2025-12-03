/**
 * 数据光流模块 - Data Stream Module
 * 创建和控制TRON风格的数据流效果
 */

class DataStream {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`DataStream: Container with id "${containerId}" not found`);
            return;
        }

        // 默认配置
        this.config = {
            streamCount: options.streamCount || 20,
            packetCount: options.packetCount || 15,
            spiralCount: options.spiralCount || 3,
            matrixCount: options.matrixCount || 10,
            colors: options.colors || ['#00ff88', '#00a3ff', '#ff0066', '#ffaa00', '#aa00ff'],
            animationSpeed: options.animationSpeed || 1,
            enabled: options.enabled !== false,
            animeStyle: options.animeStyle || true
        };

        this.isInitialized = false;
        this.animationFrameId = null;
        this.elements = {
            streams: [],
            packets: [],
            spirals: [],
            matrices: [],
            waveforms: []
        };

        this.matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

        if (this.config.enabled) {
            this.init();
        }
    }

    /**
     * 初始化数据流系统
     */
    init() {
        if (this.isInitialized) return;

        this.createStreamContainer();
        this.createStreams();
        this.createPackets();
        this.createSpirals();
        this.createMatrices();
        this.createWaveforms();
        this.startAnimation();

        this.isInitialized = true;
        console.log('DataStream: Initialized successfully');
    }

    /**
     * 创建流容器
     */
    createStreamContainer() {
        this.container.innerHTML = '';
        this.container.className = 'data-stream-container';
    }

    /**
     * 创建数据流
     */
    createStreams() {
        for (let i = 0; i < this.config.streamCount; i++) {
            const stream = document.createElement('div');
            
            // 随机选择垂直或水平流
            const isHorizontal = Math.random() < 0.3;
            stream.className = isHorizontal ? 'data-stream horizontal' : 'data-stream';
            
            if (this.config.animeStyle && Math.random() < 0.4) {
                stream.className = 'anime-data-stream';
            }
            
            // 随机位置
            if (isHorizontal) {
                stream.style.top = Math.random() * 100 + '%';
                stream.style.left = '-100px';
            } else {
                stream.style.left = Math.random() * 100 + '%';
                stream.style.top = '-100px';
            }
            
            // 随机延迟和持续时间
            stream.style.animationDelay = Math.random() * 5 + 's';
            stream.style.animationDuration = (2 + Math.random() * 3) + 's';
            
            this.container.appendChild(stream);
            this.elements.streams.push(stream);
        }
    }

    /**
     * 创建数据包
     */
    createPackets() {
        const colors = ['', 'blue', 'pink', 'orange'];
        
        for (let i = 0; i < this.config.packetCount; i++) {
            const packet = document.createElement('div');
            packet.className = 'data-packet';
            
            // 随机颜色
            const colorClass = colors[Math.floor(Math.random() * colors.length)];
            if (colorClass) packet.classList.add(colorClass);
            
            // 随机垂直位置
            packet.style.top = Math.random() * 100 + '%';
            packet.style.left = '-50px';
            
            // 随机延迟
            packet.style.animationDelay = Math.random() * 6 + 's';
            packet.style.animationDuration = (3 + Math.random() * 2) + 's';
            
            this.container.appendChild(packet);
            this.elements.packets.push(packet);
        }
    }

    /**
     * 创建数据螺旋
     */
    createSpirals() {
        for (let i = 0; i < this.config.spiralCount; i++) {
            const spiral = document.createElement('div');
            spiral.className = 'data-spiral';
            
            // 随机位置
            spiral.style.left = Math.random() * (window.innerWidth - 200) + 'px';
            spiral.style.top = Math.random() * (window.innerHeight - 200) + 'px';
            
            // 随机旋转速度
            spiral.style.animationDuration = (2 + Math.random() * 2) + 's';
            spiral.style.animationDelay = Math.random() * 3 + 's';
            
            this.container.appendChild(spiral);
            this.elements.spirals.push(spiral);
        }
    }

    /**
     * 创建数据矩阵
     */
    createMatrices() {
        for (let i = 0; i < this.config.matrixCount; i++) {
            const matrix = document.createElement('div');
            matrix.className = 'data-matrix';
            
            // 随机颜色
            const colorClass = ['', 'blue', 'pink'][Math.floor(Math.random() * 3)];
            if (colorClass) matrix.classList.add(colorClass);
            
            // 生成随机字符串
            matrix.textContent = this.generateMatrixText();
            
            // 随机位置
            matrix.style.left = Math.random() * 100 + '%';
            matrix.style.top = '-50px';
            
            // 随机延迟
            matrix.style.animationDelay = Math.random() * 7 + 's';
            matrix.style.animationDuration = (4 + Math.random() * 2) + 's';
            
            this.container.appendChild(matrix);
            this.elements.matrices.push(matrix);
        }
    }

    /**
     * 创建波形效果
     */
    createWaveforms() {
        for (let i = 0; i < 3; i++) {
            const waveform = document.createElement('div');
            waveform.className = 'data-waveform';
            
            // 随机垂直位置
            waveform.style.top = (20 + i * 30 + Math.random() * 10) + '%';
            
            // 随机延迟
            waveform.style.animationDelay = Math.random() * 2 + 's';
            waveform.style.animationDuration = (1 + Math.random() * 1) + 's';
            
            this.container.appendChild(waveform);
            this.elements.waveforms.push(waveform);
        }
    }

    /**
     * 生成矩阵文本
     */
    generateMatrixText() {
        const length = 8 + Math.floor(Math.random() * 12);
        let text = '';
        for (let i = 0; i < length; i++) {
            text += this.matrixChars.charAt(Math.floor(Math.random() * this.matrixChars.length));
        }
        return text;
    }

    /**
     * 开始动画循环
     */
    startAnimation() {
        let lastTime = 0;
        
        const animate = (currentTime) => {
            if (currentTime - lastTime >= 16) { // ~60fps
                this.updateStreams();
                this.updateMatrices();
                this.updatePackets();
                lastTime = currentTime;
            }
            
            if (this.config.enabled) {
                this.animationFrameId = requestAnimationFrame(animate);
            }
        };
        
        animate(0);
    }

    /**
     * 更新数据流
     */
    updateStreams() {
        this.elements.streams.forEach((stream, index) => {
            // 随机重新创建已完成的流
            if (Math.random() < 0.001) {
                this.recreateStream(stream, index);
            }
        });
    }

    /**
     * 更新矩阵文本
     */
    updateMatrices() {
        this.elements.matrices.forEach((matrix, index) => {
            // 随机更新文本内容
            if (Math.random() < 0.01) {
                matrix.textContent = this.generateMatrixText();
            }
        });
    }

    /**
     * 更新数据包
     */
    updatePackets() {
        this.elements.packets.forEach((packet, index) => {
            // 随机改变数据包大小
            if (Math.random() < 0.005) {
                const scale = 0.5 + Math.random() * 1.5;
                packet.style.transform = `scale(${scale})`;
            }
        });
    }

    /**
     * 重新创建数据流
     */
    recreateStream(stream, index) {
        const isHorizontal = stream.classList.contains('horizontal');
        
        // 重新定位
        if (isHorizontal) {
            stream.style.top = Math.random() * 100 + '%';
            stream.style.left = '-100px';
        } else {
            stream.style.left = Math.random() * 100 + '%';
            stream.style.top = '-100px';
        }
        
        // 重新设置动画
        stream.style.animationDelay = '0s';
        stream.style.animationDuration = (2 + Math.random() * 3) + 's';
    }

    /**
     * 创建爆发效果
     */
    createBurst(x, y) {
        const burstCount = 8 + Math.floor(Math.random() * 8);
        
        for (let i = 0; i < burstCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'data-packet';
            particle.style.position = 'absolute';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            
            // 随机方向和距离
            const angle = (i / burstCount) * Math.PI * 2;
            const distance = 50 + Math.random() * 100;
            const endX = x + Math.cos(angle) * distance;
            const endY = y + Math.sin(angle) * distance;
            
            // 动画到目标位置
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`, opacity: 0 }
            ], {
                duration: 800 + Math.random() * 400,
                easing: 'ease-out'
            }).onfinish = () => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            };
            
            this.container.appendChild(particle);
        }
    }

    /**
     * 更新配置
     */
    updateConfig(newConfig) {
        Object.assign(this.config, newConfig);
        
        if (this.isInitialized) {
            this.destroy();
            this.init();
        }
    }

    /**
     * 启用/禁用数据流
     */
    toggle(enabled = null) {
        this.config.enabled = enabled !== null ? enabled : !this.config.enabled;
        
        if (this.config.enabled && !this.isInitialized) {
            this.init();
        } else if (!this.config.enabled && this.isInitialized) {
            this.pause();
        } else if (this.config.enabled && this.isInitialized) {
            this.resume();
        }
    }

    /**
     * 暂停动画
     */
    pause() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        
        // 暂停所有元素动画
        [...this.elements.streams, ...this.elements.packets, 
         ...this.elements.spirals, ...this.elements.matrices, 
         ...this.elements.waveforms].forEach(element => {
            element.style.animationPlayState = 'paused';
        });
    }

    /**
     * 恢复动画
     */
    resume() {
        // 恢复所有元素动画
        [...this.elements.streams, ...this.elements.packets, 
         ...this.elements.spirals, ...this.elements.matrices, 
         ...this.elements.waveforms].forEach(element => {
            element.style.animationPlayState = 'running';
        });
        
        this.startAnimation();
    }

    /**
     * 销毁数据流系统
     */
    destroy() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        
        if (this.container) {
            this.container.innerHTML = '';
        }
        
        this.elements = {
            streams: [],
            packets: [],
            spirals: [],
            matrices: [],
            waveforms: []
        };
        
        this.isInitialized = false;
        console.log('DataStream: Destroyed');
    }

    /**
     * 获取当前状态
     */
    getStatus() {
        return {
            initialized: this.isInitialized,
            enabled: this.config.enabled,
            streamCount: this.elements.streams.length,
            packetCount: this.elements.packets.length,
            spiralCount: this.elements.spirals.length,
            matrixCount: this.elements.matrices.length
        };
    }
}

// 全局导出
window.DataStream = DataStream;

// 自动初始化（如果存在容器）
document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('[data-data-stream]');
    containers.forEach(container => {
        const options = container.dataset.dataStreamOptions ? 
            JSON.parse(container.dataset.dataStreamOptions) : {};
        new DataStream(container.id, options);
    });
});
