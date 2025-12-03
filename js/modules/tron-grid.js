/**
 * TRON霓虹网格模块 - TRON Neon Grid Module
 * 创建和控制TRON风格的霓虹网格效果
 */

class TronGrid {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`TronGrid: Container with id "${containerId}" not found`);
            return;
        }

        // 默认配置
        this.config = {
            gridSize: options.gridSize || 100,
            smallGridSize: options.smallGridSize || 20,
            nodeCount: options.nodeCount || 15,
            lineCount: options.lineCount || 8,
            rippleCount: options.rippleCount || 5,
            colors: options.colors || {
                primary: '#00ff88',
                secondary: '#00a3ff',
                accent: '#ff0066',
                warning: '#ffaa00',
                special: '#aa00ff'
            },
            animationSpeed: options.animationSpeed || 1,
            enabled: options.enabled !== false
        };

        this.isInitialized = false;
        this.animationFrameId = null;
        this.elements = {
            grid: null,
            nodes: [],
            lines: [],
            ripples: []
        };

        if (this.config.enabled) {
            this.init();
        }
    }

    /**
     * 初始化TRON网格
     */
    init() {
        if (this.isInitialized) return;

        this.createGridContainer();
        this.createGrid();
        this.createNodes();
        this.createLines();
        this.createRipples();
        this.startAnimation();

        this.isInitialized = true;
        console.log('TronGrid: Initialized successfully');
    }

    /**
     * 创建网格容器
     */
    createGridContainer() {
        this.container.innerHTML = '';
        this.container.className = 'tron-grid-container';
        
        // 创建主网格
        this.elements.grid = document.createElement('div');
        this.elements.grid.className = 'tron-grid';
        this.container.appendChild(this.elements.grid);

        // 创建动漫风格增强层
        const animeLayer = document.createElement('div');
        animeLayer.className = 'anime-enhancement';
        this.container.appendChild(animeLayer);
    }

    /**
     * 创建基础网格
     */
    createGrid() {
        const style = this.elements.grid.style;
        style.backgroundSize = `
            ${this.config.gridSize}px ${this.config.gridSize}px,
            ${this.config.gridSize}px ${this.config.gridSize}px,
            ${this.config.smallGridSize}px ${this.config.smallGridSize}px,
            ${this.config.smallGridSize}px ${this.config.smallGridSize}px
        `;
    }

    /**
     * 创建网格节点
     */
    createNodes() {
        const colors = Object.values(this.config.colors);
        
        for (let i = 0; i < this.config.nodeCount; i++) {
            const node = document.createElement('div');
            node.className = 'tron-grid-node';
            
            // 随机颜色
            const colorClass = ['', 'blue', 'pink'][Math.floor(Math.random() * 3)];
            if (colorClass) node.classList.add(colorClass);
            
            // 随机位置
            node.style.left = Math.random() * 100 + '%';
            node.style.top = Math.random() * 100 + '%';
            
            // 随机延迟
            node.style.animationDelay = Math.random() * 2 + 's';
            
            this.container.appendChild(node);
            this.elements.nodes.push(node);
        }
    }

    /**
     * 创建动态网格线
     */
    createLines() {
        // 水平线
        for (let i = 0; i < this.config.lineCount / 2; i++) {
            const line = document.createElement('div');
            line.className = 'tron-grid-line';
            line.style.top = Math.random() * 100 + '%';
            line.style.animationDelay = Math.random() * 3 + 's';
            line.style.animationDuration = (2 + Math.random() * 2) + 's';
            
            this.container.appendChild(line);
            this.elements.lines.push(line);
        }

        // 垂直线
        for (let i = 0; i < this.config.lineCount / 2; i++) {
            const line = document.createElement('div');
            line.className = 'tron-grid-line vertical';
            line.style.left = Math.random() * 100 + '%';
            line.style.animationDelay = Math.random() * 4 + 's';
            line.style.animationDuration = (3 + Math.random() * 2) + 's';
            
            this.container.appendChild(line);
            this.elements.lines.push(line);
        }
    }

    /**
     * 创建波纹效果
     */
    createRipples() {
        for (let i = 0; i < this.config.rippleCount; i++) {
            const ripple = document.createElement('div');
            ripple.className = 'tron-grid-ripple';
            
            // 随机位置
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            ripple.style.left = x + '%';
            ripple.style.top = y + '%';
            ripple.style.marginLeft = '-100px';
            ripple.style.marginTop = '-100px';
            
            // 随机延迟和持续时间
            ripple.style.animationDelay = Math.random() * 5 + 's';
            ripple.style.animationDuration = (1.5 + Math.random() * 1) + 's';
            
            this.container.appendChild(ripple);
            this.elements.ripples.push(ripple);
        }
    }

    /**
     * 开始动画循环
     */
    startAnimation() {
        const animate = () => {
            this.updateNodes();
            this.updateLines();
            
            if (this.config.enabled) {
                this.animationFrameId = requestAnimationFrame(animate);
            }
        };
        
        animate();
    }

    /**
     * 更新节点位置和效果
     */
    updateNodes() {
        this.elements.nodes.forEach((node, index) => {
            // 随机闪烁效果
            if (Math.random() < 0.001) {
                node.style.animationDuration = (0.5 + Math.random() * 1.5) + 's';
            }
        });
    }

    /**
     * 更新线条效果
     */
    updateLines() {
        this.elements.lines.forEach((line, index) => {
            // 随机重新定位
            if (Math.random() < 0.0005) {
                if (line.classList.contains('vertical')) {
                    line.style.left = Math.random() * 100 + '%';
                } else {
                    line.style.top = Math.random() * 100 + '%';
                }
            }
        });
    }

    /**
     * 创建点击波纹效果
     */
    createClickRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'tron-grid-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.marginLeft = '-100px';
        ripple.style.marginTop = '-100px';
        ripple.style.animationDuration = '1s';
        
        this.container.appendChild(ripple);
        
        // 动画完成后移除
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 1000);
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
     * 启用/禁用网格
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
        
        this.container.style.animationPlayState = 'paused';
        this.elements.nodes.forEach(node => {
            node.style.animationPlayState = 'paused';
        });
        this.elements.lines.forEach(line => {
            line.style.animationPlayState = 'paused';
        });
    }

    /**
     * 恢复动画
     */
    resume() {
        this.container.style.animationPlayState = 'running';
        this.elements.nodes.forEach(node => {
            node.style.animationPlayState = 'running';
        });
        this.elements.lines.forEach(line => {
            line.style.animationPlayState = 'running';
        });
        
        this.startAnimation();
    }

    /**
     * 销毁网格
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
            grid: null,
            nodes: [],
            lines: [],
            ripples: []
        };
        
        this.isInitialized = false;
        console.log('TronGrid: Destroyed');
    }

    /**
     * 获取当前状态
     */
    getStatus() {
        return {
            initialized: this.isInitialized,
            enabled: this.config.enabled,
            nodeCount: this.elements.nodes.length,
            lineCount: this.elements.lines.length,
            rippleCount: this.elements.ripples.length
        };
    }
}

// 全局导出
window.TronGrid = TronGrid;

// 自动初始化（如果存在容器）
document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('[data-tron-grid]');
    containers.forEach(container => {
        const options = container.dataset.tronGridOptions ? 
            JSON.parse(container.dataset.tronGridOptions) : {};
        new TronGrid(container.id, options);
    });
});
