document.addEventListener('DOMContentLoaded', () => {
    // Initialize product ecosystem animation
    initializeEcosystem();
    
    // Initialize hardware tabs
    initializeHardwareTabs();
    
    // Initialize solution cards
    initializeSolutionCards();
    
    // Initialize product showcase animations
    initializeProductShowcase();
});

// Function to initialize product ecosystem animation
function initializeEcosystem() {
    const ecosystemCenter = document.querySelector('.ecosystem-center');
    const ecosystemItems = document.querySelectorAll('.ecosystem-item');
    const ecosystemConnections = document.querySelectorAll('.ecosystem-connection');
    
    if (ecosystemCenter && ecosystemItems.length > 0) {
        // Animate ecosystem center
        anime({
            targets: ecosystemCenter,
            scale: [0, 1],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutElastic(1, .5)'
        });
        
        // Animate ecosystem items
        anime({
            targets: ecosystemItems,
            scale: [0, 1],
            opacity: [0, 1],
            delay: anime.stagger(200, {start: 500}),
            duration: 800,
            easing: 'easeOutElastic(1, .5)'
        });
        
        // Animate ecosystem connections
        anime({
            targets: ecosystemConnections,
            opacity: [0, 0.3],
            delay: 1500,
            duration: 1000,
            easing: 'easeInOutQuad'
        });
        
        // Add pulsing effect to ecosystem center
        anime({
            targets: ecosystemCenter,
            boxShadow: [
                '0 0 20px rgba(0, 163, 255, 0.3)',
                '0 0 30px rgba(0, 163, 255, 0.5)',
                '0 0 20px rgba(0, 163, 255, 0.3)'
            ],
            duration: 2000,
            loop: true,
            easing: 'easeInOutQuad',
            delay: 1500
        });
    }
}

