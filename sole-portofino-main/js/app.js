// Sole Portofino - Main JavaScript

// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Image Gallery
function changeImage(thumbnail) {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Update main image
    mainImage.src = thumbnail.src;
    
    // Update active state
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    thumbnail.classList.add('active');
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Gönderiliyor...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        alert('Mesajınız başarıyla gönderildi!');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1000);
});

// Newsletter Form Handler
const newsletterForm = document.getElementById('newsletterForm');
newsletterForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = newsletterForm.querySelector('input[type="email"]').value;
    const submitButton = newsletterForm.querySelector('button');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Kaydediliyor...';
    submitButton.disabled = true;
    
    // Simulate subscription (replace with actual API call)
    setTimeout(() => {
        alert('Bültenimize başarıyla abone oldunuz!');
        newsletterForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1000);
});

// Shopify Buy Button Integration
document.addEventListener('DOMContentLoaded', function() {
    if (window.ShopifyBuy) {
        initializeShopifyBuyButton();
    }
});

function initializeShopifyBuyButton() {
    const client = ShopifyBuy.buildClient({
        domain: 'your-shop.myshopify.com', // BURAYA SHOPIFY DOMAIN'İNİZİ YAZIN
        storefrontAccessToken: 'your-storefront-access-token', // BURAYA ACCESS TOKEN'INIZI YAZIN
    });

    ShopifyBuy.UI.onReady(client).then(function (ui) {
        ui.createComponent('product', {
            id: 'YOUR_PRODUCT_ID', // BURAYA ÜRÜN ID'NİZİ YAZIN
            node: document.getElementById('product-component-1706123456789'),
            moneyFormat: '%E2%82%BA%7B%7Bamount%7D%7D',
            options: {
                product: {
                    styles: {
                        product: {
                            "@media (min-width: 601px)": {
                                "max-width": "100%",
                                "margin-left": "0",
                                "margin-bottom": "50px"
                            }
                        },
                        button: {
                            "font-family": "Montserrat, sans-serif",
                            "font-size": "16px",
                            "padding": "16px 32px",
                            "color": "white",
                            ":hover": {
                                "color": "white",
                                "background-color": "#6B3410"
                            },
                            "background-color": "#8B4513",
                            ":focus": {
                                "background-color": "#6B3410"
                            },
                            "border-radius": "4px",
                            "font-weight": "500",
                            "text-transform": "uppercase",
                            "letter-spacing": "1px"
                        }
                    },
                    buttonDestination: 'checkout',
                    contents: {
                        img: false,
                        title: false,
                        price: false,
                        options: false
                    },
                    text: {
                        button: 'SATIN AL'
                    }
                },
                productSet: {
                    styles: {
                        products: {
                            "@media (min-width: 601px)": {
                                "margin-left": "-20px"
                            }
                        }
                    }
                },
                modalProduct: {
                    contents: {
                        img: false,
                        imgWithCarousel: true,
                        button: false,
                        buttonWithQuantity: true
                    },
                    styles: {
                        product: {
                            "@media (min-width: 601px)": {
                                "max-width": "100%",
                                "margin-left": "0px",
                                "margin-bottom": "0px"
                            }
                        },
                        button: {
                            "font-family": "Montserrat, sans-serif",
                            "font-size": "16px",
                            "padding": "16px 32px",
                            "color": "white",
                            ":hover": {
                                "color": "white",
                                "background-color": "#6B3410"
                            },
                            "background-color": "#8B4513",
                            ":focus": {
                                "background-color": "#6B3410"
                            },
                            "border-radius": "4px",
                            "font-weight": "500"
                        }
                    }
                },
                option: {},
                cart: {
                    text: {
                        total: 'Toplam',
                        button: 'Ödeme'
                    },
                    popup: false,
                    styles: {
                        button: {
                            "font-family": "Montserrat, sans-serif",
                            "font-size": "16px",
                            "padding": "16px 32px",
                            "color": "white",
                            ":hover": {
                                "color": "white",
                                "background-color": "#6B3410"
                            },
                            "background-color": "#8B4513",
                            ":focus": {
                                "background-color": "#6B3410"
                            },
                            "border-radius": "4px",
                            "font-weight": "500"
                        }
                    }
                },
                toggle: {
                    styles: {
                        toggle: {
                            "font-family": "Montserrat, sans-serif",
                            "background-color": "#8B4513",
                            ":hover": {
                                "background-color": "#6B3410"
                            },
                            ":focus": {
                                "background-color": "#6B3410"
                            }
                        },
                        count: {
                            "font-size": "16px",
                            "color": "white",
                            ":hover": {
                                "color": "white"
                            }
                        },
                        iconPath: {
                            "fill": "white"
                        }
                    }
                }
            }
        });
    });
}

// Cart Count Update
function updateCartCount(count) {
    const cartCounts = document.querySelectorAll('.cart-count');
    cartCounts.forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'block' : 'none';
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    section.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);