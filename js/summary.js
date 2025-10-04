document.addEventListener('DOMContentLoaded', () => {
    // Initialize hologram animation
    initializeHologram();
    
    // Initialize product cards
    initializeProductCards();
    
    // Initialize business model animation
    initializeBusinessModel();
    
    // Initialize funding allocation animation
    initializeFundingAllocation();
});

// Function to initialize hologram animation
function initializeHologram() {
    const hologramContent = document.querySelector('.hologram-content');
    const hologramItems = document.querySelectorAll('.hologram-item');
    
    if (hologramContent) {
        // Animate hologram container
        anime({
            targets: hologramContent,
            opacity: [0, 1],
            duration: 2000,
            easing: 'easeInOutQuad',
            delay: 1000
        });
        
        // Animate hologram items
        anime({
            targets: hologramItems,
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(200, {start: 1500}),
            duration: 1000,
            easing: 'easeOutQuad'
        });
        
        // Add scanning effect
        const scanEffect = document.createElement('div');
        scanEffect.classList.add('scan-effect');
        hologramContent.appendChild(scanEffect);
        
        anime({
            targets: scanEffect,
            translateY: ['-100%', '100%'],
            duration: 3000,
            delay: 2000,
            loop: true,
            easing: 'linear'
        });
    }
}

