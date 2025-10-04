document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initializeAnimations();
});

// Function to initialize animations
function initializeAnimations() {
    // Animate architecture layers
    const archLayers = document.querySelectorAll('.arch-layer');
    if (archLayers.length > 0) {
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
                    
                    // Animate arch items inside the layer
                    const archItems = entry.target.querySelectorAll('.arch-item');
                    anime({
                        targets: archItems,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        delay: anime.stagger(100),
                        duration: 600,
                        easing: 'easeOutQuad'
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        archLayers.forEach(layer => {
            observer.observe(layer);
        });
    }
    
    // Animate architecture description
    const archDescription = document.querySelector('.architecture-description');
    if (archDescription) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 800,
                        easing: 'easeOutQuad'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(archDescription);
    }
    
    // Animate capability cards
    const capabilityCards = document.querySelectorAll('.capability-card');
    if (capabilityCards.length > 0) {
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
                    
                    // Animate stat values with counting effect
                    const statValues = entry.target.querySelectorAll('.stat-value');
                    statValues.forEach(statValue => {
                        const originalText = statValue.textContent;
                        let targetValue;
                        let suffix = '';
                        
                        if (originalText.includes('%')) {
                            targetValue = parseFloat(originalText);
                            suffix = '%';
                        } else if (originalText.includes('mm')) {
                            targetValue = parseFloat(originalText);
                            suffix = 'mm';
                        } else if (originalText.includes('s')) {
                            targetValue = parseFloat(originalText);
                            suffix = 's';
                        } else if (originalText.includes('B+')) {
                            targetValue = parseFloat(originalText);
                            suffix = 'B+';
                        } else if (originalText.includes('万+')) {
                            targetValue = parseFloat(originalText);
                            suffix = '万+';
                        } else {
                            targetValue = parseFloat(originalText);
                        }
                        
                        if (!isNaN(targetValue)) {
                            statValue.textContent = '0' + suffix;
                            
                            setTimeout(() => {
                                anime({
                                    targets: statValue,
                                    innerHTML: [0, targetValue],
                                    round: 1,
                                    suffix: suffix,
                                    duration: 2000,
                                    easing: 'easeInOutExpo'
                                });
                            }, 500);
                        }
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        capabilityCards.forEach(card => {
            observer.observe(card);
        });
    }
    
    // Animate interface showcase
    const interfaceShowcase = document.querySelector('.interface-showcase');
    if (interfaceShowcase) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 800,
                        easing: 'easeOutQuad'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(interfaceShowcase);
    }
    
    // Animate feature items
    const featureItems = document.querySelectorAll('.feature-item');
    if (featureItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        duration: 800,
                        easing: 'easeOutQuad'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        featureItems.forEach((item, index) => {
            setTimeout(() => {
                observer.observe(item);
            }, index * 100);
        });
    }
    
    // Animate innovation items
    const innovationItems = document.querySelectorAll('.innovation-item');
    if (innovationItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateX: [-30, 0],
                        duration: 800,
                        easing: 'easeOutQuad'
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        innovationItems.forEach((item, index) => {
            setTimeout(() => {
                observer.observe(item);
            }, index * 150);
        });
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
    
    // Animate partner cards
    const partnerCards = document.querySelectorAll('.partner-card');
    if (partnerCards.length > 0) {
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
        
        partnerCards.forEach((card, index) => {
            setTimeout(() => {
                observer.observe(card);
            }, index * 100);
        });
    }
    
    // Add EVA-style scanning effect to the interface image
    const interfaceImg = document.querySelector('.interface-img');
    if (interfaceImg) {
        interfaceImg.addEventListener('load', () => {
            const scanLine = document.createElement('div');
            scanLine.classList.add('scan-line');
            interfaceImg.parentNode.appendChild(scanLine);
            
            anime({
                targets: scanLine,
                translateY: [0, interfaceImg.offsetHeight],
                duration: 2000,
                delay: 1000,
                easing: 'linear',
                loop: true
            });
        });
    }
    
    // Add hexagon background animation
    const hexBackground = document.querySelector('.hex-background');
    if (hexBackground) {
        // Create hexagon pattern
        for (let i = 0; i < 20; i++) {
            const hexagon = document.createElement('div');
            hexagon.classList.add('hex');
            hexagon.style.left = `${Math.random() * 100}%`;
            hexagon.style.top = `${Math.random() * 100}%`;
            hexagon.style.animationDelay = `${Math.random() * 5}s`;
            hexBackground.appendChild(hexagon);
        }
    }
    
    // Add gear animation to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    if (sectionTitles.length > 0) {
        sectionTitles.forEach(title => {
            const gear = document.createElement('div');
            gear.classList.add('gear-small');
            title.prepend(gear);
            
            anime({
                targets: gear,
                rotate: 360,
                duration: 8000,
                easing: 'linear',
                loop: true
            });
        });
    }
    
    // Add EVA-style terminal animation
    const evaTerminals = document.querySelectorAll('.eva-terminal');
    if (evaTerminals.length > 0) {
        evaTerminals.forEach(terminal => {
            const terminalContent = terminal.querySelector('.eva-terminal-content');
            const originalText = terminalContent.textContent;
            terminalContent.textContent = '';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        let i = 0;
                        const typeText = () => {
                            if (i < originalText.length) {
                                terminalContent.textContent += originalText.charAt(i);
                                i++;
                                setTimeout(typeText, 20);
                            }
                        };
                        
                        setTimeout(typeText, 500);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(terminal);
        });
    }
}
