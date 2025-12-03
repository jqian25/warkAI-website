/**
 * 文字菜单项点击处理脚本
 * 确保所有文字菜单项都可以被点击跳转
 */

(function() {
    'use strict';

    // 初始化文字菜单项
    function initTextMenuLinks() {
        console.log('[Text Menu] 初始化文字菜单项...');

        // 查找所有 a 标签
        const links = document.querySelectorAll('a');
        console.log(`[Text Menu] 找到 ${links.length} 个 <a> 元素`);

        // 为每个链接添加点击事件监听器
        links.forEach((link, index) => {
            const href = link.getAttribute('href');
            const text = link.textContent.trim();

            // 检查是否是导航菜单链接
            if (href && (href.includes('/pages/') || href.startsWith('/'))) {
                console.log(`[Text Menu] 链接 ${index}: ${text} -> ${href}`);

                // 添加点击事件监听器
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log(`[Text Menu] 点击链接: ${text} -> ${href}`);

                    // 显示变形动画
                    showTransformAnimation(href);
                });

                // 确保链接可见和可点击
                link.style.cursor = 'pointer';
                link.style.pointerEvents = 'auto';
                link.style.textDecoration = 'none';
                link.style.color = '#00ff00';

                // 添加悬停效果
                link.addEventListener('mouseenter', function() {
                    this.style.textShadow = '0 0 10px rgba(0, 255, 0, 0.8)';
                    this.style.filter = 'brightness(1.2)';
                });

                link.addEventListener('mouseleave', function() {
                    this.style.textShadow = 'none';
                    this.style.filter = 'brightness(1)';
                });
            }
        });

        console.log('[Text Menu] 文字菜单项初始化完成');
    }

    // 显示变形动画并导航
    function showTransformAnimation(targetPage) {
        const transformOverlay = document.getElementById('transformOverlay');
        if (!transformOverlay) {
            console.log('[Text Menu] 变形覆盖层不存在，直接导航');
            window.location.href = targetPage;
            return;
        }

        console.log('[Text Menu] 显示变形动画...');

        // 显示变形覆盖层
        transformOverlay.style.display = 'flex';

        // 模拟变形进度
        let progress = 0;
        const progressBar = document.getElementById('transformProgress');
        const progressInterval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress > 100) progress = 100;

            if (progressBar) {
                progressBar.style.width = progress + '%';
            }

            if (progress >= 100) {
                clearInterval(progressInterval);

                // 延迟导航
                setTimeout(() => {
                    console.log('[Text Menu] 导航到: ' + targetPage);
                    window.location.href = targetPage;
                }, 200);
            }
        }, 50);
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTextMenuLinks);
    } else {
        initTextMenuLinks();
    }

    // 监听页面动态变化
    const observer = new MutationObserver(() => {
        // 检查是否有新的链接被添加
        const links = document.querySelectorAll('a[href*="/pages/"]');
        if (links.length > 0) {
            // 为新链接添加事件监听器
            links.forEach(link => {
                if (!link.hasAttribute('data-listener-added')) {
                    link.setAttribute('data-listener-added', 'true');
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const href = this.getAttribute('href');
                        console.log('[Text Menu] 动态链接点击: ' + href);
                        showTransformAnimation(href);
                    });
                }
            });
        }
    });

    // 观察 body 的变化
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
    });

    console.log('[Text Menu] 文字菜单处理脚本已加载');
})();
