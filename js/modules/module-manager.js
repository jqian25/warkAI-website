/**
 * 模块管理器 - Module Manager
 * 统一管理所有动态效果模块
 */

class ModuleManager {
    constructor(options = {}) {
        this.config = {
            autoInit: options.autoInit !== false,
            performance: options.performance || 'high', // high, medium, low
            modules: options.modules || {},
            debug: options.debug || false
        };

        this.modules = new Map();
        this.activeModules = new Set();
        this.performanceLevel = this.detectPerformance();
        
        // 性能配置
        this.performanceConfigs = {
            high: {
                particleCount: 50,
                streamCount: 20,
                nodeCount: 15,
                animationSpeed: 1
            },
            medium: {
                particleCount: 30,
                streamCount: 12,
                nodeCount: 10,
                animationSpeed: 0.8
            },
            low: {
                particleCount: 15,
                streamCount: 6,
                nodeCount: 5,
                animationSpeed: 0.6
            }
        };

        if (this.config.autoInit) {
            this.init();
        }
    }

    /**
     * 初始化模块管理器
     */
    init() {
        this.log('ModuleManager: Initializing...');
        
        // 检测可用模块
        this.detectAvailableModules();
        
        // 自动初始化标记的容器
        this.autoInitContainers();
        
        // 设置性能监控
        this.setupPerformanceMonitoring();
        
        this.log('ModuleManager: Initialized successfully');
    }

    /**
     * 检测设备性能
     */
    detectPerformance() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        let score = 0;
        
        // 检测硬件加速
        if (gl) score += 30;
        
        // 检测内存
        if (navigator.deviceMemory) {
            score += Math.min(navigator.deviceMemory * 5, 30);
        } else {
            score += 15; // 默认中等
        }
        
        // 检测CPU核心数
        if (navigator.hardwareConcurrency) {
            score += Math.min(navigator.hardwareConcurrency * 5, 20);
        } else {
            score += 10; // 默认中等
        }
        
        // 检测屏幕分辨率
        const pixelRatio = window.devicePixelRatio || 1;
        const screenArea = window.screen.width * window.screen.height * pixelRatio;
        if (screenArea > 2073600) score += 20; // > 1080p
        else if (screenArea > 921600) score += 15; // > 720p
        else score += 10;
        
