// WarkAI 网站配置文件 - 暗黑机甲风格

const WarkAIConfig = {
    // 系统信息
    system: {
        name: 'WarkAI',
        version: '2.5.0',
        buildVersion: '20250105',
        description: '人机智能新纪元',
        author: 'WarkAI Team',
        copyright: 'WarkAI © 2025'
    },

    // 主题配置
    theme: {
        primary: '#00a3ff',      // 主蓝色
        secondary: '#ff3c3c',    // 主红色
        accent: '#ffd700',       // 金色
        background: '#020a14',   // 背景色
        surface: '#041020',      // 表面色
        text: '#f0f0f0',        // 主文字色
        textSecondary: '#a0a0a0', // 次要文字色
        
        // 特效颜色
        glowBlue: 'rgba(0, 163, 255, 0.7)',
        glowRed: 'rgba(255, 60, 60, 0.7)',
        glowYellow: 'rgba(255, 215, 0, 0.7)'
    },

    // 字体配置
    fonts: {
        primary: "'Rajdhani', sans-serif",
        secondary: "'Orbitron', sans-serif",
        mono: "'Courier New', monospace"
    },

    // 动画配置
    animations: {
        // 变形动画持续时间
        transformDuration: {
            head: 2500,
            core: 3000,
            arms: 2800,
            legs: 2200,
            platform: 3500
        },
        
        // 过渡动画
        transitions: {
            fast: '0.3s ease',
            normal: '0.5s ease',
            slow: '0.8s ease',
            transform: '0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        },
        
        // 启动序列配置
        bootSequence: {
            totalDuration: 5000,
            stepDelay: 800,
            fadeInDuration: 1000
        }
    },

    // 多语言配置
    i18n: {
        defaultLanguage: 'zh',
        supportedLanguages: ['zh', 'en', 'ja'],
        storageKey: 'warkAI_language',
        
        // 语言检测规则
        languageDetection: {
            'zh': ['zh', 'zh-CN', 'zh-TW', 'zh-HK'],
            'ja': ['ja', 'ja-JP'],
            'en': ['en', 'en-US', 'en-GB']
        }
    },

    // 数据可视化配置
    charts: {
        defaultColors: [
            '#00a3ff', '#ff3c3c', '#ffd700', 
            '#4caf50', '#9c27b0', '#ff9800'
        ],
        
        // Chart.js 默认配置
        defaultOptions: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff',
                        font: {
                            family: 'Rajdhani',
                            size: 12
                        }
                    }
                }
            }
        }
    },

    // HUD界面配置
    hud: {
        scanLineSpeed: 3, // 扫描线速度（秒）
        particleCount: 8, // 粒子数量
        energyPulseInterval: 1500, // 能量脉冲间隔（毫秒）
        
        // HUD显示配置
        display: {
            maxWidth: '90%',
            maxHeight: '80%',
            borderRadius: '15px',
            backdropBlur: '15px'
        }
    },

    // 音效配置（视觉反馈）
    audio: {
        enabled: true,
        volume: 0.7,
        
        // 音效类型
        effects: {
            hover: 'mechanical_hover',
            click: 'mechanical_click',
            transform: 'transform_sequence',
            boot: 'system_boot',
            error: 'system_error'
        }
    },

    // 性能配置
    performance: {
        // 动画性能
        reducedMotion: false,
        maxParticles: 50,
        animationFrameLimit: 60,
        
        // 懒加载配置
        lazyLoad: {
            images: true,
            charts: true,
            animations: false
        }
    },

    // 调试配置
    debug: {
        enabled: false,
        logLevel: 'info', // 'debug', 'info', 'warn', 'error'
        showFPS: false,
        showMemoryUsage: false
    },

    // API配置
    api: {
        baseUrl: '',
        timeout: 10000,
        retryAttempts: 3,
        
        // 端点配置
        endpoints: {
            auth: '/api/auth',
            data: '/api/data',
            charts: '/api/charts',
            feedback: '/api/feedback'
        }
    },

    // 存储配置
    storage: {
        prefix: 'warkAI_',
        
        // 存储键
        keys: {
            language: 'language',
            theme: 'theme',
            userPrefs: 'userPrefs',
            visitCount: 'visitCount',
            lastVisit: 'lastVisit'
        }
    },

    // 页面配置
    pages: {
        // 主页配置
        main: {
            title: 'WarkAI: 人机智能新纪元',
            description: '融合AI、AR与机器人技术，重塑未来生产力',
            
            // 导航部件配置
            navigation: {
                head: {
                    target: 'pages/team.html',
                    label: '团队介绍与愿景',
                    transformType: 'head'
                },
                core: {
                    target: 'pages/summary.html',
                    label: '执行摘要与商业模式',
                    transformType: 'core'
                },
                arms: {
                    target: 'pages/products.html',
                    label: '核心产品线',
                    transformType: 'arms'
                },
                legs: {
                    target: 'pages/market.html',
                    label: '市场应用与路线图',
                    transformType: 'legs'
                },
                platform: {
                    target: 'pages/technology.html',
                    label: 'WarkAI OS 核心技术与AI平台',
                    transformType: 'platform'
                }
            }
        },
        
        // 登录页配置
        login: {
            title: '系统认证',
            description: '请输入您的凭据以访问WarkAI系统',
            
            // 启动序列配置
            bootSequence: [
                'systemInit',
                'coreModules', 
                'securityProtocol',
                'uiPreparation',
                'authSystem'
            ]
        }
    },

    // 响应式断点
    breakpoints: {
        mobile: '768px',
        tablet: '1024px',
        desktop: '1200px',
        wide: '1600px'
    },

    // 浏览器兼容性
    compatibility: {
        minChrome: 80,
        minFirefox: 75,
        minSafari: 13,
        minEdge: 80,
        
        // 功能检测
        features: {
            webgl: true,
            canvas: true,
            localStorage: true,
            animations: true
        }
    }
};

// 环境检测
WarkAIConfig.environment = {
    isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
    isProduction: window.location.protocol === 'https:',
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    
    // 浏览器检测
    browser: {
        isChrome: /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
        isFirefox: /Firefox/.test(navigator.userAgent),
        isSafari: /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor),
        isEdge: /Edg/.test(navigator.userAgent)
    }
};

// 动态配置调整
if (WarkAIConfig.environment.isMobile) {
    // 移动端优化
    WarkAIConfig.performance.maxParticles = 20;
    WarkAIConfig.animations.transformDuration = Object.fromEntries(
        Object.entries(WarkAIConfig.animations.transformDuration).map(([key, value]) => [key, value * 0.7])
    );
    WarkAIConfig.hud.particleCount = 4;
}

if (WarkAIConfig.debug.enabled) {
    console.log('WarkAI Configuration loaded:', WarkAIConfig);
}

// 全局配置访问
window.WarkAIConfig = WarkAIConfig;

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WarkAIConfig;
}
