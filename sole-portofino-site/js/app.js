// Sole Portofino - Premium JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initCart();
    initProductGallery();
    initContactForm();
    initSmoothScroll();
    initHeaderScroll();
    initPremiumEffects();
    initAnimations();
});

// Mobile Menu Toggle - ENHANCED
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    body.appendChild(overlay);
    
    if (menuToggle && navMenu) {
        // Toggle menu
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Close menu on overlay click
        overlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
        });
        
        // Close menu on menu item click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
        
        // Prevent menu close on menu click
        navMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

// Premium Effects
function initPremiumEffects() {
    // Magnetic buttons
    document.querySelectorAll('.cta-button, .submit-button').forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
    
    // Parallax hero image
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        });
    }
}

// Scroll Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.feature, .product-info > *, .about-text').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Cart Functionality - ENHANCED
function initCart() {
    const cartToggle = document.getElementById('cart-toggle');
    const cartClose = document.getElementById('cart-close');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartCount = document.getElementById('cart-count');
    const cartContent = document.getElementById('cart-content');
    const cartTotal = document.getElementById('cart-total');
    
    // Create cart overlay
    const cartOverlay = document.createElement('div');
    cartOverlay.className = 'cart-overlay';
    document.body.appendChild(cartOverlay);
    
    // Toggle cart sidebar
    if (cartToggle) {
        cartToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close cart
    const closeCart = () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }
    
    cartOverlay.addEventListener('click', closeCart);
    
    // Update cart count from localStorage
    updateCartUI();
}

// Update Cart UI - ENHANCED
function updateCartUI() {
    const cart = getCart();
    const cartCount = document.getElementById('cart-count');
    const cartContent = document.getElementById('cart-content');
    const cartTotal = document.getElementById('cart-total');
    
    // Update count with animation
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const currentCount = parseInt(cartCount.textContent);
        
        if (currentCount !== totalItems) {
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 300);
        }
        
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
    
    // Update cart content
    if (cartContent) {
        if (cart.length === 0) {
            cartContent.innerHTML = '<p class="empty-cart">Sepetiniz boş</p>';
        } else {
            let html = '';
            cart.forEach(item => {
                html += `
                    <div class="cart-item fade-in">
                        <img src="${item.image}" alt="${item.name}" loading="lazy">
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p>₺${item.price.toLocaleString('tr-TR')} x ${item.quantity}</p>
                        </div>
                        <button onclick="removeFromCart('${item.id}')" class="remove-item">&times;</button>
                    </div>
                `;
            });
            cartContent.innerHTML = html;
        }
    }
    
    // Update total
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `₺${total.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;
    }
}

// Cart functions
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart(cart);
    
    // Show cart sidebar with animation
    setTimeout(() => {
        document.getElementById('cart-sidebar').classList.add('active');
        document.querySelector('.cart-overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    }, 100);
}

function removeFromCart(productId) {
    const cart = getCart();
    const newCart = cart.filter(item => item.id !== productId);
    saveCart(newCart);
}

// Product Gallery - ENHANCED with 3D Effects
function initProductGallery() {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImageContainer = document.querySelector('.main-image');
    
    // 3D tilt effect and zoom for main image
    if (mainImageContainer && mainImage) {
        let isZooming = false;
        
        mainImageContainer.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            if (!isZooming) {
                // 3D tilt effect
                const rotateX = (y - centerY) / centerY * -10;
                const rotateY = (x - centerX) / centerX * 10;
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            } else {
                // Zoom effect
                const xPercent = (x / rect.width) * 100;
                const yPercent = (y / rect.height) * 100;
                mainImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
                mainImage.style.transform = 'scale(2)';
            }
            
            // Shine effect
            this.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1) 0%, transparent 60%)`;
        });
        
        mainImageContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            mainImage.style.transform = 'scale(1)';
            this.style.background = 'none';
            isZooming = false;
        });
        
        // Click to toggle zoom mode
        mainImageContainer.addEventListener('click', function() {
            isZooming = !isZooming;
            this.style.cursor = isZooming ? 'zoom-out' : 'zoom-in';
        });
    }
    
    // 3D hover effects for thumbnails
    thumbnails.forEach(thumb => {
        // Wrap thumbnail in a container for 3D effect
        const wrapper = document.createElement('div');
        wrapper.style.perspective = '1000px';
        thumb.parentNode.insertBefore(wrapper, thumb);
        wrapper.appendChild(thumb);
        
        thumb.addEventListener('mouseenter', function() {
            this.style.transform = 'translateZ(20px) scale(1.1)';
            this.style.boxShadow = '0 20px 40px rgba(0, 59, 115, 0.3)';
        });
        
        thumb.addEventListener('mouseleave', function() {
            this.style.transform = 'translateZ(0) scale(1)';
            this.style.boxShadow = '0 2px 10px rgba(0, 59, 115, 0.1)';
        });
        
        thumb.addEventListener('click', function() {
            // 3D flip animation for main image
            mainImageContainer.style.transition = 'transform 0.6s';
            mainImageContainer.style.transform = 'perspective(1000px) rotateY(180deg)';
            
            setTimeout(() => {
                const newSrc = this.dataset.image;
                if (mainImage && newSrc) {
                    mainImage.src = newSrc;
                    mainImage.alt = this.alt;
                }
                mainImageContainer.style.transform = 'perspective(1000px) rotateY(0)';
            }, 300);
            
            // Update active state with animation
            thumbnails.forEach(t => {
                t.classList.remove('active');
                t.style.transform = 'translateZ(0) scale(1)';
            });
            this.classList.add('active');
            this.style.transform = 'translateZ(20px) scale(1.1)';
        });
    });
    
    // Add dynamic CSS for 3D effects
    const style = document.createElement('style');
    style.innerHTML = `
        .main-image {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s;
            transform-style: preserve-3d;
            cursor: zoom-in;
            position: relative;
            overflow: hidden;
        }
        
        .main-image img {
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            will-change: transform;
        }
        
        .thumbnail {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            transform-style: preserve-3d;
            cursor: pointer;
            position: relative;
        }
        
        .thumbnail.active {
            transform: translateZ(20px) scale(1.1) !important;
            box-shadow: 0 20px 40px rgba(242, 85, 58, 0.3) !important;
        }
        
        @keyframes flipIn {
            from {
                transform: perspective(1000px) rotateY(-180deg);
                opacity: 0;
            }
            to {
                transform: perspective(1000px) rotateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Contact Form - ENHANCED
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.querySelector('.submit-button');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<span class="loading-spinner"></span> Gönderiliyor...';
            submitBtn.disabled = true;
            
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                showNotification('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
                form.reset();
                
                // Add success animation
                form.classList.add('form-success');
                setTimeout(() => form.classList.remove('form-success'), 3000);
            } catch (error) {
                showNotification('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Smooth Scroll - ENHANCED
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                document.querySelector('.nav-menu')?.classList.remove('active');
                document.querySelector('.menu-toggle')?.classList.remove('active');
                document.querySelector('.menu-overlay')?.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
}

// Header Scroll Effect - ENHANCED
function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    let lastScroll = 0;
    let ticking = false;
    
    function updateHeader() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 300) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// Add product manually (for testing without Shopify)
window.addProductToCart = function() {
    addToCart({
        id: 'signature-tote',
        name: 'Sole Portofino Signature Gingham Tote',
        price: 350,
        image: 'images/product-main.jpg'
    });
};

// Export cart functions for global use
window.removeFromCart = removeFromCart;
window.getCart = getCart;
window.showNotification = showNotification;