        if (score >= 70) return 'high';
        if (score >= 40) return 'medium';
        return 'low';
    }

    /**
     * 检测可用模块
     */
    detectAvailableModules() {
        const moduleClasses = {
            'tron-grid': window.TronGrid,
            'data-stream': window.DataStream,
            'particle-system': window.ParticleSystem,
            'hologram': window.Hologram,
            'energy-circuit': window.EnergyCircuit,
            'zaku-transformer': window.ZakuTransformer
        };

        for (const [name, moduleClass] of Object.entries(moduleClasses)) {
            if (moduleClass) {
                this.registerModule(name, moduleClass);
                this.log(`Module detected: ${name}`);
            }
        }
    }

    /**
     * 注册模块
     */
    registerModule(name, moduleClass, config = {}) {
        this.modules.set(name, {
            class: moduleClass,
            config: config,
            instances: new Map()
        });
        
        this.log(`Module registered: ${name}`);
    }

    /**
     * 创建模块实例
     */
    createModule(moduleName, containerId, options = {}) {
        const module = this.modules.get(moduleName);
        if (!module) {
            this.log(`Module not found: ${moduleName}`, 'error');
            return null;
        }

        const container = document.getElementById(containerId);
        if (!container) {
            this.log(`Container not found: ${containerId}`, 'error');
            return null;
        }

        // 应用性能配置
        const performanceConfig = this.performanceConfigs[this.performanceLevel];
        const finalOptions = Object.assign({}, performanceConfig, module.config, options);

        try {
            const instance = new module.class(containerId, finalOptions);
            module.instances.set(containerId, instance);
            this.activeModules.add(`${moduleName}:${containerId}`);
            
            this.log(`Module created: ${moduleName} in ${containerId}`);
            return instance;
        } catch (error) {
            this.log(`Failed to create module ${moduleName}: ${error.message}`, 'error');
            return null;
        }
    }

    /**
     * 自动初始化容器
     */
    autoInitContainers() {
        // TRON网格
        document.querySelectorAll('[data-tron-grid]').forEach(container => {
            const options = this.parseDataOptions(container.dataset.tronGridOptions);
            this.createModule('tron-grid', container.id, options);
        });

        // 数据流
        document.querySelectorAll('[data-data-stream]').forEach(container => {
            const options = this.parseDataOptions(container.dataset.dataStreamOptions);
            this.createModule('data-stream', container.id, options);
        });

        // 粒子系统
        document.querySelectorAll('[data-particle-system]').forEach(container => {
            const options = this.parseDataOptions(container.dataset.particleSystemOptions);
            this.createModule('particle-system', container.id, options);
        });

        // 全息投影
        document.querySelectorAll('[data-hologram]').forEach(container => {
            const options = this.parseDataOptions(container.dataset.hologramOptions);
            this.createModule('hologram', container.id, options);
        });

        // 能量回路
        document.querySelectorAll('[data-energy-circuit]').forEach(container => {
            const options = this.parseDataOptions(container.dataset.energyCircuitOptions);
            this.createModule('energy-circuit', container.id, options);
        });

        // 扎古变形器
        document.querySelectorAll('[data-zaku-transformer]').forEach(container => {
            const options = this.parseDataOptions(container.dataset.zakuTransformerOptions);
            this.createModule('zaku-transformer', container.id, options);
        });
    }

    /**
     * 解析数据选项
     */
    parseDataOptions(optionsString) {
        if (!optionsString) return {};
        
        try {
            return JSON.parse(optionsString);
        } catch (error) {
            this.log(`Failed to parse options: ${optionsString}`, 'warn');
            return {};
        }
    }

    /**
     * 获取模块实例
     */
    getModule(moduleName, containerId) {
        const module = this.modules.get(moduleName);
        if (!module) return null;
        
        return module.instances.get(containerId) || null;
    }

    /**
     * 销毁模块实例
     */
    destroyModule(moduleName, containerId) {
        const module = this.modules.get(moduleName);
        if (!module) return false;

        const instance = module.instances.get(containerId);
        if (instance && typeof instance.destroy === 'function') {
            instance.destroy();
            module.instances.delete(containerId);
            this.activeModules.delete(`${moduleName}:${containerId}`);
            
            this.log(`Module destroyed: ${moduleName} in ${containerId}`);
            return true;
        }
        
        return false;
    }

    /**
     * 暂停所有模块
     */
    pauseAll() {
        for (const [moduleName, module] of this.modules) {
            for (const [containerId, instance] of module.instances) {
                if (typeof instance.pause === 'function') {
                    instance.pause();
                }
            }
        }
        
        this.log('All modules paused');
    }

    /**
     * 恢复所有模块
     */
    resumeAll() {
        for (const [moduleName, module] of this.modules) {
            for (const [containerId, instance] of module.instances) {
                if (typeof instance.resume === 'function') {
                    instance.resume();
                }
            }
        }
        
        this.log('All modules resumed');
    }

    /**
     * 切换所有模块
     */
    toggleAll(enabled = null) {
        for (const [moduleName, module] of this.modules) {
            for (const [containerId, instance] of module.instances) {
                if (typeof instance.toggle === 'function') {
                    instance.toggle(enabled);
                }
            }
        }
        
        this.log(`All modules ${enabled === false ? 'disabled' : 'enabled'}`);
    }

    /**
     * 设置性能级别
     */
    setPerformanceLevel(level) {
        if (!this.performanceConfigs[level]) {
            this.log(`Invalid performance level: ${level}`, 'error');
            return;
        }

        this.performanceLevel = level;
        
        // 更新所有活动模块的配置
        for (const [moduleName, module] of this.modules) {
            for (const [containerId, instance] of module.instances) {
                if (typeof instance.updateConfig === 'function') {
                    instance.updateConfig(this.performanceConfigs[level]);
                }
            }
        }
        
        this.log(`Performance level set to: ${level}`);
    }

    /**
     * 设置性能监控
     */
    setupPerformanceMonitoring() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const monitor = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                // 自动调整性能级别
                if (fps < 30 && this.performanceLevel === 'high') {
                    this.setPerformanceLevel('medium');
                } else if (fps < 20 && this.performanceLevel === 'medium') {
                    this.setPerformanceLevel('low');
                } else if (fps > 50 && this.performanceLevel === 'low') {
                    this.setPerformanceLevel('medium');
                } else if (fps > 55 && this.performanceLevel === 'medium') {
                    this.setPerformanceLevel('high');
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(monitor);
        };
        
        requestAnimationFrame(monitor);
    }

    /**
     * 获取系统状态
     */
    getStatus() {
        const status = {
            performanceLevel: this.performanceLevel,
            activeModules: this.activeModules.size,
            registeredModules: this.modules.size,
            modules: {}
        };

        for (const [moduleName, module] of this.modules) {
            status.modules[moduleName] = {
                instances: module.instances.size,
                active: Array.from(module.instances.keys())
            };
        }

        return status;
    }

    /**
     * 日志输出
     */
    log(message, level = 'info') {
        if (!this.config.debug && level === 'info') return;
        
        const timestamp = new Date().toISOString();
        const prefix = `[${timestamp}] ModuleManager:`;
        
        switch (level) {
            case 'error':
                console.error(prefix, message);
                break;
            case 'warn':
                console.warn(prefix, message);
                break;
            default:
                console.log(prefix, message);
        }
    }

    /**
     * 销毁管理器
     */
    destroy() {
        // 销毁所有模块实例
        for (const [moduleName, module] of this.modules) {
            for (const containerId of module.instances.keys()) {
                this.destroyModule(moduleName, containerId);
            }
        }
        
        this.modules.clear();
        this.activeModules.clear();
        
        this.log('ModuleManager destroyed');
    }
}

// 全局导出
window.ModuleManager = ModuleManager;

// 创建全局实例
window.moduleManager = new ModuleManager({
    debug: true,
    autoInit: true
});

// 页面卸载时清理
window.addEventListener('beforeunload', () => {
    if (window.moduleManager) {
        window.moduleManager.destroy();
    }
});
