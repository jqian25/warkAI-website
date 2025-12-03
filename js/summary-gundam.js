// WarkAI 执行摘要页面 - Gundam风格

document.addEventListener('DOMContentLoaded', () => {
    // 等待导航模块加载完成
    if (typeof WarkAINavigation !== 'undefined') {
        // 导航模块已加载，继续初始化其他功能
        initPageSpecificFeatures();
    } else {
        // 等待导航模块加载
        setTimeout(() => {
            initPageSpecificFeatures();
        }, 100);
    }
});

// 初始化页面特定功能
function initPageSpecificFeatures() {
    // 初始化市场图表
    initMarketChart();
    
    // 初始化财务图表
    initFinancialChart();
    
    // 初始化内容动画
    initContentAnimations();
    
    // 初始化页面语言更新函数
    window.updatePageLanguage = updateSummaryPageLanguage;
}

// 初始化市场图表
function initMarketChart() {
    const marketChartElement = document.getElementById('marketChart');
    if (!marketChartElement || typeof Chart === 'undefined') return;
    
    const marketSizeData = {
        labels: ['纺织工业AI', 'AR市场', '冷链物流', '数字占卜'],
        datasets: [{
            label: '2025年市场规模 (亿美元)',
            data: [180, 420, 250, 15],
            backgroundColor: [
                'rgba(0, 163, 255, 0.7)',
                'rgba(255, 215, 0, 0.7)',
                'rgba(76, 175, 80, 0.7)',
                'rgba(255, 60, 60, 0.7)'
            ],
            borderColor: [
                'rgba(0, 163, 255, 1)',
                'rgba(255, 215, 0, 1)',
                'rgba(76, 175, 80, 1)',
                'rgba(255, 60, 60, 1)'
            ],
            borderWidth: 2
        }]
    };
    
    new Chart(marketChartElement, {
        type: 'bar',
        data: marketSizeData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#ffffff',
                        font: {
                            family: 'Orbitron, monospace',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#00a3ff',
                    bodyColor: '#ffffff',
                    borderColor: '#00a3ff',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        lineWidth: 1
                    },
                    ticks: {
                        color: '#a0a0a0',
                        font: {
                            family: 'Orbitron, monospace'
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        lineWidth: 1
                    },
                    ticks: {
                        color: '#a0a0a0',
                        font: {
                            family: 'Orbitron, monospace'
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// 初始化财务图表
function initFinancialChart() {
    const financialChartElement = document.getElementById('financialChart');
    if (!financialChartElement || typeof Chart === 'undefined') return;
    
    const financialData = {
        labels: ['2025', '2026', '2027', '2028', '2029', '2030'],
        datasets: [{
            label: '收入预测 (万元)',
            data: [1500, 4081, 15000, 70000, 150000, 300000],
            borderColor: 'rgba(0, 163, 255, 1)',
            backgroundColor: 'rgba(0, 163, 255, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: 'rgba(0, 163, 255, 1)',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6
        },
        {
            label: '净利润预测 (万元)',
            data: [0, 326, 3000, 34500, 75000, 150000],
            borderColor: 'rgba(255, 60, 60, 1)',
            backgroundColor: 'rgba(255, 60, 60, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: 'rgba(255, 60, 60, 1)',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 6
        }]
    };
    
    new Chart(financialChartElement, {
        type: 'line',
        data: financialData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: '#ffffff',
                        font: {
                            family: 'Orbitron, monospace',
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#00a3ff',
                    bodyColor: '#ffffff',
                    borderColor: '#00a3ff',
                    borderWidth: 1
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        lineWidth: 1
                    },
                    ticks: {
                        color: '#a0a0a0',
                        font: {
                            family: 'Orbitron, monospace'
                        },
                        callback: function(value) {
                            return value.toLocaleString() + '万';
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)',
                        lineWidth: 1
                    },
                    ticks: {
                        color: '#a0a0a0',
                        font: {
                            family: 'Orbitron, monospace'
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// 初始化内容动画
function initContentAnimations() {
    // 动画显示内容区块
    const contentSections = document.querySelectorAll('.content-section');
    if (contentSections.length === 0) return;
    
    contentSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease-out';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });
    
    // 动画显示数据卡片
    const dataCards = document.querySelectorAll('.data-card');
    dataCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        card.style.transition = 'all 0.5s ease-out';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 800 + (index * 150));
    });
    
    // 动画显示高亮项目
    const highlightItems = document.querySelectorAll('.highlight-item');
    highlightItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.4s ease-out';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 1200 + (index * 100));
    });
}

// 更新页面语言
function updateSummaryPageLanguage(langCode) {
    const translations = {
        'zh': {
            'pageTitle': '执行摘要与商业模式',
            'companyMission': '公司使命',
            'missionStatement': 'WarkAI致力于通过人工智能和增强现实技术，重塑传统工业的生产方式，提高生产效率，降低人力成本，实现工业生产的智能化和无人化。',
            'highlight1': '以纺织业为核心场景，打造无人化AI平台',
            'highlight2': '通过AR设备和头戴式通讯设备实现人机协同',
            'highlight3': '构建多元化产品矩阵，覆盖工业4.0全链条',
            'businessModel': '商业模式',
            'marketSize': '市场规模分析',
            'financialProjection': '财务预测',
            'fundingAllocation': '资金分配',
            'competitiveAdvantage': '竞争优势',
            'riskAssessment': '风险评估'
        },
        'en': {
            'pageTitle': 'Executive Summary & Business Model',
            'companyMission': 'Company Mission',
            'missionStatement': 'WarkAI is committed to reshaping traditional industrial production through artificial intelligence and augmented reality technology, improving production efficiency, reducing labor costs, and achieving intelligent and unmanned industrial production.',
            'highlight1': 'Build an unmanned AI platform with textile industry as the core scenario',
            'highlight2': 'Achieve human-machine collaboration through AR devices and head-mounted communication equipment',
            'highlight3': 'Build a diversified product matrix covering the entire Industry 4.0 chain',
            'businessModel': 'Business Model',
            'marketSize': 'Market Size Analysis',
            'financialProjection': 'Financial Projection',
            'fundingAllocation': 'Funding Allocation',
            'competitiveAdvantage': 'Competitive Advantage',
            'riskAssessment': 'Risk Assessment'
        },
        'ja': {
            'pageTitle': 'エグゼクティブサマリー＆ビジネスモデル',
            'companyMission': '企業使命',
            'missionStatement': 'WarkAIは人工知能と拡張現実技術を通じて従来の工業生産方式を再構築し、生産効率を向上させ、人件費を削減し、工業生産のスマート化と無人化を実現することに取り組んでいます。',
            'highlight1': '繊維業界をコアシナリオとした無人化AIプラットフォームの構築',
            'highlight2': 'ARデバイスとヘッドマウント通信機器による人機協働の実現',
            'highlight3': 'インダストリー4.0全チェーンをカバーする多様化製品マトリックスの構築',
            'businessModel': 'ビジネスモデル',
            'marketSize': '市場規模分析',
            'financialProjection': '財務予測',
            'fundingAllocation': '資金配分',
            'competitiveAdvantage': '競争優位性',
            'riskAssessment': 'リスク評価'
        }
    };
    
    const trans = translations[langCode] || translations['zh'];
    
    // 更新页面标题
    const pageTitle = document.querySelector('.page-title h1');
    if (pageTitle) {
        pageTitle.textContent = trans.pageTitle;
    }
    
    // 更新各个部分的标题
    const sectionTitles = document.querySelectorAll('.section-title');
    const titleKeys = ['companyMission', 'businessModel', 'marketSize', 'financialProjection'];
    sectionTitles.forEach((title, index) => {
        if (titleKeys[index] && trans[titleKeys[index]]) {
            title.textContent = trans[titleKeys[index]];
        }
    });
    
    // 更新使命声明
    const missionStatement = document.querySelector('.mission-statement');
    if (missionStatement) {
        missionStatement.textContent = trans.missionStatement;
    }
    
    // 更新高亮项目
    const highlightTexts = document.querySelectorAll('.highlight-text');
    const highlightKeys = ['highlight1', 'highlight2', 'highlight3'];
    highlightTexts.forEach((text, index) => {
        if (highlightKeys[index] && trans[highlightKeys[index]]) {
            text.textContent = trans[highlightKeys[index]];
        }
    });
}
