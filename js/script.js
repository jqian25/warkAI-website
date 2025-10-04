document.addEventListener('DOMContentLoaded', () => {
    // Loading screen animation
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContainer = document.getElementById('mainContainer');
    const loadingBar = document.getElementById('loadingBar');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Hide loading screen and show main content
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                mainContainer.style.opacity = '1';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 1000);
            }, 500);
        }
        loadingBar.style.width = `${progress}%`;
    }, 200);
    
    // Navigation functionality
    const mechaParts = document.querySelectorAll('.mecha-part');
    const transitionOverlay = document.getElementById('transitionOverlay');
    const transformingPart = document.getElementById('transformingPart');
    
    if (mechaParts.length > 0) {
        mechaParts.forEach(part => {
            part.addEventListener('click', () => {
                const targetPage = part.getAttribute('data-target');
                const partId = part.id;
                
                // Show transition overlay
                transitionOverlay.style.opacity = '1';
                transitionOverlay.style.pointerEvents = 'all';
                
                // Customize transition animation based on part
                switch(partId) {
                    case 'navHead':
                        transformingPart.style.borderRadius = '50% 50% 10% 10%';
                        transformingPart.style.backgroundColor = '#2a2a2a';
                        break;
                    case 'navCore':
                        transformingPart.style.borderRadius = '10px 10px 30px 30px';
                        transformingPart.style.backgroundColor = '#3a3a3a';
                        break;
                    case 'navArms':
                        transformingPart.style.borderRadius = '5px';
                        transformingPart.style.width = '150px';
                        transformingPart.style.height = '60px';
                        transformingPart.style.backgroundColor = '#2a2a2a';
                        break;
                    case 'navLegs':
                        transformingPart.style.borderRadius = '10px 10px 0 0';
                        transformingPart.style.width = '80px';
                        transformingPart.style.height = '150px';
                        transformingPart.style.backgroundColor = '#3a3a3a';
                        break;
                    case 'navPlatform':
                        transformingPart.style.borderRadius = '5px';
                        transformingPart.style.width = '200px';
                        transformingPart.style.height = '70px';
                        transformingPart.style.backgroundColor = '#2a2a2a';
                        break;
                }
                
                // Navigate to target page after animation
                setTimeout(() => {
                    window.location.href = targetPage;
                }, 2000);
            });
        });
    }
    
    // Back button functionality
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', () => {
            // Show transition overlay
            transitionOverlay.style.opacity = '1';
            transitionOverlay.style.pointerEvents = 'all';
            
            // Navigate back to main page after animation
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }
    
    // Initialize charts if they exist
    initializeCharts();
    
    // Initialize animations for content pages
    initializePageAnimations();
});

