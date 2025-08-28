// 轮播图功能实现
function initProjectSlider(sliderId = 'project-slider') {
    // 获取轮播图元素
    const slides = document.querySelectorAll(`#${sliderId} .project-slide`);
    const indicators = document.querySelectorAll(`#${sliderId} .slide-indicator`);
    const prevBtn = document.querySelector(`#${sliderId} .slide-prev`);
    const nextBtn = document.querySelector(`#${sliderId} .slide-next`);
    
    let currentSlide = 0;
    let slideInterval;
    
    // 显示指定索引的幻灯片
    function showSlide(index) {
        // 确保索引在有效范围内
        if (index < 0) {
            currentSlide = slides.length - 1;
        } else if (index >= slides.length) {
            currentSlide = 0;
        } else {
            currentSlide = index;
        }
        
        // 隐藏所有幻灯片
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // 更新指示器状态
        indicators.forEach((indicator, i) => {
            if (i === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        // 显示当前幻灯片
        slides[currentSlide].classList.add('active', 'slide-fade');
    }
    
    // 下一张幻灯片
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // 上一张幻灯片
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // 启动自动播放
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000); // 每5秒切换一张幻灯片
    }
    
    // 停止自动播放
    function stopSlideInterval() {
        clearInterval(slideInterval);
    }
    
    // 添加事件监听器
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopSlideInterval();
            prevSlide();
            startSlideInterval();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopSlideInterval();
            nextSlide();
            startSlideInterval();
        });
    }
    
    // 为指示器添加点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopSlideInterval();
            showSlide(index);
            startSlideInterval();
        });
    });
    
    // 鼠标悬停时停止自动播放，鼠标离开时恢复
    const sliderContainer = document.getElementById(sliderId);
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopSlideInterval);
        sliderContainer.addEventListener('mouseleave', startSlideInterval);
    }
    
    // 初始化显示第一张幻灯片并启动自动播放
    showSlide(0);
    startSlideInterval();
}

// 页面加载完成后初始化轮播图
document.addEventListener('DOMContentLoaded', function() {
    // 检查页面中是否存在轮播图
    if (document.getElementById('project-slider')) {
        initProjectSlider('project-slider');
    }
});