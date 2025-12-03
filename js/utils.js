// WarkAI 工具函数模块 - 暗黑机甲风格

class WarkAIUtils {
    constructor() {
        this.config = window.WarkAIConfig || {};
    }

    // ==================== 通用工具函数 ====================

    /**
     * 防抖函数
     * @param {Function} func - 要防抖的函数
     * @param {number} wait - 等待时间（毫秒）
     * @param {boolean} immediate - 是否立即执行
     * @returns {Function} 防抖后的函数
     */
    debounce(func, wait, immediate = false) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    /**
     * 节流函数
     * @param {Function} func - 要节流的函数
     * @param {number} limit - 限制时间（毫秒）
     * @returns {Function} 节流后的函数
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * 深度克隆对象
     * @param {any} obj - 要克隆的对象
     * @returns {any} 克隆后的对象
     */
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => this.deepClone(item));
        if (typeof obj === 'object') {
            const clonedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = this.deepClone(obj[key]);
                }
            }
            return clonedObj;
        }
    }

    /**
     * 生成唯一ID
     * @param {string} prefix - ID前缀
     * @returns {string} 唯一ID
     */
    generateId(prefix = 'warkai') {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // ==================== DOM 操作工具 ====================

    /**
     * 查询元素
     * @param {string} selector - CSS选择器
     * @param {Element} context - 查询上下文
     * @returns {Element|null} 查询到的元素
     */
    $(selector, context = document) {
        return context.querySelector(selector);
    }

    /**
     * 查询所有元素
     * @param {string} selector - CSS选择器
     * @param {Element} context - 查询上下文
     * @returns {NodeList} 查询到的元素列表
     */
    $$(selector, context = document) {
        return context.querySelectorAll(selector);
    }

    /**
     * 创建元素
     * @param {string} tag - 标签名
     * @param {Object} attributes - 属性对象
     * @param {string} content - 内容
     * @returns {Element} 创建的元素
     */
    createElement(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'style' && typeof value === 'object') {
                Object.assign(element.style, value);
            } else {
                element.setAttribute(key, value);
            }
        });
        
        if (content) {
            element.innerHTML = content;
        }
        
        return element;
    }

    /**
     * 添加事件监听器
     * @param {Element|string} element - 元素或选择器
     * @param {string} event - 事件类型
     * @param {Function} handler - 事件处理函数
     * @param {Object} options - 选项
     */
    on(element, event, handler, options = {}) {
        const el = typeof element === 'string' ? this.$(element) : element;
        if (el) {
            el.addEventListener(event, handler, options);
        }
    }

    /**
     * 移除事件监听器
     * @param {Element|string} element - 元素或选择器
     * @param {string} event - 事件类型
     * @param {Function} handler - 事件处理函数
     */
    off(element, event, handler) {
        const el = typeof element === 'string' ? this.$(element) : element;
        if (el) {
            el.removeEventListener(event, handler);
        }
    }

    // ==================== 动画工具 ====================

    /**
     * 平滑滚动到元素
     * @param {Element|string} element - 目标元素或选择器
     * @param {Object} options - 滚动选项
     */
    scrollTo(element, options = {}) {
        const el = typeof element === 'string' ? this.$(element) : element;
        if (el) {
            el.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest',
                ...options
            });
        }
    }

    /**
     * 淡入动画
     * @param {Element|string} element - 元素或选择器
     * @param {number} duration - 持续时间（毫秒）
     * @returns {Promise} 动画完成的Promise
     */
    fadeIn(element, duration = 300) {
        const el = typeof element === 'string' ? this.$(element) : element;
        if (!el) return Promise.resolve();

        return new Promise(resolve => {
            el.style.opacity = '0';
            el.style.display = 'block';
            el.style.transition = `opacity ${duration}ms ease`;
            
            requestAnimationFrame(() => {
                el.style.opacity = '1';
                setTimeout(resolve, duration);
            });
        });
    }

    /**
     * 淡出动画
     * @param {Element|string} element - 元素或选择器
     * @param {number} duration - 持续时间（毫秒）
     * @returns {Promise} 动画完成的Promise
     */
    fadeOut(element, duration = 300) {
        const el = typeof element === 'string' ? this.$(element) : element;
        if (!el) return Promise.resolve();

        return new Promise(resolve => {
            el.style.transition = `opacity ${duration}ms ease`;
            el.style.opacity = '0';
            
            setTimeout(() => {
                el.style.display = 'none';
                resolve();
            }, duration);
        });
    }

    // ==================== 存储工具 ====================

    /**
     * 设置本地存储
     * @param {string} key - 键名
     * @param {any} value - 值
     */
    setStorage(key, value) {
        try {
            const fullKey = `${this.config.storage?.prefix || 'warkAI_'}${key}`;
            localStorage.setItem(fullKey, JSON.stringify(value));
        } catch (error) {
            console.warn('Failed to set localStorage:', error);
        }
    }

    /**
     * 获取本地存储
     * @param {string} key - 键名
     * @param {any} defaultValue - 默认值
     * @returns {any} 存储的值
     */
    getStorage(key, defaultValue = null) {
        try {
            const fullKey = `${this.config.storage?.prefix || 'warkAI_'}${key}`;
            const value = localStorage.getItem(fullKey);
            return value ? JSON.parse(value) : defaultValue;
        } catch (error) {
            console.warn('Failed to get localStorage:', error);
            return defaultValue;
        }
    }

    /**
     * 移除本地存储
     * @param {string} key - 键名
     */
    removeStorage(key) {
        try {
            const fullKey = `${this.config.storage?.prefix || 'warkAI_'}${key}`;
            localStorage.removeItem(fullKey);
        } catch (error) {
            console.warn('Failed to remove localStorage:', error);
        }
    }

    // ==================== 网络工具 ====================

    /**
     * 发送HTTP请求
     * @param {string} url - 请求URL
     * @param {Object} options - 请求选项
     * @returns {Promise} 请求结果
     */
    async request(url, options = {}) {
        const defaultOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: this.config.api?.timeout || 10000
        };

        const config = { ...defaultOptions, ...options };
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), config.timeout);
            
            const response = await fetch(url, {
                ...config,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Request failed:', error);
            throw error;
        }
    }

    // ==================== 数学工具 ====================

    /**
     * 线性插值
     * @param {number} start - 起始值
     * @param {number} end - 结束值
     * @param {number} t - 插值参数 (0-1)
     * @returns {number} 插值结果
     */
    lerp(start, end, t) {
        return start + (end - start) * t;
    }

    /**
     * 将值限制在指定范围内
     * @param {number} value - 值
     * @param {number} min - 最小值
     * @param {number} max - 最大值
     * @returns {number} 限制后的值
     */
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    /**
     * 将值从一个范围映射到另一个范围
     * @param {number} value - 值
     * @param {number} inMin - 输入最小值
     * @param {number} inMax - 输入最大值
     * @param {number} outMin - 输出最小值
     * @param {number} outMax - 输出最大值
     * @returns {number} 映射后的值
     */
    map(value, inMin, inMax, outMin, outMax) {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    /**
     * 生成随机数
     * @param {number} min - 最小值
     * @param {number} max - 最大值
     * @returns {number} 随机数
     */
    random(min = 0, max = 1) {
        return Math.random() * (max - min) + min;
    }

    // ==================== 颜色工具 ====================

    /**
     * 十六进制颜色转RGB
     * @param {string} hex - 十六进制颜色
     * @returns {Object} RGB对象
     */
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    /**
     * RGB转十六进制颜色
     * @param {number} r - 红色值
     * @param {number} g - 绿色值
     * @param {number} b - 蓝色值
     * @returns {string} 十六进制颜色
     */
    rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    /**
     * 颜色混合
     * @param {string} color1 - 颜色1
     * @param {string} color2 - 颜色2
     * @param {number} ratio - 混合比例 (0-1)
     * @returns {string} 混合后的颜色
     */
    mixColors(color1, color2, ratio) {
        const rgb1 = this.hexToRgb(color1);
        const rgb2 = this.hexToRgb(color2);
        
        if (!rgb1 || !rgb2) return color1;
        
        const r = Math.round(this.lerp(rgb1.r, rgb2.r, ratio));
        const g = Math.round(this.lerp(rgb1.g, rgb2.g, ratio));
        const b = Math.round(this.lerp(rgb1.b, rgb2.b, ratio));
        
        return this.rgbToHex(r, g, b);
    }

    // ==================== 时间工具 ====================

    /**
     * 格式化时间
     * @param {Date|number} date - 日期对象或时间戳
     * @param {string} format - 格式字符串
     * @returns {string} 格式化后的时间
     */
    formatTime(date = new Date(), format = 'YYYY-MM-DD HH:mm:ss') {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');
        const seconds = String(d.getSeconds()).padStart(2, '0');
        
        return format
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hours)
            .replace('mm', minutes)
            .replace('ss', seconds);
    }

    /**
     * 延迟执行
     * @param {number} ms - 延迟时间（毫秒）
     * @returns {Promise} 延迟Promise
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // ==================== 设备检测工具 ====================

    /**
     * 检测是否为移动设备
     * @returns {boolean} 是否为移动设备
     */
    isMobile() {
        return this.config.environment?.isMobile || false;
    }

    /**
     * 检测是否支持触摸
     * @returns {boolean} 是否支持触摸
     */
    isTouch() {
        return this.config.environment?.isTouch || false;
    }

    /**
     * 获取视口尺寸
     * @returns {Object} 视口尺寸对象
     */
    getViewportSize() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    // ==================== 调试工具 ====================

    /**
     * 日志输出
     * @param {string} level - 日志级别
     * @param {string} message - 消息
     * @param {any} data - 数据
     */
    log(level, message, data = null) {
        if (!this.config.debug?.enabled) return;
        
        const logLevel = this.config.debug?.logLevel || 'info';
        const levels = ['debug', 'info', 'warn', 'error'];
        
        if (levels.indexOf(level) >= levels.indexOf(logLevel)) {
            const timestamp = this.formatTime(new Date(), 'HH:mm:ss');
            const prefix = `[WarkAI ${timestamp}] ${level.toUpperCase()}:`;
            
            if (data) {
                console[level](prefix, message, data);
            } else {
                console[level](prefix, message);
            }
        }
    }

    /**
     * 性能监控
     * @param {string} name - 监控名称
     * @param {Function} fn - 要监控的函数
     * @returns {any} 函数执行结果
     */
    async performance(name, fn) {
        const start = performance.now();
        const result = await fn();
        const end = performance.now();
        
        this.log('debug', `Performance [${name}]: ${(end - start).toFixed(2)}ms`);
        return result;
    }
}

// 创建全局实例
const warkAIUtils = new WarkAIUtils();

// 全局访问
window.warkAIUtils = warkAIUtils;

// 导出工具类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WarkAIUtils;
}
