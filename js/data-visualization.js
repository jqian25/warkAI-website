// WarkAI 数据可视化HUD系统 - 暗黑机甲风格

class DataVisualizationHUD {
    constructor() {
        this.charts = {};
        this.activeChart = null;
        this.animationQueue = [];
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.setupChartData();
        this.createHUDStyles();
        this.initializeChartTriggers();
    }

    // 设置图表数据
    setupChartData() {
        this.chartData = {
            marketSize: {
                title: '市场规模分析',
                type: 'line',
                data: {
                    labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
                    datasets: [{
                        label: 'AI市场规模 (亿美元)',
                        data: [156, 234, 387, 515, 742, 1024, 1456],
                        borderColor: '#00a3ff',
                        backgroundColor: 'rgba(0, 163, 255, 0.1)',
                        tension: 0.4
                    }, {
                        label: 'AR市场规模 (亿美元)',
                        data: [89, 142, 198, 287, 421, 634, 892],
                        borderColor: '#ff3c3c',
                        backgroundColor: 'rgba(255, 60, 60, 0.1)',
                        tension: 0.4
                    }]
                }
            },
            
            revenue: {
                title: '营收预测',
                type: 'bar',
                data: {
                    labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025'],
                    datasets: [{
                        label: '预期营收 (万元)',
                        data: [120, 280, 450, 680, 920, 1250],
                        backgroundColor: [
                            'rgba(0, 163, 255, 0.8)',
                            'rgba(255, 60, 60, 0.8)',
                            'rgba(255, 215, 0, 0.8)',
                            'rgba(76, 175, 80, 0.8)',
                            'rgba(156, 39, 176, 0.8)',
                            'rgba(255, 152, 0, 0.8)'
                        ],
                        borderColor: [
                            '#00a3ff',
                            '#ff3c3c',
                            '#ffd700',
                            '#4caf50',
                            '#9c27b0',
                            '#ff9800'
                        ],
                        borderWidth: 2
                    }]
                }
            },
            
            userGrowth: {
                title: '用户增长趋势',
                type: 'area',
                data: {
                    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    datasets: [{
                        label: '活跃用户数 (万)',
                        data: [12, 19, 28, 45, 67, 89, 124, 156, 198, 234, 287, 342],
                        borderColor: '#00a3ff',
                        backgroundColor: 'rgba(0, 163, 255, 0.2)',
                        fill: true,
                        tension: 0.4
                    }]
                }
            },
            
            marketShare: {
                title: '市场份额分布',
                type: 'doughnut',
                data: {
                    labels: ['WarkAI', '竞争对手A', '竞争对手B', '竞争对手C', '其他'],
                    datasets: [{
                        data: [25, 20, 18, 15, 22],
                        backgroundColor: [
                            '#ff3c3c',
                            '#00a3ff',
                            '#ffd700',
                            '#4caf50',
                            '#666666'
                        ],
                        borderColor: [
                            '#ff3c3c',
                            '#00a3ff',
                            '#ffd700',
                            '#4caf50',
                            '#666666'
                        ],
                        borderWidth: 2
                    }]
                }
            },
            
            technology: {
                title: '技术指标雷达图',
                type: 'radar',
                data: {
                    labels: ['AI算法', 'AR技术', '机器人控制', '数据处理', '用户体验', '系统稳定性'],
                    datasets: [{
                        label: 'WarkAI',
                        data: [95, 88, 92, 89, 94, 96],
                        borderColor: '#ff3c3c',
                        backgroundColor: 'rgba(255, 60, 60, 0.2)',
                        pointBackgroundColor: '#ff3c3c'
                    }, {
                        label: '行业平均',
                        data: [75, 70, 68, 72, 74, 76],
                        borderColor: '#00a3ff',
                        backgroundColor: 'rgba(0, 163, 255, 0.2)',
                        pointBackgroundColor: '#00a3ff'
                    }]
                }
            }
        };
    }

