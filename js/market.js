document.addEventListener('DOMContentLoaded', () => {
    // Initialize market size chart
    initializeMarketSizeChart();
    
    // Initialize ROI chart
    initializeROIChart();
    
    // Initialize scenario tabs
    initializeScenarioTabs();
    
    // Initialize animations
    initializeAnimations();
});

// Function to initialize market size chart
function initializeMarketSizeChart() {
    const ctx = document.getElementById('marketSizeChart').getContext('2d');
    
    // Create gradient for chart background
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(0, 163, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 163, 255, 0)');
    
    // Chart data
    const data = {
        labels: ['2024', '2025', '2026', '2027', '2028', '2029', '2030'],
        datasets: [
            {
                label: '纺织行业总产值（万亿元）',
                data: [7.2, 7.5, 7.9, 8.3, 8.7, 9.1, 9.6],
                borderColor: 'rgba(0, 163, 255, 1)',
                backgroundColor: gradient,
                borderWidth: 2,
                pointBackgroundColor: 'rgba(0, 163, 255, 1)',
                pointBorderColor: '#fff',
                pointRadius: 5,
                pointHoverRadius: 7,
                tension: 0.3,
                fill: true
            },
            {
                label: '智能纺织市场规模（万亿元）',
                data: [0.5, 0.6, 0.7, 0.8, 0.9, 1.1, 1.2],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                pointBorderColor: '#fff',
                pointRadius: 5,
                pointHoverRadius: 7,
                tension: 0.3,
                fill: true
            }
        ]
    };
    
    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                        family: "'Rajdhani', sans-serif",
                        size: 12
                    }
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(18, 18, 26, 0.9)',
                titleColor: 'rgba(0, 163, 255, 1)',
                bodyColor: '#ffffff',
                borderColor: 'rgba(0, 163, 255, 0.3)',
                borderWidth: 1,
                titleFont: {
                    family: "'Orbitron', sans-serif",
                    size: 14
                },
                bodyFont: {
                    family: "'Rajdhani', sans-serif",
                    size: 14
                },
                padding: 12,
                displayColors: false
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                        family: "'Rajdhani', sans-serif"
                    }
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                        family: "'Rajdhani', sans-serif"
                    },
                    callback: function(value) {
                        return value + '万亿';
                    }
                }
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        },
        animation: {
            duration: 2000,
            easing: 'easeOutQuart'
        }
    };
    
    // Create chart
    const marketSizeChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
    
    // Add EVA-style animation to chart
    setTimeout(() => {
        marketSizeChart.update();
    }, 500);
}

// Function to initialize ROI chart
function initializeROIChart() {
    const ctx = document.getElementById('roiChart').getContext('2d');
    
    // Create gradient for chart background
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(0, 163, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 163, 255, 0)');
    
    // Chart data
    const data = {
        labels: ['初始投资', '3个月', '6个月', '9个月', '12个月', '15个月', '18个月', '21个月', '24个月', '27个月', '30个月', '33个月', '36个月'],
        datasets: [
            {
                label: '累计投资回报（万元）',
                data: [-100, -80, -50, -20, 10, 40, 70, 110, 150, 200, 250, 330, 380],
                borderColor: 'rgba(0, 163, 255, 1)',
                backgroundColor: gradient,
                borderWidth: 2,
                pointBackgroundColor: 'rgba(0, 163, 255, 1)',
                pointBorderColor: '#fff',
                pointRadius: 5,
                pointHoverRadius: 7,
                tension: 0.3,
                fill: true
            }
        ]
    };
    
    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                        family: "'Rajdhani', sans-serif",
                        size: 12
                    }
                }
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(18, 18, 26, 0.9)',
                titleColor: 'rgba(0, 163, 255, 1)',
                bodyColor: '#ffffff',
                borderColor: 'rgba(0, 163, 255, 0.3)',
                borderWidth: 1,
                titleFont: {
                    family: "'Orbitron', sans-serif",
                    size: 14
                },
                bodyFont: {
                    family: "'Rajdhani', sans-serif",
                    size: 14
                },
                padding: 12,
                displayColors: false
            },
            annotation: {
                annotations: {
                    line1: {
                        type: 'line',
                        yMin: 0,
                        yMax: 0,
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        borderWidth: 1,
                        borderDash: [5, 5],
                        label: {
                            content: '盈亏平衡点',
                            enabled: true,
                            position: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            color: '#ffffff',
                            font: {
                                family: "'Rajdhani', sans-serif",
                                size: 12
                            }
                        }
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                        family: "'Rajdhani', sans-serif"
                    }
                }
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                        family: "'Rajdhani', sans-serif"
                    },
                    callback: function(value) {
                        return value + '万';
                    }
                }
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        },
        animation: {
            duration: 2000,
            easing: 'easeOutQuart'
        }
    };
    
    // Create chart
    const roiChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
    
    // Add EVA-style animation to chart
    setTimeout(() => {
        roiChart.update();
    }, 500);
}

