// Video Player Control Script - Final Version

console.log('[Video Player] Script loaded');

// 全局变量用于跟踪初始化状态
window.videoPlayerInitialized = false;

function setupVideoEndedHandler() {
    console.log('[Video Player] Setting up video ended handler');
    
    const introVideo = document.getElementById('introVideo');
    const videoContainer = document.getElementById('videoPlayerContainer');
    const gundamNavigator = document.getElementById('gundamNavigator');
    
    if (!introVideo || !videoContainer || !gundamNavigator) {
        console.warn('[Video Player] Elements not found for ended handler');
        return false;
    }
    
    // 移除旧的事件监听器（如果存在）
    introVideo.removeEventListener('ended', handleVideoEnded);
    
    // 添加新的事件监听器
    introVideo.addEventListener('ended', handleVideoEnded);
    
    console.log('[Video Player] Video ended handler added');
    return true;
}

function handleVideoEnded() {
    console.log('[Video Player] Video ended event triggered');
    
    const videoContainer = document.getElementById('videoPlayerContainer');
    const gundamNavigator = document.getElementById('gundamNavigator');
    
    if (!videoContainer || !gundamNavigator) {
        console.warn('[Video Player] Elements not found in ended handler');
        return;
    }
    
    // 隐藏视频容器
    console.log('[Video Player] Hiding video container');
    videoContainer.classList.add('hidden');
    videoContainer.style.display = 'none';
    videoContainer.style.visibility = 'hidden';
    videoContainer.style.opacity = '0';
    
    // 显示机器人导航
    console.log('[Video Player] Showing gundam navigator');
    gundamNavigator.style.display = 'block';
    gundamNavigator.style.visibility = 'visible';
    gundamNavigator.style.opacity = '1';
    
    console.log('[Video Player] Video ended handler completed');
}

// 立即执行的初始化代码
(function() {
    console.log('[Video Player] Immediate initialization started');
    
    const videoContainer = document.getElementById('videoPlayerContainer');
    const introVideo = document.getElementById('introVideo');
    const gundamNavigator = document.getElementById('gundamNavigator');
    
    if (!videoContainer || !introVideo || !gundamNavigator) {
        console.warn('[Video Player] Elements not found on immediate init, retrying...');
        setTimeout(arguments.callee, 100);
        return;
    }
    
    console.log('[Video Player] Elements found, showing video player');
    
    // 移除 hidden 类
    videoContainer.classList.remove('hidden');
    
    // 设置显示样式
    videoContainer.style.display = 'flex';
    videoContainer.style.visibility = 'visible';
    videoContainer.style.opacity = '1';
    
    // 隐藏机器人导航
    gundamNavigator.style.display = 'none';
    gundamNavigator.style.visibility = 'hidden';
    gundamNavigator.style.opacity = '0';
    
    // 重置视频
    introVideo.currentTime = 0;
    
    // 设置视频结束处理器
    setupVideoEndedHandler();
    
    // 视频加载失败处理
    introVideo.addEventListener('error', function(e) {
        console.error('[Video Player] Video loading failed:', e);
        videoContainer.style.display = 'none';
        gundamNavigator.style.display = 'block';
    });
    
    // 点击视频跳过
    videoContainer.addEventListener('click', function() {
        console.log('[Video Player] Video skipped by user click');
        introVideo.currentTime = introVideo.duration;
        // 手动触发 ended 事件
        handleVideoEnded();
    });
    
    // 播放视频
    console.log('[Video Player] Starting video playback');
    introVideo.play().catch(function(error) {
        console.warn('[Video Player] Autoplay failed:', error);
        videoContainer.style.display = 'none';
        gundamNavigator.style.display = 'block';
    });
    
    // 设置 MutationObserver 来防止视频容器被隐藏（在视频播放期间）
    console.log('[Video Player] Setting up MutationObserver');
    
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes') {
                // 只在视频未播放完成时恢复显示
                if (introVideo.currentTime < introVideo.duration - 0.5) {
                    if (mutation.attributeName === 'class') {
                        // 检查是否添加了 hidden 类
                        if (videoContainer.classList.contains('hidden')) {
                            console.log('[Video Player] Hidden class detected during playback, removing it');
                            videoContainer.classList.remove('hidden');
                        }
                    } else if (mutation.attributeName === 'style') {
                        // 检查是否设置了 display: none
                        if (window.getComputedStyle(videoContainer).display === 'none') {
                            console.log('[Video Player] Display none detected during playback, restoring');
                            videoContainer.style.display = 'flex';
                            videoContainer.style.visibility = 'visible';
                            videoContainer.style.opacity = '1';
                        }
                    }
                }
            }
        });
    });
    
    observer.observe(videoContainer, {
        attributes: true,
        attributeFilter: ['class', 'style']
    });
    
    window.videoPlayerInitialized = true;
    console.log('[Video Player] Immediate initialization complete');
})();

// 备用方案：在 DOMContentLoaded 时再检查一次
document.addEventListener('DOMContentLoaded', function() {
    console.log('[Video Player] DOMContentLoaded event fired');
    
    if (!window.videoPlayerInitialized) {
        console.log('[Video Player] Video player not initialized yet, initializing now');
        
        const videoContainer = document.getElementById('videoPlayerContainer');
        const introVideo = document.getElementById('introVideo');
        const gundamNavigator = document.getElementById('gundamNavigator');
        
        if (videoContainer && introVideo && gundamNavigator) {
            videoContainer.classList.remove('hidden');
            videoContainer.style.display = 'flex';
            videoContainer.style.visibility = 'visible';
            videoContainer.style.opacity = '1';
            
            gundamNavigator.style.display = 'none';
            gundamNavigator.style.visibility = 'hidden';
            gundamNavigator.style.opacity = '0';
            
            introVideo.currentTime = 0;
            setupVideoEndedHandler();
            introVideo.play().catch(err => console.warn('[Video Player] Autoplay failed:', err));
            
            window.videoPlayerInitialized = true;
        }
    }
});

// 最后的保险：定期检查视频容器状态
setInterval(function() {
    const videoContainer = document.getElementById('videoPlayerContainer');
    const introVideo = document.getElementById('introVideo');
    
    if (videoContainer && introVideo) {
        // 如果视频已播放完成，隐藏视频容器
        if (introVideo.ended && videoContainer.style.display !== 'none') {
            console.log('[Video Player] Video ended but container still visible, hiding it');
            handleVideoEnded();
        }
        
        // 如果视频仍在播放，确保容器显示
        if (introVideo.currentTime < introVideo.duration - 0.5 && videoContainer.style.display === 'none') {
            console.log('[Video Player] Video playing but container hidden, showing it');
            videoContainer.classList.remove('hidden');
            videoContainer.style.display = 'flex';
            videoContainer.style.visibility = 'visible';
            videoContainer.style.opacity = '1';
        }
    }
}, 500);

console.log('[Video Player] Script initialization complete');