// Function to initialize hardware tabs
function initializeHardwareTabs() {
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

// Function to initialize solution cards
function initializeSolutionCards() {
    const solutionCards = document.querySelectorAll('.solution-card');
    const solutionModal = document.getElementById('solutionDetailModal');
    const solutionModalBody = document.getElementById('solutionModalBody');
    const closeModal = document.querySelector('.close-modal');
    
    if (solutionCards.length > 0) {
        solutionCards.forEach(card => {
            card.addEventListener('click', () => {
                const solutionType = card.getAttribute('data-solution');
                
                // Set modal content based on solution type
                let modalContent = '';
                
                switch(solutionType) {
                    case 'textile':
                        modalContent = `
                            <div class="eva-style-header">
                                <h3>纺织领域解决方案</h3>
                                <div class="eva-header-line"></div>
                            </div>
                            <div class="solution-hero">
                                <img src="../images/textile_solution.png" alt="纺织领域解决方案" class="solution-hero-img">
                            </div>
                            <div class="eva-terminal">
                                <div class="eva-terminal-content">
                                    WarkAI纺织领域解决方案通过AI+AR+机器人技术的深度融合，为纺织企业提供全流程的智能化升级服务。从原料检测、生产过程监控到质量管理和物流配送，实现全链路的数字化转型，大幅提升生产效率和产品质量。
                                </div>
                            </div>
                            <div class="solution-details">
                                <div class="solution-section">
                                    <h4 class="section-subtitle">核心功能</h4>
                                    <div class="function-grid">
                                        <div class="function-item">
                                            <div class="function-icon detection-icon"></div>
                                            <div class="function-title">AI疵点检测</div>
                                            <div class="function-desc">通过计算机视觉技术，实时检测面料疵点，准确率达98.5%，远高于人工检测。</div>
                                        </div>
                                        <div class="function-item">
                                            <div class="function-icon process-icon"></div>
                                            <div class="function-title">生产流程监控</div>
                                            <div class="function-desc">实时监控生产线运行状态，自动预警异常情况，减少停机时间。</div>
                                        </div>
                                        <div class="function-item">
                                            <div class="function-icon schedule-icon"></div>
                                            <div class="function-title">智能排产优化</div>
                                            <div class="function-desc">基于AI算法的生产排程优化，提高设备利用率，减少能源消耗。</div>
                                        </div>
                                        <div class="function-item">
                                            <div class="function-icon training-icon"></div>
                                            <div class="function-title">AR辅助培训</div>
                                            <div class="function-desc">通过AR眼镜提供实时操作指导，加速新员工培训，提高操作准确性。</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="solution-section">
                                    <h4 class="section-subtitle">客户价值</h4>
                                    <div class="value-metrics">
                                        <div class="metric-item">
                                            <div class="metric-value">41%</div>
                                            <div class="metric-label">生产效率提升</div>
                                        </div>
                                        <div class="metric-item">
                                            <div class="metric-value">67%</div>
                                            <div class="metric-label">次品率降低</div>
                                        </div>
                                        <div class="metric-item">
                                            <div class="metric-value">28%</div>
                                            <div class="metric-label">能耗降低</div>
                                        </div>
                                        <div class="metric-item">
                                            <div class="metric-value">53%</div>
                                            <div class="metric-label">培训时间缩短</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="solution-section">
                                    <h4 class="section-subtitle">成功案例</h4>
                                    <div class="case-study">
                                        <div class="case-logo"></div>
                                        <div class="case-content">
                                            <div class="case-title">某知名纺织企业</div>
                                            <div class="case-desc">
                                                <p>该企业是国内领先的纺织品制造商，年产值超过10亿元。在引入WarkAI解决方案前，企业面临生产效率低、次品率高、人工成本上升等问题。</p>
                                                <p>通过部署WarkAI的AI疵点检测系统和AR辅助培训系统，企业在6个月内实现了生产效率提升41%，次品率降低67%，新员工培训时间缩短53%，年节约成本超过2000万元。</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        break;
                    case 'coldchain':
                        modalContent = `
                            <div class="eva-style-header">
                                <h3>冷链物流解决方案</h3>
                                <div class="eva-header-line"></div>
                            </div>
                            <div class="solution-hero">
                                <img src="../images/coldchain_solution.png" alt="冷链物流解决方案" class="solution-hero-img">
                            </div>
                            <div class="eva-terminal">
                                <div class="eva-terminal-content">
                                    WarkAI冷链物流解决方案通过AI+AR+IoT技术的深度融合，为冷链企业提供全流程的温控管理和物流优化服务。从仓储、运输到配送的全链路监控，确保食品、药品等温控产品的质量安全，大幅降低损耗率和能源消耗。
                                </div>
                            </div>
                            <div class="solution-details">
                                <div class="solution-section">
                                    <h4 class="section-subtitle">核心功能</h4>
                                    <div class="function-grid">
                                        <div class="function-item">
                                            <div class="function-icon temp-icon"></div>
                                            <div class="function-title">温湿度实时监控</div>
                                            <div class="function-desc">通过IoT传感器网络，实时监控冷链全流程温湿度变化，自动预警异常情况。</div>
                                        </div>
                                        <div class="function-item">
                                            <div class="function-icon cargo-icon"></div>
                                            <div class="function-title">货物状态智能识别</div>
                                            <div class="function-desc">通过AI视觉技术，自动识别货物状态，检测异常情况，如包装破损、霉变等。</div>
                                        </div>
                                        <div class="function-item">
                                            <div class="function-icon rfid-icon"></div>
                                            <div class="function-title">RFID自动出入库</div>
                                            <div class="function-desc">通过RFID技术，实现货物自动识别和出入库管理，提高仓储效率。</div>
                                        </div>
                                        <div class="function-item">
                                            <div class="function-icon route-icon"></div>
                                            <div class="function-title">智能路径规划</div>
                                            <div class="function-desc">基于AI算法的配送路径优化，考虑温控要求、交通状况等因素，降低能耗和时间成本。</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="solution-section">
                                    <h4 class="section-subtitle">客户价值</h4>
                                    <div class="value-metrics">
                                        <div class="metric-item">
                                            <div class="metric-value">15%</div>
                                            <div class="metric-label">货物损耗率降低</div>
                                        </div>
                                        <div class="metric-item">
                                            <div class="metric-value">23%</div>
                                            <div class="metric-label">能耗降低</div>
                                        </div>
                                        <div class="metric-item">
                                            <div class="metric-value">35%</div>
                                            <div class="metric-label">仓储效率提升</div>
                                        </div>
                                        <div class="metric-item">
                                            <div class="metric-value">99.8%</div>
                                            <div class="metric-label">温控合规率</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="solution-section">
                                    <h4 class="section-subtitle">成功案例</h4>
                                    <div class="case-study">
                                        <div class="case-logo"></div>
                                        <div class="case-content">
                                            <div class="case-title">某大型冷链物流企业</div>
                                            <div class="case-desc">
                                                <p>该企业是国内知名的冷链物流服务提供商，年配送量超过50万吨。在引入WarkAI解决方案前，企业面临温控不稳定、货物损耗率高、能源成本高等问题。</p>
                                                <p>通过部署WarkAI的温湿度实时监控系统和智能路径规划系统，企业在8个月内实现了货物损耗率降低15%，能耗降低23%，温控合规率提升至99.8%，年节约成本超过1500万元。</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        break;
                    case 'disability':
                        modalContent = `
                            <div class="eva-style-header">
                                <h3>助残就业解决方案</h3>
                                <div class="eva-header-line"></div>
                            </div>
                            <div class="solution-hero">
                                <img src="../images/disability_solution.png" alt="助残就业解决方案" class="solution-hero-img">
                            </div>
                            <div class="eva-terminal">
                                <div class="eva-terminal-content">
                                    WarkAI助残就业解决方案通过AI+AR技术的深度融合，为残障人士提供工作辅助和技能培训服务。通过AR眼镜和AI辅助系统，帮助残障人士克服工作障碍，提高就业率和工作效率，实现真正的平等就业。
                                </div>
                            </div>
                            <div class="solution-details">
                                <div class="solution-section">
                                    <h4 class="section-subtitle">核心功能</h4>
                                    <div class="function-grid">
                                        <div class="function-item">
                                            <div class="function-icon guidance-icon"></div>
                                            <div class="function-title">AR工作指导</div>
                                            <div class="function-desc">通过AR眼镜提供实时工作指导，帮助残障人士准确完成工作任务。</div>
                                        </div>
                                        <div class="function-item">
                                            <div class="function-icon assist-icon"></div>
                                            <div class="function-title">AI辅助决策</div>
                                            <div class="function-desc">通过AI系统提供决策支持，帮助残障人士处理复杂工作场景。</div>
                                        </div>
                                        <div class="function-item">
                                            <div class="function-icon skill-icon"></div>
                                            <div class="function-title">技能培训系统</div>
                                            <div class="function-desc">提供个性化的技能培训课程，帮助残障人士掌握工作所需技能。</div>
                                        </div>
                                        <div class="function-item">
                                            <div class="function-icon remote-icon"></div>
                                            <div class="function-title">远程专家支持</div>
                                            <div class="function-desc">通过AR眼镜连接远程专家，提供实时指导和帮助。</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="solution-section">
                                    <h4 class="section-subtitle">社会价值</h4>
                                    <div class="value-metrics">
                                        <div class="metric-item">
                                            <div class="metric-value">47%</div>
                                            <div class="metric-label">就业率提升</div>
                                        </div>
                                        <div class="metric-item">
                                            <div class="metric-value">62%</div>
                                            <div class="metric-label">工作效率提升</div>
                                        </div>
                                        <div class="metric-item">
                                            <div class="metric-value">85%</div>
                                            <div class="metric-label">工作满意度</div>
                                        </div>
                                        <div class="metric-item">
                                            <div class="metric-value">73%</div>
                                            <div class="metric-label">收入增长</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="solution-section">
                                    <h4 class="section-subtitle">合作案例</h4>
                                    <div class="case-study">
                                        <div class="case-logo"></div>
                                        <div class="case-content">
                                            <div class="case-title">某残障人士就业服务中心</div>
                                            <div class="case-desc">
                                                <p>该中心是一家专注于残障人士就业服务的社会组织，每年服务残障人士超过1000人。在引入WarkAI解决方案前，中心面临残障人士就业率低、工作岗位单一、培训效果不佳等问题。</p>
                                                <p>通过部署WarkAI的AR工作指导系统和技能培训系统，中心在一年内实现了残障人士就业率提升47%，工作岗位类型增加了3倍，残障员工平均收入增长73%，社会影响力显著提升。</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        break;
                    case 'elderly':
                        modalContent = `
                            <div class="eva-style-header">
                                <h3>养老服务解决方案</h3>
                                <div class="eva-header-line"></div>
                            </div>
                            <div class="solution-hero">
                                <img src="../images/elderly_solution.png" alt="养老服务解决方案" class="solution-hero-img">
                            </div>
                            <div class="eva-terminal">
                                <div class="eva-terminal-content">
                                    WarkAI养老服务解决方案通过AI+AR+IoT技术的深度融合，为老年人提供远程照护和再就业支持服务。通过AR眼镜和AI辅助系统，帮助老年人克服年龄障碍，实现远程照护和技能延续，提高生活质量和社会参与度。
                                </div>
                            </div>
                            <div class="solution-details">
                                <div class="solution-section">
                                    <h4 class="section-subtitle">核心功能</h4>
                                    <div class="function-grid">
                                        <div class="function-item">
                                            <div class="function-icon remote-care-icon"></div>
                                            <div class="function-title">远程照护系统</div>
                                            <div class="function-desc">通过AR眼镜和IoT设备，实现远程健康监测和生活照护。</div>
                                        </div>
                                        <div class="function-item">
                                            <div class="function-icon expert-icon"></div>
                                            <div class="function-title">远程专家协作</div>
                                            <div class="function-desc">连接退休专家与企业，实现知识传承和远程咨询。</div>
                                        </div>
                                        <div class="function-item">
                                            <div class="function-icon record-icon"></div>
                                            <div class="function-title">第一视角记录</div>
                                            <div class="function-desc">记录专业技能和经验，形成知识库，便于传承和学习。</div>
                                        </div>
                                        <div class="function-item">
                                            <div class="function-icon comm-icon"></div>
                                            <div class="function-title">无障碍通讯</div>
                                            <div class="function-desc">提供适合老年人使用的简易通讯界面，降低使用门槛。</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="solution-section">
                                    <h4 class="section-subtitle">社会价值</h4>
                                    <div class="value-metrics">
                                        <div class="metric-item">
                                            <div class="metric-value">38%</div>
                                            <div class="metric-label">银发再就业率</div>
                                        </div>
                                        <div class="metric-item">
                                            <div class="metric-value">65%</div>
                                            <div class="metric-label">照护成本降低</div>
                                        </div>
                                        <div class="metric-item">
                                            <div class="metric-value">78%</div>
                                            <div class="metric-label">生活满意度提升</div>
                                        </div>
                                        <div class="metric-item">
                                            <div class="metric-value">42%</div>
                                            <div class="metric-label">社会参与度提升</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="solution-section">
                                    <h4 class="section-subtitle">合作案例</h4>
                                    <div class="case-study">
                                        <div class="case-logo"></div>
                                        <div class="case-content">
                                            <div class="case-title">某大型养老服务机构</div>
                                            <div class="case-desc">
                                                <p>该机构是国内知名的养老服务提供商，服务老年人超过10万人。在引入WarkAI解决方案前，机构面临照护成本高、专业人员短缺、老年人社会参与度低等问题。</p>
                                                <p>通过部署WarkAI的远程照护系统和远程专家协作系统，机构在一年内实现了照护成本降低65%，银发再就业率提升38%，老年人生活满意度提升78%，社会影响力显著提升。</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                        break;
                }
                
                // Set modal content and show modal
                solutionModalBody.innerHTML = modalContent;
                solutionModal.style.display = 'flex';
                
                // Add EVA-style animations to modal content
                const evaHeader = solutionModalBody.querySelector('.eva-style-header');
                const solutionHero = solutionModalBody.querySelector('.solution-hero');
                const evaTerminal = solutionModalBody.querySelector('.eva-terminal');
                const functionItems = solutionModalBody.querySelectorAll('.function-item');
                const metricItems = solutionModalBody.querySelectorAll('.metric-item');
                const caseStudy = solutionModalBody.querySelector('.case-study');
                
                anime({
                    targets: evaHeader,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 800,
                    easing: 'easeOutQuad'
                });
                
                anime({
                    targets: solutionHero,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 800,
                    delay: 300,
                    easing: 'easeOutQuad'
                });
                
                anime({
                    targets: evaTerminal,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 800,
                    delay: 600,
                    easing: 'easeOutQuad'
                });
                
                anime({
                    targets: functionItems,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    delay: anime.stagger(150, {start: 900}),
                    duration: 800,
                    easing: 'easeOutQuad'
                });
                
                anime({
                    targets: metricItems,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    delay: anime.stagger(150, {start: 1500}),
                    duration: 800,
                    easing: 'easeOutQuad'
                });
                
                anime({
                    targets: caseStudy,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 800,
                    delay: 2100,
                    easing: 'easeOutQuad'
                });
                
                // Simulate typing effect for terminal content
                const content = evaTerminal.querySelector('.eva-terminal-content');
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
                    
                    setTimeout(typeWriter, 800);
                }
            });
        });
        
        // Close modal when clicking the close button
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                solutionModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside the modal content
        window.addEventListener('click', (event) => {
            if (event.target === solutionModal) {
                solutionModal.style.display = 'none';
            }
        });
    }
}