// Function to initialize scenario tabs
function initializeScenarioTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');
                
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to current button and pane
                button.classList.add('active');
                document.getElementById(`${tabId}-tab`).classList.add('active');
                
                // Animate the new tab pane
                anime({
                    targets: `#${tabId}-tab`,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 500,
                    easing: 'easeOutQuad'
                });
            });
        });
    }
}

// Function to initialize animations
function initializeAnimations() {
    // Animate challenge cards
    const challengeCards = document.querySelectorAll('.challenge-card');
    if (challengeCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 800,
                        easing: 'easeOutQuad'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        challengeCards.forEach(card => {
            observer.observe(card);
        });
    }
    
    // Animate market data
    const marketData = document.querySelector('.market-data');
    if (marketData) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 800,
                        easing: 'easeOutQuad'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(marketData);
    }
    
    // Animate scenario showcase
    const scenarioShowcases = document.querySelectorAll('.scenario-showcase');
    if (scenarioShowcases.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const scenarioImage = entry.target.querySelector('.scenario-image');
                    const scenarioDetails = entry.target.querySelector('.scenario-details');
                    const featureItems = entry.target.querySelectorAll('.feature-item');
                    
                    anime({
                        targets: scenarioImage,
                        opacity: [0, 1],
                        translateX: [-50, 0],
                        duration: 800,
                        easing: 'easeOutQuad'
                    });
                    
                    anime({
                        targets: scenarioDetails,
                        opacity: [0, 1],
                        translateX: [50, 0],
                        duration: 800,
                        delay: 300,
                        easing: 'easeOutQuad'
                    });
                    
                    anime({
                        targets: featureItems,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        delay: anime.stagger(150, {start: 600}),
                        duration: 800,
                        easing: 'easeOutQuad'
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        scenarioShowcases.forEach(showcase => {
            observer.observe(showcase);
        });
    }
    
    // Animate value metrics
    const metricCards = document.querySelectorAll('.metric-card');
    if (metricCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 800,
                        easing: 'easeOutQuad'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        metricCards.forEach((card, index) => {
            observer.observe(card);
            
            // Animate metric values with counting effect
            const metricValue = card.querySelector('.metric-value');
            if (metricValue) {
                const targetValue = parseInt(metricValue.textContent);
                metricValue.textContent = '0%';
                
                const observer2 = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                anime({
                                    targets: metricValue,
                                    innerHTML: [0, targetValue],
                                    round: 1,
                                    suffix: '%',
                                    duration: 2000,
                                    easing: 'easeInOutExpo'
                                });
                            }, index * 200);
                            observer2.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                observer2.observe(card);
            }
        });
    }
    
    // Animate ROI analysis
    const roiAnalysis = document.querySelector('.roi-analysis');
    if (roiAnalysis) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 800,
                        easing: 'easeOutQuad'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(roiAnalysis);
    }
    
    // Animate roadmap timeline
    const timelineNodes = document.querySelectorAll('.timeline-node');
    if (timelineNodes.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const nodeYear = entry.target.querySelector('.node-year');
                    const nodeDot = entry.target.querySelector('.node-dot');
                    const nodeContent = entry.target.querySelector('.node-content');
                    
                    anime({
                        targets: nodeYear,
                        opacity: [0, 1],
                        translateY: [-20, 0],
                        duration: 800,
                        easing: 'easeOutQuad'
                    });
                    
                    anime({
                        targets: nodeDot,
                        opacity: [0, 1],
                        scale: [0, 1],
                        duration: 800,
                        delay: 300,
                        easing: 'easeOutElastic(1, .5)'
                    });
                    
                    anime({
                        targets: nodeContent,
                        opacity: [0, 1],
                        translateX: entry.target.querySelector('.node-content').style.marginLeft === 'auto' ? [50, 0] : [-50, 0],
                        duration: 800,
                        delay: 600,
                        easing: 'easeOutQuad'
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        timelineNodes.forEach(node => {
            observer.observe(node);
        });
    }
    
    // Animate industry expansion cards
    const expansionCards = document.querySelectorAll('.expansion-card');
    if (expansionCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [50, 0],
                        duration: 800,
                        easing: 'easeOutQuad'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        expansionCards.forEach(card => {
            observer.observe(card);
        });
    }
}
