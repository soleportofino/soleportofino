// Sole Portofino - Zodiac Collection Minimal JS

document.addEventListener('DOMContentLoaded', function() {
    // Video optimization
    const video = document.querySelector('.hero-video');
    if (video) {
        // Ensure video plays smoothly
        video.addEventListener('loadeddata', () => {
            video.play().catch(e => {
                // Silent fail if autoplay is blocked
                console.log('Video autoplay was prevented');
            });
        });
        
        // Optimize video playback
        video.playbackRate = 1.0;
    }
    
    // Cart Toggle Functionality
    const cartToggle = document.querySelector('.cart-toggle');
    if (cartToggle) {
        cartToggle.addEventListener('click', function() {
            alert('Shopping cart functionality will be available soon!');
        });
    }
    
    // Buy Button Functionality
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            alert(`Thank you for your interest in ${product.charAt(0).toUpperCase() + product.slice(1)}! Product ordering will be available soon.`);
        });
    });
    
    // Smooth scroll for any future anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Lazy load images for better performance
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    // Observe all product images
    document.querySelectorAll('.product-image img').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });
    
});