// Function to initialize product showcase animations
function initializeProductShowcase() {
    const productShowcases = document.querySelectorAll('.product-showcase');
    
    if (productShowcases.length > 0) {
        productShowcases.forEach(showcase => {
            const productImage = showcase.querySelector('.product-image');
            const productDetails = showcase.querySelector('.product-details');
            const featureItems = showcase.querySelectorAll('.feature-item');
            
            // Create intersection observer for each showcase
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate product image
                        anime({
                            targets: productImage,
                            opacity: [0, 1],
                            translateX: showcase.classList.contains('reverse') ? [50, 0] : [-50, 0],
                            duration: 1000,
                            easing: 'easeOutQuad'
                        });
                        
                        // Animate product details
                        anime({
                            targets: productDetails,
                            opacity: [0, 1],
                            translateX: showcase.classList.contains('reverse') ? [-50, 0] : [50, 0],
                            duration: 1000,
                            delay: 300,
                            easing: 'easeOutQuad'
                        });
                        
                        // Animate feature items
                        anime({
                            targets: featureItems,
                            opacity: [0, 1],
                            translateY: [20, 0],
                            delay: anime.stagger(150, {start: 600}),
                            duration: 800,
                            easing: 'easeOutQuad'
                        });
                        
                        // Stop observing after animation
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            // Start observing
            observer.observe(showcase);
        });
    }
}
