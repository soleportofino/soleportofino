// Sole Portofino - Main JavaScript

// Product data
const product = {
    id: 'SP-TOTE-001',
    name: 'Sole Portofino Signature Gingham Tote',
    price: 2999,
    image: 'images/Leonardo_Kino_XL_A_highquality_studio_photograph_of_a_stylish_3.jpg'
};

// Cart management
let cart = JSON.parse(localStorage.getItem('solePortofinoCart')) || [];

// Update cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuToggle?.addEventListener('click', function() {
        mainNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.header-wrapper')) {
            mainNav?.classList.remove('active');
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
                mainNav?.classList.remove('active');
            }
        });
    });
    
    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.site-header');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });
});

// Change main product image
function changeImage(src) {
    const mainImage = document.getElementById('mainProductImage');
    mainImage.src = src;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail-images img').forEach(img => {
        img.classList.remove('active');
        if (img.src.includes(src)) {
            img.classList.add('active');
        }
    });
}

// Quantity management
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
}

// Add to cart
function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // Check if product already in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex > -1) {
        // Update quantity
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    // Save to localStorage
    localStorage.setItem('solePortofinoCart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show success modal
    showSuccessModal();
    
    // Reset quantity
    document.getElementById('quantity').value = 1;
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show success modal
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
    
    // Close when clicking X
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        closeModal();
    }
    
    // Close when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'none';
}

// Newsletter subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    
    // Here you would normally send to your backend
    console.log('Newsletter subscription:', email);
    
    // Show success message
    alert('Bültenimize abone olduğunuz için teşekkürler!');
    
    // Reset form
    form.reset();
    
    return false;
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY'
    }).format(price);
}

// Image lazy loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}