// Function to initialize product cards
function initializeProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    const productModal = document.getElementById('productDetailModal');
    const productModalBody = document.getElementById('productModalBody');
    const closeModal = document.querySelector('.close-modal');
    
    if (productCards.length > 0) {
        productCards.forEach(card => {
            card.addEventListener('click', () => {
                const productType = card.getAttribute('data-product');
                
                // Set modal content based on product type
                let modalContent = '';
                
                switch(productType) {
                    case 'os':
                        modalContent = `
                            <div class="eva-style-header">
                                <h3>WarkAI OS - 智能平台</h3>
                                <div class="eva-header-line"></div>
                            </div>
                            <div class="eva-terminal">
                                <div class="eva-terminal-content">
                                    WarkAI OS是一个以AI大模型为核心的操作系统，为企业和个人提供人岗匹配、任务管理、技能培训等服务。系统通过深度学习算法，实时分析工作场景，为用户提供精准的操作指导和决策支持。
                                </div>
                            </div>
                            <div class="eva-data-grid">
                                <div class="eva-data-item">
                                    <div class="eva-data-label">核心功能</div>
                                    <ul class="eva-list">
                                        <li>实时任务分配与管理</li>
                                        <li>AI辅助决策系统</li>
                                        <li>技能培训与评估</li>
                                        <li>人岗匹配算法</li>
                                        <li>多模态数据处理</li>
                                    </ul>
                                </div>
                                <div class="eva-data-item">
                                    <div class="eva-data-label">技术优势</div>
                                    <ul class="eva-list">
                                        <li>基于DeepSeek-R1的垂直领域大模型</li>
                                        <li>多模态输入支持（视觉、语音、文本）</li>
                                        <li>边缘计算架构，低延迟响应</li>
                                        <li>数据安全加密与隐私保护</li>
                                        <li>开放API接口，支持第三方扩展</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="eva-image-container">
                                <img src="../images/os_interface.png" alt="WarkAI OS界面" class="eva-image">
                            </div>
                        `;
                        break;
                    case 'hardware':
                        modalContent = `
                            <div class="eva-style-header">
                                <h3>智能硬件产品线</h3>
                                <div class="eva-header-line"></div>
                            </div>
                            <div class="eva-terminal">
                                <div class="eva-terminal-content">
                                    WarkAI智能硬件产品线包括AR眼镜、头戴式通讯拍摄设备和智能机器人（含机械臂），为用户提供全方位的人机协作解决方案。所有硬件均采用模块化设计，可根据不同场景需求进行灵活配置。
                                </div>
                            </div>
                            <div class="eva-data-grid">
                                <div class="eva-data-item">
                                    <div class="eva-data-label">AR眼镜</div>
                                    <ul class="eva-list">
                                        <li>"工蜂"系列AR眼镜</li>
                                        <li>自研高性价比AR眼镜</li>
                                        <li>视场角(FOV): 52°</li>
                                        <li>分辨率: 1920x1080</li>
                                        <li>续航: 4-6小时</li>
                                    </ul>
                                </div>
                                <div class="eva-data-item">
                                    <div class="eva-data-label">头戴式通讯设备</div>
                                    <ul class="eva-list">
                                        <li>4K防抖记录仪</li>
                                        <li>双向实时通讯</li>
                                        <li>AI降噪技术</li>
                                        <li>IP67防水防尘</li>
                                        <li>续航: 8-10小时</li>
                                    </ul>
                                </div>
                                <div class="eva-data-item">
                                    <div class="eva-data-label">智能机器人</div>
                                    <ul class="eva-list">
                                        <li>协作机械臂</li>
                                        <li>移动机器人平台</li>
                                        <li>视觉识别系统</li>
                                        <li>精度: ±0.1mm</li>
                                        <li>负载: 3-15kg</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="eva-image-container">
                                <img src="../images/hardware_lineup.png" alt="WarkAI硬件产品线" class="eva-image">
                            </div>
                        `;
                        break;
                    case 'solutions':
                        modalContent = `
                            <div class="eva-style-header">
                                <h3>行业解决方案</h3>
                                <div class="eva-header-line"></div>
                            </div>
                            <div class="eva-terminal">
                                <div class="eva-terminal-content">
                                    WarkAI行业解决方案聚焦纺织、冷链、助残、养老等领域的垂直应用，通过AI+AR+机器人技术的深度融合，为各行业提供定制化的智能化升级方案。
                                </div>
                            </div>
                            <div class="eva-solution-grid">
                                <div class="eva-solution-item primary">
                                    <div class="eva-solution-icon textile-icon"></div>
                                    <div class="eva-solution-title">纺织领域</div>
                                    <div class="eva-solution-desc">通过AI视觉进行实时疵点检测、自动化流程监控、生产排程优化、能耗管理，提升生产效率41%，降低次品率。</div>
                                </div>
                                <div class="eva-solution-item">
                                    <div class="eva-solution-icon coldchain-icon"></div>
                                    <div class="eva-solution-title">冷链物流</div>
                                    <div class="eva-solution-desc">温湿度实时监控与预警、货物状态智能识别、RFID自动出入库、园区智能安防，降低货物损耗率15%。</div>
                                </div>
                                <div class="eva-solution-item">
                                    <div class="eva-solution-icon disability-icon"></div>
                                    <div class="eva-solution-title">助残领域</div>
                                    <div class="eva-solution-desc">通过AR眼镜和AI辅助系统，为残障人士提供工作指导和技能培训，提高就业率和工作效率。</div>
                                </div>
                                <div class="eva-solution-item">
                                    <div class="eva-solution-icon elderly-icon"></div>
                                    <div class="eva-solution-title">养老服务</div>
                                    <div class="eva-solution-desc">远程专家协作、第一视角记录与回溯、无障碍通讯，助力银发族再就业和远程照护。</div>
                                </div>
                            </div>
                            <div class="eva-image-container">
                                <img src="../images/industry_solutions.png" alt="WarkAI行业解决方案" class="eva-image">
                            </div>
                        `;
                        break;
                    case 'seal':
                        modalContent = `
                            <div class="eva-style-header">
                                <h3>AI小海豹算命大模型</h3>
                                <div class="eva-header-line"></div>
                            </div>
                            <div class="eva-terminal">
                                <div class="eva-terminal-content">
                                    AI小海豹是一款面向C端的创新型AI应用，结合了趣味性、社交性和心理慰藉功能。通过人格化的AI形象（小海豹），提供基于大模型的占卜、对话和心理陪伴服务。
                                </div>
                            </div>
                            <div class="eva-data-grid">
                                <div class="eva-data-item">
                                    <div class="eva-data-label">核心功能</div>
                                    <ul class="eva-list">
                                        <li>AI算命与占卜</li>
                                        <li>情感陪伴对话</li>
                                        <li>心理疏导</li>
                                        <li>社交分享</li>
                                        <li>个性化互动</li>
                                    </ul>
                                </div>
                                <div class="eva-data-item">
                                    <div class="eva-data-label">商业价值</div>
                                    <ul class="eva-list">
                                        <li>探索AI在消费级市场的应用</li>
                                        <li>构建品牌亲和力</li>
                                        <li>获取海量C端用户数据</li>
                                        <li>建立用户粘性</li>
                                        <li>创造病毒式传播效应</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="eva-image-container">
                                <img src="../images/ai_seal.png" alt="AI小海豹" class="eva-image">
                            </div>
                        `;
                        break;
                }
                
                // Set modal content and show modal
                productModalBody.innerHTML = modalContent;
                productModal.style.display = 'flex';
                
                // Add EVA-style animations to modal content
                const evaHeader = productModalBody.querySelector('.eva-style-header');
                const evaTerminal = productModalBody.querySelector('.eva-terminal');
                const evaDataItems = productModalBody.querySelectorAll('.eva-data-item, .eva-solution-item');
                const evaImage = productModalBody.querySelector('.eva-image-container');
                
                anime({
                    targets: evaHeader,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 800,
                    easing: 'easeOutQuad'
                });
                
                anime({
                    targets: evaTerminal,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 800,
                    delay: 300,
                    easing: 'easeOutQuad'
                });
                
                anime({
                    targets: evaDataItems,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    delay: anime.stagger(150, {start: 600}),
                    duration: 800,
                    easing: 'easeOutQuad'
                });
                
                if (evaImage) {
                    anime({
                        targets: evaImage,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 800,
                        delay: 1000,
                        easing: 'easeOutQuad'
                    });
                }
                
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
                    
                    setTimeout(typeWriter, 500);
                }
            });
        });
        
        // Close modal when clicking the close button
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                productModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside the modal content
        window.addEventListener('click', (event) => {
            if (event.target === productModal) {
                productModal.style.display = 'none';
            }
        });
    }
}

// Function to initialize business model animation
function initializeBusinessModel() {
    const modelItems = document.querySelectorAll('.model-item');
    
    if (modelItems.length > 0) {
        anime({
            targets: modelItems,
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(200),
            duration: 1000,
            easing: 'easeOutQuad'
        });
        
        // Add pulsing effect to model center
        const modelCenter = document.querySelector('.model-center');
        if (modelCenter) {
            anime({
                targets: modelCenter,
                boxShadow: [
                    '0 0 20px rgba(0, 163, 255, 0.3)',
                    '0 0 30px rgba(0, 163, 255, 0.5)',
                    '0 0 20px rgba(0, 163, 255, 0.3)'
                ],
                duration: 2000,
                loop: true,
                easing: 'easeInOutQuad'
            });
        }
    }
}

// Function to initialize funding allocation animation
function initializeFundingAllocation() {
    const allocationFills = document.querySelectorAll('.allocation-fill');
    
    if (allocationFills.length > 0) {
        anime({
            targets: allocationFills,
            width: [0, el => el.style.width],
            duration: 1500,
            delay: anime.stagger(200),
            easing: 'easeInOutQuad'
        });
    }
}