// Function to initialize charts
function initializeCharts() {
    // Market size chart
    const marketSizeChart = document.getElementById('marketSizeChart');
    if (marketSizeChart) {
        new Chart(marketSizeChart, {
            type: 'bar',
            data: {
                labels: ['纺织工业AI', 'AR市场', '冷链物流', '数字占卜'],
                datasets: [{
                    label: '2025年市场规模 (亿美元)',
                    data: [180, 420, 250, 15],
                    backgroundColor: [
                        'rgba(0, 163, 255, 0.7)',
                        'rgba(123, 0, 255, 0.7)',
                        'rgba(0, 255, 163, 0.7)',
                        'rgba(255, 60, 60, 0.7)'
                    ],
                    borderColor: [
                        'rgba(0, 163, 255, 1)',
                        'rgba(123, 0, 255, 1)',
                        'rgba(0, 255, 163, 1)',
                        'rgba(255, 60, 60, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0a0'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0a0'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                }
            }
        });
    }
    
    // Revenue projection chart
    const revenueChart = document.getElementById('revenueChart');
    if (revenueChart) {
        new Chart(revenueChart, {
            type: 'line',
            data: {
                labels: ['2025', '2026', '2027', '2028', '2029', '2030'],
                datasets: [{
                    label: '收入预测 (万元)',
                    data: [1500, 4081, 15000, 70000, 150000, 300000],
                    borderColor: 'rgba(0, 163, 255, 1)',
                    backgroundColor: 'rgba(0, 163, 255, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: '净利润预测 (万元)',
                    data: [0, 326, 3000, 34500, 75000, 150000],
                    borderColor: 'rgba(255, 60, 60, 1)',
                    backgroundColor: 'rgba(255, 60, 60, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0a0'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0a0'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                }
            }
        });
    }
    
    // Efficiency improvement chart
    const efficiencyChart = document.getElementById('efficiencyChart');
    if (efficiencyChart) {
        new Chart(efficiencyChart, {
            type: 'radar',
            data: {
                labels: ['生产效率', '次品率降低', '培训周期缩短', '能耗降低', '人工成本节约'],
                datasets: [{
                    label: 'WarkAI解决方案',
                    data: [41, 35, 78, 25, 60],
                    backgroundColor: 'rgba(0, 163, 255, 0.2)',
                    borderColor: 'rgba(0, 163, 255, 1)',
                    pointBackgroundColor: 'rgba(0, 163, 255, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(0, 163, 255, 1)'
                },
                {
                    label: '行业平均水平',
                    data: [15, 10, 20, 12, 25],
                    backgroundColor: 'rgba(255, 60, 60, 0.2)',
                    borderColor: 'rgba(255, 60, 60, 1)',
                    pointBackgroundColor: 'rgba(255, 60, 60, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255, 60, 60, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: '#a0a0a0'
                        },
                        ticks: {
                            color: '#a0a0a0',
                            backdropColor: 'transparent'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                }
            }
        });
    }
    
    // Labor shortage chart
    const laborChart = document.getElementById('laborChart');
    if (laborChart) {
        new Chart(laborChart, {
            type: 'line',
            data: {
                labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028'],
                datasets: [{
                    label: '纺织业劳动力缺口 (万人)',
                    data: [120, 145, 180, 210, 250, 290, 320, 350, 380],
                    borderColor: 'rgba(255, 60, 60, 1)',
                    backgroundColor: 'rgba(255, 60, 60, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: '纺织业平均年龄',
                    data: [38, 39, 40, 41, 42, 43, 44, 45, 46],
                    borderColor: 'rgba(123, 0, 255, 1)',
                    backgroundColor: 'rgba(123, 0, 255, 0.1)',
                    tension: 0.4,
                    fill: true,
                    yAxisID: 'y1'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0a0'
                        }
                    },
                    y1: {
                        position: 'right',
                        beginAtZero: false,
                        min: 35,
                        max: 50,
                        grid: {
                            drawOnChartArea: false,
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0a0'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0a0'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff'
                        }
                    }
                }
            }
        });
    }
}

// Function to initialize page animations
function initializePageAnimations() {
    // Animate content sections on page load
    const contentSections = document.querySelectorAll('.content-section');
    if (contentSections.length > 0) {
        contentSections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 300 + (index * 200));
        });
    }
    
    // Animate data cards
    const dataCards = document.querySelectorAll('.data-card');
    if (dataCards.length > 0) {
        dataCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 500 + (index * 150));
        });
    }
    
    // Animate EVA terminals
    const evaTerminals = document.querySelectorAll('.eva-terminal');
    if (evaTerminals.length > 0) {
        evaTerminals.forEach((terminal, index) => {
            terminal.style.opacity = '0';
            terminal.style.transition = 'opacity 1s ease';
            
            setTimeout(() => {
                terminal.style.opacity = '1';
                
                // Simulate typing effect for terminal content
                const content = terminal.querySelector('.eva-terminal-content');
                if (content) {
                    const text = content.textContent;
                    content.textContent = '';
                    let i = 0;
                    
                    function typeWriter() {
                        if (i < text.length) {
                            content.textContent += text.charAt(i);
                            i++;
                            setTimeout(typeWriter, 20);
                        }
                    }
                    
                    typeWriter();
                }
            }, 800 + (index * 300));
        });
    }
}
