document.addEventListener('DOMContentLoaded', () => {
    // Initialize team member modal
    initializeTeamModal();
    
    // Initialize cost chart
    initializeCostChart();
    
    // Initialize timeline animation
    initializeTimeline();
    
    // Initialize vision statements animation
    initializeVisionStatements();
    
    // Initialize tech moat animation
    initializeTechMoat();
    
    // Initialize social value animation
    initializeSocialValue();
});

// Function to initialize team member modal
function initializeTeamModal() {
    const teamMembers = document.querySelectorAll('.team-member');
    const teamModal = document.getElementById('teamDetailModal');
    const teamModalBody = document.getElementById('teamModalBody');
    const closeModal = document.querySelector('.close-modal');
    
    if (teamMembers.length > 0) {
        teamMembers.forEach(member => {
            member.addEventListener('click', () => {
                const memberType = member.getAttribute('data-member');
                
                // Set modal content based on member type
                let modalContent = '';
                
                switch(memberType) {
                    case 'founder':
                        modalContent = `
                            <div class="eva-style-header">
                                <h3>钱劲 - 创始人 & CEO</h3>
                                <div class="eva-header-line"></div>
                            </div>
                            <div class="member-profile">
                                <div class="profile-avatar">
                                    <div class="avatar-placeholder large">
                                        <div class="avatar-initials">钱劲</div>
                                    </div>
                                </div>
                                <div class="profile-info">
                                    <div class="profile-bio">
                                        <p>钱劲先生是WarkAI的创始人兼CEO，拥有超过15年的科技行业经验。在创立WarkAI之前，他曾担任华为高级管理职位，主导过多个大型技术项目的开发和落地。</p>
                                        <p>他在人工智能、增强现实和机器人技术领域有着深厚的专业背景，对全球劳动力市场的结构性问题有着独到的见解。</p>
                                        <p>钱劲先生毕业于清华大学，获得计算机科学硕士学位，并在麻省理工学院(MIT)完成了工商管理课程。</p>
                                    </div>
                                    <div class="profile-achievements">
                                        <h4>主要成就</h4>
                                        <ul>
                                            <li>领导华为AR/VR部门，推动多款创新产品上市</li>
                                            <li>曾获"中国科技创新领袖"称号</li>
                                            <li>拥有12项AR/AI相关专利</li>
                                            <li>在国际顶级科技会议发表过多篇论文</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="profile-vision">
                                <h4>创业愿景</h4>
                                <div class="eva-terminal">
                                    <div class="eva-terminal-content">
                                        "我创立WarkAI的初衷，是希望通过技术创新解决全球劳动力市场面临的结构性危机。我相信，通过将AR、AI与机器人技术有机结合，我们可以创造出一个全新的人机协作平台，不仅能解决当前的劳动力短缺问题，还能释放每个人的潜能，让技术真正服务于人类的发展。"
                                    </div>
                                </div>
                            </div>
                        `;
                        break;
                    case 'cto':
                        modalContent = `
                            <div class="eva-style-header">
                                <h3>吕一飞 - AR CTO</h3>
                                <div class="eva-header-line"></div>
                            </div>
                            <div class="member-profile">
                                <div class="profile-avatar">
                                    <div class="avatar-placeholder large">
                                        <div class="avatar-initials">吕一飞</div>
                                    </div>
                                </div>
                                <div class="profile-info">
                                    <div class="profile-bio">
                                        <p>吕一飞先生是WarkAI的AR技术总监，拥有超过12年的AR/VR技术开发经验。在加入WarkAI之前，他曾在亚马逊担任高级工程师，负责多款AR产品的研发。</p>
                                        <p>他在光学系统设计、空间定位算法和AR交互体验方面有着丰富的经验，是AR领域公认的技术专家。</p>
                                        <p>吕一飞先生毕业于斯坦福大学，获得光学工程博士学位。</p>
                                    </div>
                                    <div class="profile-achievements">
                                        <h4>主要成就</h4>
                                        <ul>
                                            <li>主导开发亚马逊AR购物体验系统</li>
                                            <li>拥有15项AR光学系统和交互设计专利</li>
                                            <li>曾获IEEE AR/VR创新奖</li>
                                            <li>在SIGGRAPH等顶级会议发表多篇论文</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="profile-vision">
                                <h4>技术理念</h4>
                                <div class="eva-terminal">
                                    <div class="eva-terminal-content">
                                        "AR技术的真正价值不在于创造虚拟世界，而在于增强现实世界，让人们能够更高效、更精准地完成工作。在WarkAI，我们正在开发的AR系统专注于实用性和易用性，让即使是没有技术背景的用户也能轻松上手，从而真正实现技术普惠。"
                                    </div>
                                </div>
                            </div>
                        `;
                        break;
                    case 'ai':
                        modalContent = `
                            <div class="eva-style-header">
                                <h3>钱开伦 - AI总负责人</h3>
                                <div class="eva-header-line"></div>
                            </div>
                            <div class="member-profile">
                                <div class="profile-avatar">
                                    <div class="avatar-placeholder large">
                                        <div class="avatar-initials">钱开伦</div>
                                    </div>
                                </div>
                                <div class="profile-info">
                                    <div class="profile-bio">
                                        <p>钱开伦博士是WarkAI的AI技术总负责人，拥有超过10年的人工智能研究和产品开发经验。在加入WarkAI之前，他曾在多家顶级科技公司担任技术领导职务。</p>
                                        <p>他在机器学习、计算机视觉和自然语言处理领域有着深厚的学术背景和丰富的实践经验，主导过多个大型AI系统的设计和实现。</p>
                                        <p>钱开伦博士毕业于UCLA，获得计算机科学博士学位，专注于人工智能和机器学习研究。</p>
                                    </div>
                                    <div class="profile-achievements">
                                        <h4>主要成就</h4>
                                        <ul>
                                            <li>主导开发过多个商业化AI系统</li>
                                            <li>在顶级AI会议(NeurIPS, ICML, CVPR)发表20+篇论文</li>
                                            <li>拥有多项AI算法专利</li>
                                            <li>曾获ACM人工智能杰出贡献奖</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="profile-vision">
                                <h4>AI理念</h4>
                                <div class="eva-terminal">
                                    <div class="eva-terminal-content">
                                        "AI的终极目标是增强人类能力，而非替代人类。在WarkAI，我们正在构建的AI系统专注于理解人类意图，预测人类需求，并在适当的时候提供恰到好处的帮助。我们相信，只有当AI能够无缝融入人类工作流程，它才能真正发挥其价值。"
                                    </div>
                                </div>
                            </div>
                        `;
                        break;
                    case 'model':
                        modalContent = `
                            <div class="eva-style-header">
                                <h3>范非易 - 大模型负责人</h3>
                                <div class="eva-header-line"></div>
                            </div>
                            <div class="member-profile">
                                <div class="profile-avatar">
                                    <div class="avatar-placeholder large">
                                        <div class="avatar-initials">范非易</div>
                                    </div>
                                </div>
                                <div class="profile-info">
                                    <div class="profile-bio">
                                        <p>范非易博士是WarkAI的大模型研发负责人，专注于大规模预训练模型的开发和优化。在加入WarkAI之前，他曾在多家顶级AI研究机构工作。</p>
                                        <p>他在自然语言处理、多模态学习和模型压缩领域有着丰富的经验，主导过多个大型语言模型的训练和部署。</p>
                                        <p>范非易博士毕业于帝国理工学院，获得人工智能博士学位，专注于大规模预训练模型研究。</p>
                                    </div>
                                    <div class="profile-achievements">
                                        <h4>主要成就</h4>
                                        <ul>
                                            <li>主导开发过多个大规模预训练模型</li>
                                            <li>在ACL, EMNLP等顶级NLP会议发表多篇论文</li>
                                            <li>开发的模型压缩技术被多家公司采用</li>
                                            <li>曾获ICLR最佳论文奖</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="profile-vision">
                                <h4>大模型理念</h4>
                                <div class="eva-terminal">
                                    <div class="eva-terminal-content">
                                        "大模型的真正价值在于其通用性和适应性。在WarkAI，我们正在开发的大模型不仅能够理解文本，还能理解图像、视频和声音，从而为AR和机器人系统提供强大的认知能力。我们特别关注模型在特定垂直领域的优化，确保它能够真正理解行业知识和专业术语。"
                                    </div>
                                </div>
                            </div>
                        `;
                        break;
                    case 'app':
                        modalContent = `
                            <div class="eva-style-header">
                                <h3>徐时琛 - APP架构负责人</h3>
                                <div class="eva-header-line"></div>
                            </div>
                            <div class="member-profile">
                                <div class="profile-avatar">
                                    <div class="avatar-placeholder large">
                                        <div class="avatar-initials">徐时琛</div>
                                    </div>
                                </div>
                                <div class="profile-info">
                                    <div class="profile-bio">
                                        <p>徐时琛先生是WarkAI的APP架构负责人，拥有超过10年的移动应用开发和架构设计经验。在加入WarkAI之前，他曾在多家知名互联网公司担任技术主管。</p>
                                        <p>他在跨平台开发、实时通信和分布式系统方面有着丰富的经验，主导过多个大型移动应用的架构设计和实现。</p>
                                        <p>徐时琛先生毕业于浙江大学，获得软件工程硕士学位。</p>
                                    </div>
                                    <div class="profile-achievements">
                                        <h4>主要成就</h4>
                                        <ul>
                                            <li>主导开发过多个千万级用户的移动应用</li>
                                            <li>设计的微服务架构被多家公司采用</li>
                                            <li>拥有多项软件架构相关专利</li>
                                            <li>曾获中国软件设计大赛金奖</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="profile-vision">
                                <h4>架构理念</h4>
                                <div class="eva-terminal">
                                    <div class="eva-terminal-content">
                                        "优秀的软件架构应该是用户感知不到的。在WarkAI，我们正在构建的应用架构专注于性能、稳定性和可扩展性，确保用户在任何情况下都能获得流畅的体验。同时，我们也非常重视安全性和隐私保护，确保用户数据的安全。"
                                    </div>
                                </div>
                            </div>
                        `;
                        break;
                }
                
                // Set modal content and show modal
                teamModalBody.innerHTML = modalContent;
                teamModal.style.display = 'flex';
                
                // Add EVA-style animations to modal content
                const evaHeader = teamModalBody.querySelector('.eva-style-header');
                const profileAvatar = teamModalBody.querySelector('.profile-avatar');
                const profileInfo = teamModalBody.querySelector('.profile-info');
                const profileVision = teamModalBody.querySelector('.profile-vision');
                const evaTerminal = teamModalBody.querySelector('.eva-terminal');
                
                anime({
                    targets: evaHeader,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 800,
                    easing: 'easeOutQuad'
                });
                
                anime({
                    targets: profileAvatar,
                    opacity: [0, 1],
                    translateX: [-50, 0],
                    duration: 800,
                    delay: 300,
                    easing: 'easeOutQuad'
                });
                
                anime({
                    targets: profileInfo,
                    opacity: [0, 1],
                    translateX: [50, 0],
                    duration: 800,
                    delay: 500,
                    easing: 'easeOutQuad'
                });
                
                anime({
                    targets: profileVision,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 800,
                    delay: 700,
                    easing: 'easeOutQuad'
                });
                
                if (evaTerminal) {
                    anime({
                        targets: evaTerminal,
                        opacity: [0, 1],
                        duration: 800,
                        delay: 900,
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
                        
                        setTimeout(typeWriter, 1000);
                    }
                }
            });
        });
        
        // Close modal when clicking the close button
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                teamModal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside the modal content
        window.addEventListener('click', (event) => {
            if (event.target === teamModal) {
                teamModal.style.display = 'none';
            }
        });
    }
}

// Function to initialize cost chart
function initializeCostChart() {
    const costChart = document.getElementById('costChart');
    
    if (costChart) {
        new Chart(costChart, {
            type: 'bar',
            data: {
                labels: ['WarkAI', '竞品A', '竞品B', '竞品C'],
                datasets: [{
                    label: '硬件成本指数',
                    data: [58, 100, 95, 87],
                    backgroundColor: [
                        'rgba(0, 163, 255, 0.7)',
                        'rgba(255, 60, 60, 0.7)',
                        'rgba(255, 60, 60, 0.7)',
                        'rgba(255, 60, 60, 0.7)'
                    ],
                    borderColor: [
                        'rgba(0, 163, 255, 1)',
                        'rgba(255, 60, 60, 1)',
                        'rgba(255, 60, 60, 1)',
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
                        max: 120,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0a0',
                            callback: function(value) {
                                return value + '%';
                            }
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
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Function to initialize timeline animation
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        anime({
            targets: timelineItems,
            opacity: [0, 1],
            translateX: [-50, 0],
            delay: anime.stagger(200),
            duration: 1000,
            easing: 'easeOutQuad'
        });
    }
}

// Function to initialize vision statements animation
function initializeVisionStatements() {
    const visionStatements = document.querySelectorAll('.vision-statement');
    
    if (visionStatements.length > 0) {
        anime({
            targets: visionStatements,
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(200),
            duration: 1000,
            easing: 'easeOutQuad'
        });
    }
}

// Function to initialize tech moat animation
function initializeTechMoat() {
    const moatItems = document.querySelectorAll('.moat-item');
    
    if (moatItems.length > 0) {
        anime({
            targets: moatItems,
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(200),
            duration: 1000,
            easing: 'easeOutQuad'
        });
    }
}

// Function to initialize social value animation
function initializeSocialValue() {
    const socialValueItems = document.querySelectorAll('.social-value-item');
    
    if (socialValueItems.length > 0) {
        anime({
            targets: socialValueItems,
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(200),
            duration: 1000,
            easing: 'easeOutQuad'
        });
    }
}
