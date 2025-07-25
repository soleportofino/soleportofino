// Sole Portofino - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initCart();
    initProductGallery();
    initContactForm();
    initSmoothScroll();
    initHeaderScroll();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Cart Functionality
function initCart() {
    const cartToggle = document.getElementById('cart-toggle');
    const cartClose = document.getElementById('cart-close');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartCount = document.getElementById('cart-count');
    const cartContent = document.getElementById('cart-content');
    const cartTotal = document.getElementById('cart-total');
    
    // Toggle cart sidebar
    if (cartToggle) {
        cartToggle.addEventListener('click', function() {
            cartSidebar.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (cartClose) {
        cartClose.addEventListener('click', function() {
            cartSidebar.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close cart on outside click
    document.addEventListener('click', function(e) {
        if (cartSidebar && cartSidebar.classList.contains('active')) {
            if (!cartSidebar.contains(e.target) && !cartToggle.contains(e.target)) {
                cartSidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Update cart count from localStorage
    updateCartUI();
}

// Update Cart UI
function updateCartUI() {
    const cart = getCart();
    const cartCount = document.getElementById('cart-count');
    const cartContent = document.getElementById('cart-content');
    const cartTotal = document.getElementById('cart-total');
    
    // Update count
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
    
    // Update cart content
    if (cartContent) {
        if (cart.length === 0) {
            cartContent.innerHTML = '<p class="empty-cart">Sepetiniz boş</p>';
        } else {
            let html = '';
            cart.forEach(item => {
                html += `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p>₺${item.price} x ${item.quantity}</p>
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
        cartTotal.textContent = `₺${total.toFixed(2)}`;
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
    
    // Show cart sidebar
    document.getElementById('cart-sidebar').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function removeFromCart(productId) {
    const cart = getCart();
    const newCart = cart.filter(item => item.id !== productId);
    saveCart(newCart);
}

// Product Gallery
function initProductGallery() {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Update main image
            const newSrc = this.dataset.image;
            if (mainImage && newSrc) {
                mainImage.src = newSrc;
                mainImage.alt = this.alt;
            }
            
            // Update active state
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Contact Form
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
            submitBtn.textContent = 'Gönderiliyor...';
            submitBtn.disabled = true;
            
            try {
                // In real implementation, send to your backend
                // For now, just simulate a delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Show success message
                alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
                form.reset();
            } catch (error) {
                alert('Bir hata oluştu. Lütfen tekrar deneyin.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
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
                
                // Close mobile menu if open
                document.querySelector('.nav-menu')?.classList.remove('active');
                document.querySelector('.menu-toggle')?.classList.remove('active');
            }
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
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
    });
}

// Add product manually (for testing without Shopify)
window.addProductToCart = function() {
    addToCart({
        id: 'signature-tote',
        name: 'Sole Portofino Signature Gingham Tote',
        price: 2999,
        image: 'images/product-main.jpg'
    });
};

// Export cart functions for global use
window.removeFromCart = removeFromCart;
window.getCart = getCart;