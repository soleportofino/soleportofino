// Sole Portofino - Luxury Boutique JavaScript

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initCart();
    initProductCards();
    initAnimations();
    initNewsletterForm();
    initSmoothScroll();
    initHeaderEffects();
    initInstagramHover();
});

// Mobile Menu with Overlay
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const body = document.body;
    
    if (!menuToggle || !navMenu) return;
    
    // Create or get overlay
    let overlay = menuOverlay || document.createElement('div');
    if (!menuOverlay) {
        overlay.className = 'menu-overlay';
        overlay.id = 'menu-overlay';
        body.appendChild(overlay);
    }
    
    // Toggle menu
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = navMenu.classList.contains('active');
        
        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Close on overlay click
    overlay.addEventListener('click', closeMenu);
    
    // Close on menu link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    function openMenu() {
        navMenu.classList.add('active');
        menuToggle.classList.add('active');
        overlay.classList.add('active');
        body.style.overflow = 'hidden';
    }
    
    function closeMenu() {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }
}

// Enhanced Cart with LocalStorage
const Cart = {
    items: JSON.parse(localStorage.getItem('soleportofino_cart') || '[]'),
    
    add(product) {
        const existing = this.items.find(item => item.id === product.id);
        
        if (existing) {
            existing.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.save();
        this.updateUI();
        this.showNotification('Ürün sepete eklendi');
        
        // Open cart after adding
        setTimeout(() => {
            document.getElementById('cart-sidebar')?.classList.add('active');
        }, 300);
    },
    
    remove(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.updateUI();
    },
    
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.remove(productId);
            } else {
                item.quantity = quantity;
                this.save();
                this.updateUI();
            }
        }
    },
    
    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
    getCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    
    save() {
        localStorage.setItem('soleportofino_cart', JSON.stringify(this.items));
    },
    
    updateUI() {
        const cartCount = document.getElementById('cart-count');
        const cartContent = document.getElementById('cart-content');
        const cartTotal = document.getElementById('cart-total');
        
        // Update count
        const count = this.getCount();
        if (cartCount) {
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'flex' : 'none';
            
            // Animate count change
            cartCount.classList.add('bounce');
            setTimeout(() => cartCount.classList.remove('bounce'), 300);
        }
        
        // Update cart content
        if (cartContent) {
            if (this.items.length === 0) {
                cartContent.innerHTML = '<p class="empty-cart">Sepetiniz boş</p>';
            } else {
                cartContent.innerHTML = this.items.map(item => `
                    <div class="cart-item" data-id="${item.id}">
                        <img src="${item.image}" alt="${item.name}" loading="lazy">
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <div class="cart-item-price">
                                <span>₺${item.price.toLocaleString('tr-TR')}</span>
                                <div class="quantity-controls">
                                    <button class="qty-btn minus" data-id="${item.id}">-</button>
                                    <span class="qty">${item.quantity}</span>
                                    <button class="qty-btn plus" data-id="${item.id}">+</button>
                                </div>
                            </div>
                        </div>
                        <button class="remove-item" data-id="${item.id}">&times;</button>
                    </div>
                `).join('');
                
                // Add event listeners to quantity controls
                cartContent.querySelectorAll('.qty-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const id = e.target.dataset.id;
                        const item = this.items.find(i => i.id === id);
                        if (item) {
                            if (btn.classList.contains('plus')) {
                                this.updateQuantity(id, item.quantity + 1);
                            } else {
                                this.updateQuantity(id, item.quantity - 1);
                            }
                        }
                    });
                });
                
                // Add event listeners to remove buttons
                cartContent.querySelectorAll('.remove-item').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        this.remove(e.target.dataset.id);
                    });
                });
            }
        }
        
        // Update total
        if (cartTotal) {
            cartTotal.textContent = `₺${this.getTotal().toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;
        }
    },
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// Initialize Cart UI
function initCart() {
    const cartToggle = document.getElementById('cart-toggle');
    const cartClose = document.getElementById('cart-close');
    const cartSidebar = document.getElementById('cart-sidebar');
    
    // Create cart overlay
    const cartOverlay = document.createElement('div');
    cartOverlay.className = 'cart-overlay';
    document.body.appendChild(cartOverlay);
    
    // Open cart
    cartToggle?.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close cart
    const closeCart = () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    cartClose?.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);
    
    // Initialize cart UI
    Cart.updateUI();
}

// Product Card Interactions
function initProductCards() {
    // Sample products data
    const products = {
        '1': { id: '1', name: 'Signature Gingham Tote', price: 350, image: 'images/product-main.jpg' },
        '2': { id: '2', name: 'Beyaz Keten Elbise', price: 650, image: 'images/product-dress-1.jpg' },
        '3': { id: '3', name: 'Portofino Hasır Şapka', price: 250, image: 'images/product-hat-1.jpg' },
        '4': { id: '4', name: 'Mini Sepet Çanta', price: 420, image: 'images/product-bag-2.jpg' }
    };
    
    // Add to cart buttons
    document.querySelectorAll('.product-card-add').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = btn.dataset.productId;
            const product = products[productId];
            
            if (product) {
                Cart.add(product);
                
                // Ripple effect
                const rect = btn.getBoundingClientRect();
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.left = '50%';
                ripple.style.top = '50%';
                btn.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            }
        });
    });
}

// Scroll Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger children animations
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.section, .collection-card, .product-card, .about-intro').forEach(el => {
        observer.observe(el);
    });
}

// Newsletter Form
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value;
        const button = form.querySelector('button');
        const originalText = button.textContent;
        
        // Loading state
        button.textContent = 'Kaydediliyor...';
        button.disabled = true;
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success
            button.textContent = '✓ Kayıt Başarılı';
            form.reset();
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 3000);
        } catch (error) {
            button.textContent = 'Hata! Tekrar Deneyin';
            button.disabled = false;
        }
    });
}

// Smooth Scroll
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
            }
        });
    });
}

// Header Effects
function initHeaderEffects() {
    const header = document.querySelector('.site-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show on scroll
        if (currentScroll > lastScroll && currentScroll > 300) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// Instagram Hover Effects
function initInstagramHover() {
    const instagramItems = document.querySelectorAll('.instagram-item');
    
    instagramItems.forEach(item => {
        item.addEventListener('click', () => {
            // Open Instagram in new tab
            window.open('https://instagram.com/soleportofino', '_blank');
        });
    });
}

// Add some CSS for notifications
const style = document.createElement('style');
style.textContent = `
    .cart-notification {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--navy);
        color: white;
        padding: 16px 24px;
        border-radius: var(--radius-full);
        box-shadow: var(--shadow-lg);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 9999;
    }
    
    .cart-notification.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .cart-item {
        display: flex;
        gap: 1rem;
        padding: 1rem 0;
        border-bottom: 1px solid var(--gray-200);
    }
    
    .cart-item img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: var(--radius-sm);
    }
    
    .cart-item-info {
        flex: 1;
    }
    
    .cart-item h4 {
        font-size: 0.95rem;
        margin-bottom: 0.5rem;
    }
    
    .cart-item-price {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .quantity-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .qty-btn {
        width: 24px;
        height: 24px;
        border: 1px solid var(--gray-300);
        background: white;
        border-radius: var(--radius-sm);
        cursor: pointer;
        transition: all 0.2s;
    }
    
    .qty-btn:hover {
        background: var(--gray-100);
        border-color: var(--coral);
    }
    
    .remove-item {
        align-self: flex-start;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--gray-400);
        cursor: pointer;
        transition: color 0.2s;
    }
    
    .remove-item:hover {
        color: var(--coral);
    }
    
    .cart-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
    }
    
    .cart-overlay.active {
        opacity: 1;
        visibility: visible;
    }
    
    .cart-sidebar {
        position: fixed;
        top: 0;
        right: -400px;
        width: 400px;
        max-width: 100%;
        height: 100vh;
        background: white;
        box-shadow: var(--shadow-xl);
        transition: right 0.3s ease;
        z-index: 1000;
        display: flex;
        flex-direction: column;
    }
    
    .cart-sidebar.active {
        right: 0;
    }
    
    .cart-header {
        padding: 1.5rem;
        border-bottom: 1px solid var(--gray-200);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .cart-close {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: var(--gray-600);
        transition: color 0.2s;
    }
    
    .cart-close:hover {
        color: var(--gray-900);
    }
    
    .cart-content {
        flex: 1;
        padding: 1.5rem;
        overflow-y: auto;
    }
    
    .empty-cart {
        text-align: center;
        color: var(--gray-500);
        padding: 3rem 0;
    }
    
    .cart-footer {
        padding: 1.5rem;
        border-top: 1px solid var(--gray-200);
    }
    
    .cart-total {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }
    
    .checkout-button {
        width: 100%;
        padding: 1rem;
        background: var(--coral);
        color: white;
        border: none;
        border-radius: var(--radius-full);
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .checkout-button:hover {
        background: var(--navy);
        transform: translateY(-2px);
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.6);
        transform: translate(-50%, -50%) scale(0);
        animation: ripple 0.6s ease-out;
    }
    
    @keyframes ripple {
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
    
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    .cart-count.bounce {
        animation: bounce 0.3s ease;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);