    // 创建HUD样式
    createHUDStyles() {
        if (document.querySelector('#data-viz-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'data-viz-styles';
        style.textContent = `
            .data-hud-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                z-index: 10000;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.8s ease;
            }
            
            .data-hud-overlay.active {
                opacity: 1;
                pointer-events: all;
            }
            
            .data-hud-container {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.8);
                width: 90%;
                max-width: 1200px;
                height: 80%;
                background: linear-gradient(135deg, rgba(0, 163, 255, 0.1), rgba(255, 60, 60, 0.1));
                border: 2px solid #00a3ff;
                border-radius: 15px;
                backdrop-filter: blur(15px);
                box-shadow: 
                    0 0 50px rgba(0, 163, 255, 0.5),
                    inset 0 0 50px rgba(0, 163, 255, 0.1);
                transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                overflow: hidden;
            }
            
            .data-hud-overlay.active .data-hud-container {
                transform: translate(-50%, -50%) scale(1);
            }
            
            .data-hud-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 30px;
                border-bottom: 1px solid rgba(0, 163, 255, 0.3);
                background: rgba(0, 0, 0, 0.3);
            }
            
            .data-hud-title {
                font-family: 'Orbitron', sans-serif;
                font-size: 1.5em;
                font-weight: 600;
                color: #00a3ff;
                text-shadow: 0 0 10px rgba(0, 163, 255, 0.5);
            }
            
            .data-hud-controls {
                display: flex;
                gap: 15px;
            }
            
            .data-hud-btn {
                padding: 8px 16px;
                background: linear-gradient(45deg, #ff3c3c, #cc1e2e);
                border: none;
                border-radius: 4px;
                color: white;
                font-family: 'Orbitron', sans-serif;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9em;
            }
            
            .data-hud-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(255, 60, 60, 0.4);
            }
            
            .data-hud-btn.secondary {
                background: linear-gradient(45deg, #00a3ff, #0066cc);
            }
            
            .data-hud-btn.secondary:hover {
                box-shadow: 0 5px 15px rgba(0, 163, 255, 0.4);
            }
            
            .data-hud-content {
                display: flex;
                height: calc(100% - 80px);
            }
            
            .data-hud-sidebar {
                width: 250px;
                background: rgba(0, 0, 0, 0.5);
                border-right: 1px solid rgba(0, 163, 255, 0.3);
                padding: 20px;
                overflow-y: auto;
            }
            
            .chart-selector {
                margin-bottom: 15px;
            }
            
            .chart-selector-btn {
                width: 100%;
                padding: 12px 15px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 6px;
                color: #a0a0a0;
                font-family: 'Rajdhani', sans-serif;
                font-size: 0.9em;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: left;
            }
            
            .chart-selector-btn:hover {
                background: rgba(0, 163, 255, 0.2);
                border-color: #00a3ff;
                color: #ffffff;
            }
            
            .chart-selector-btn.active {
                background: rgba(255, 60, 60, 0.3);
                border-color: #ff3c3c;
                color: #ffffff;
                box-shadow: 0 0 10px rgba(255, 60, 60, 0.3);
            }
            
            .data-hud-main {
                flex: 1;
                padding: 30px;
                display: flex;
                flex-direction: column;
            }
            
            .chart-container {
                flex: 1;
                position: relative;
                background: rgba(0, 0, 0, 0.3);
                border-radius: 10px;
                padding: 20px;
                border: 1px solid rgba(0, 163, 255, 0.2);
            }
            
            .chart-canvas {
                width: 100% !important;
                height: 100% !important;
            }
            
            .data-scan-lines {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: repeating-linear-gradient(
                    0deg,
                    transparent 0px,
                    transparent 3px,
                    rgba(0, 163, 255, 0.05) 3px,
                    rgba(0, 163, 255, 0.05) 6px
                );
                animation: dataScanMove 3s linear infinite;
                pointer-events: none;
            }
            
            @keyframes dataScanMove {
                0% { transform: translateY(-100%); }
                100% { transform: translateY(100%); }
            }
            
            .chart-loading {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #00a3ff;
                font-family: 'Orbitron', sans-serif;
                font-size: 1.2em;
                text-align: center;
            }
            
            .loading-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid rgba(0, 163, 255, 0.3);
                border-top: 3px solid #00a3ff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 15px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .chart-stats {
                margin-top: 20px;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 15px;
            }
            
            .stat-item {
                background: rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(0, 163, 255, 0.3);
                border-radius: 6px;
                padding: 15px;
                text-align: center;
            }
            
            .stat-value {
                font-family: 'Orbitron', sans-serif;
                font-size: 1.5em;
                font-weight: 600;
                color: #00a3ff;
                margin-bottom: 5px;
            }
            
            .stat-label {
                font-size: 0.9em;
                color: #a0a0a0;
            }
            
            @media (max-width: 768px) {
                .data-hud-container {
                    width: 95%;
                    height: 90%;
                }
                
                .data-hud-content {
                    flex-direction: column;
                }
                
                .data-hud-sidebar {
                    width: 100%;
                    height: 150px;
                    border-right: none;
                    border-bottom: 1px solid rgba(0, 163, 255, 0.3);
                }
                
                .chart-stats {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
        `;
        
        document.head.appendChild(style);
    }

    // 初始化图表触发器
    initializeChartTriggers() {
        // 为页面中的数据元素添加点击事件
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-chart]');
            if (trigger) {
                e.preventDefault();
                const chartType = trigger.getAttribute('data-chart');
                this.showChart(chartType);
            }
        });
    }

    // 显示图表
    async showChart(chartType) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        try {
            // 创建HUD覆盖层
            const overlay = this.createHUDOverlay();
            document.body.appendChild(overlay);
            
            // 激活覆盖层
            setTimeout(() => {
                overlay.classList.add('active');
            }, 100);
            
            // 加载图表
            await this.loadChart(chartType);
            
        } catch (error) {
            console.error('Error showing chart:', error);
        } finally {
            this.isAnimating = false;
        }
    }

    // 创建HUD覆盖层
    createHUDOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'data-hud-overlay';
        overlay.innerHTML = `
            <div class="data-hud-container">
                <div class="data-hud-header">
                    <div class="data-hud-title">数据分析中心</div>
                    <div class="data-hud-controls">
                        <button class="data-hud-btn secondary" onclick="dataVizHUD.exportChart()">导出数据</button>
                        <button class="data-hud-btn" onclick="dataVizHUD.closeHUD()">关闭</button>
                    </div>
                </div>
                <div class="data-hud-content">
                    <div class="data-hud-sidebar">
                        <div class="chart-selector">
                            <button class="chart-selector-btn" data-chart-type="marketSize">市场规模分析</button>
                        </div>
                        <div class="chart-selector">
                            <button class="chart-selector-btn" data-chart-type="revenue">营收预测</button>
                        </div>
                        <div class="chart-selector">
                            <button class="chart-selector-btn" data-chart-type="userGrowth">用户增长趋势</button>
                        </div>
                        <div class="chart-selector">
                            <button class="chart-selector-btn" data-chart-type="marketShare">市场份额分布</button>
                        </div>
                        <div class="chart-selector">
                            <button class="chart-selector-btn" data-chart-type="technology">技术指标雷达</button>
                        </div>
                    </div>
                    <div class="data-hud-main">
                        <div class="chart-container">
                            <div class="data-scan-lines"></div>
                            <div class="chart-loading">
                                <div class="loading-spinner"></div>
                                <div>数据加载中...</div>
                            </div>
                            <canvas class="chart-canvas" id="hudChart"></canvas>
                        </div>
                        <div class="chart-stats" id="chartStats"></div>
                    </div>
                </div>
            </div>
        `;
        
        // 添加侧边栏点击事件
        overlay.addEventListener('click', (e) => {
            const btn = e.target.closest('.chart-selector-btn');
            if (btn) {
                const chartType = btn.getAttribute('data-chart-type');
                this.switchChart(chartType);
                
                // 更新按钮状态
                overlay.querySelectorAll('.chart-selector-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        });
        
        this.activeOverlay = overlay;
        return overlay;
    }

    // 加载图表
    async loadChart(chartType) {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.renderChart(chartType);
                resolve();
            }, 1500); // 模拟加载时间
        });
    }

    // 渲染图表
    renderChart(chartType) {
        const chartData = this.chartData[chartType];
        if (!chartData) {
            console.error(`Chart type ${chartType} not found`);
            return;
        }
        
        // 隐藏加载指示器
        const loading = this.activeOverlay.querySelector('.chart-loading');
        if (loading) {
            loading.style.display = 'none';
        }
        
        // 获取canvas元素
        const canvas = this.activeOverlay.querySelector('#hudChart');
        const ctx = canvas.getContext('2d');
        
        // 销毁现有图表
        if (this.activeChart) {
            this.activeChart.destroy();
        }
        
        // 创建新图表
        this.activeChart = new Chart(ctx, {
            type: chartData.type,
            data: chartData.data,
            options: this.getChartOptions(chartData.type)
        });
        
        // 更新统计信息
        this.updateChartStats(chartType);
        
        // 激活对应的侧边栏按钮
        const btn = this.activeOverlay.querySelector(`[data-chart-type="${chartType}"]`);
        if (btn) {
            this.activeOverlay.querySelectorAll('.chart-selector-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
    }

    // 切换图表
    switchChart(chartType) {
        if (this.isAnimating) return;
        
        // 显示加载指示器
        const loading = this.activeOverlay.querySelector('.chart-loading');
        if (loading) {
            loading.style.display = 'block';
        }
        
        // 延迟加载新图表
        setTimeout(() => {
            this.renderChart(chartType);
        }, 800);
    }

    // 获取图表选项
    getChartOptions(type) {
        const baseOptions = {
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
            },
            scales: {
                x: {
                    ticks: {
                        color: '#a0a0a0',
                        font: {
                            family: 'Rajdhani'
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: '#a0a0a0',
                        font: {
                            family: 'Rajdhani'
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        };
        
        // 特定图表类型的选项
        if (type === 'doughnut' || type === 'radar') {
            delete baseOptions.scales;
        }
        
        if (type === 'radar') {
            baseOptions.scales = {
                r: {
                    ticks: {
                        color: '#a0a0a0',
                        font: {
                            family: 'Rajdhani'
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    },
                    pointLabels: {
                        color: '#ffffff',
                        font: {
                            family: 'Rajdhani',
                            size: 11
                        }
                    }
                }
            };
        }
        
        return baseOptions;
    }

    // 更新图表统计信息
    updateChartStats(chartType) {
        const statsContainer = this.activeOverlay.querySelector('#chartStats');
        if (!statsContainer) return;
        
        let stats = [];
        
        switch (chartType) {
            case 'marketSize':
                stats = [
                    { label: '预计2026年AI市场', value: '1456亿美元' },
                    { label: '年复合增长率', value: '42.3%' },
                    { label: 'AR市场增长', value: '38.7%' },
                    { label: '总市场机会', value: '2348亿美元' }
                ];
                break;
            case 'revenue':
                stats = [
                    { label: '2024年总营收', value: '1530万元' },
                    { label: '季度增长率', value: '67.8%' },
                    { label: '预计2025年', value: '4200万元' },
                    { label: '利润率', value: '28.5%' }
                ];
                break;
            case 'userGrowth':
                stats = [
                    { label: '当前用户数', value: '342万' },
                    { label: '月增长率', value: '18.2%' },
                    { label: '用户留存率', value: '85.6%' },
                    { label: '活跃度', value: '92.3%' }
                ];
                break;
            case 'marketShare':
                stats = [
                    { label: 'WarkAI份额', value: '25%' },
                    { label: '市场排名', value: '第1位' },
                    { label: '增长潜力', value: '高' },
                    { label: '竞争优势', value: '技术领先' }
                ];
                break;
            case 'technology':
                stats = [
                    { label: 'AI算法评分', value: '95分' },
                    { label: '系统稳定性', value: '96分' },
                    { label: '用户体验', value: '94分' },
                    { label: '综合评级', value: 'A+' }
                ];
                break;
        }
        
        statsContainer.innerHTML = stats.map(stat => `
            <div class="stat-item">
                <div class="stat-value">${stat.value}</div>
                <div class="stat-label">${stat.label}</div>
            </div>
        `).join('');
    }

    // 导出图表
    exportChart() {
        if (!this.activeChart) return;
        
        // 创建下载链接
        const link = document.createElement('a');
        link.download = 'warkai-chart.png';
        link.href = this.activeChart.toBase64Image();
        link.click();
        
        // 显示导出成功提示
        this.showNotification('图表已导出', 'success');
    }

    // 关闭HUD
    closeHUD() {
        if (!this.activeOverlay) return;
        
        this.activeOverlay.classList.remove('active');
        
        setTimeout(() => {
            if (this.activeOverlay && this.activeOverlay.parentNode) {
                this.activeOverlay.parentNode.removeChild(this.activeOverlay);
            }
            this.activeOverlay = null;
            
            if (this.activeChart) {
                this.activeChart.destroy();
                this.activeChart = null;
            }
        }, 800);
    }

    // 显示通知
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(0, 163, 255, 0.9)'};
            border: 1px solid ${type === 'success' ? '#4caf50' : '#00a3ff'};
            border-radius: 6px;
            color: white;
            font-family: 'Rajdhani', sans-serif;
            font-weight: 500;
            z-index: 10001;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// 全局变量
let dataVizHUD;

// 初始化数据可视化HUD
document.addEventListener('DOMContentLoaded', () => {
    // 检查Chart.js是否已加载
    if (typeof Chart === 'undefined') {
        // 动态加载Chart.js
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => {
            dataVizHUD = new DataVisualizationHUD();
            window.dataVizHUD = dataVizHUD;
        };
        document.head.appendChild(script);
    } else {
        dataVizHUD = new DataVisualizationHUD();
        window.dataVizHUD = dataVizHUD;
    }
});

// 导出类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataVisualizationHUD;
}
