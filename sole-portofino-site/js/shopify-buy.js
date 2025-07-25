// Shopify Buy Button Integration

(function() {
    // Check if Shopify Buy SDK is loaded
    if (!window.ShopifyBuy) {
        console.error('Shopify Buy SDK not loaded');
        return;
    }

    // Initialize Shopify client
    const client = ShopifyBuy.buildClient({
        domain: 'your-shop.myshopify.com', // TODO: Replace with your Shopify domain
        storefrontAccessToken: 'your-storefront-access-token' // TODO: Replace with your token
    });

    // Create UI instance
    const ui = ShopifyBuy.UI.create(client);

    // Product ID from Shopify
    const productId = 'YOUR_PRODUCT_ID'; // TODO: Replace with your product ID

    // Buy Button Configuration
    const options = {
        product: {
            styles: {
                product: {
                    '@media (min-width: 601px)': {
                        'max-width': '100%',
                        'margin-left': '0',
                        'margin-bottom': '50px'
                    }
                },
                button: {
                    'font-family': 'Montserrat, sans-serif',
                    'font-weight': '600',
                    'font-size': '16px',
                    'padding': '16px 48px',
                    'background-color': '#8B4513',
                    'color': 'white',
                    ':hover': {
                        'background-color': '#6B3410'
                    },
                    'border-radius': '4px',
                    'text-transform': 'uppercase',
                    'letter-spacing': '1px',
                    'width': '100%'
                },
                price: {
                    'font-family': 'Montserrat, sans-serif',
                    'font-size': '24px',
                    'color': '#333333',
                    'font-weight': '300'
                },
                compareAt: {
                    'font-family': 'Montserrat, sans-serif',
                    'font-size': '18px',
                    'color': '#999999',
                    'font-weight': '300'
                },
                unitPrice: {
                    'font-family': 'Montserrat, sans-serif',
                    'font-size': '14px',
                    'color': '#666666'
                }
            },
            contents: {
                img: false,
                title: false,
                price: true,
                button: true
            },
            text: {
                button: 'SEPETE EKLE'
            }
        },
        cart: {
            styles: {
                button: {
                    'font-family': 'Montserrat, sans-serif',
                    'font-weight': '600',
                    'font-size': '16px',
                    'padding': '16px',
                    'background-color': '#8B4513',
                    'color': 'white',
                    ':hover': {
                        'background-color': '#6B3410'
                    },
                    'border-radius': '4px',
                    'text-transform': 'uppercase',
                    'letter-spacing': '1px'
                },
                cart: {
                    'background-color': '#FFFFFF'
                },
                footer: {
                    'background-color': '#FFFFFF'
                }
            },
            text: {
                title: 'Sepetiniz',
                total: 'Toplam',
                empty: 'Sepetiniz boş',
                notice: 'Kargo ve vergiler ödeme sırasında hesaplanır.',
                button: 'ÖDEME YAP'
            },
            contents: {
                note: true
            },
            popup: false
        },
        toggle: {
            styles: {
                toggle: {
                    'font-family': 'Montserrat, sans-serif',
                    'background-color': '#8B4513',
                    ':hover': {
                        'background-color': '#6B3410'
                    }
                },
                count: {
                    'font-size': '14px',
                    'color': 'white',
                    'background-color': '#DC143C'
                }
            }
        },
        lineItem: {
            styles: {
                variantTitle: {
                    'color': '#333333',
                    'font-family': 'Montserrat, sans-serif',
                    'font-weight': '500'
                },
                title: {
                    'color': '#333333',
                    'font-family': 'Montserrat, sans-serif',
                    'font-weight': '500'
                },
                price: {
                    'color': '#333333',
                    'font-family': 'Montserrat, sans-serif'
                },
                quantity: {
                    'color': '#333333',
                    'font-family': 'Montserrat, sans-serif'
                }
            }
        }
    };

    // Create the component
    ui.createComponent('product', {
        id: productId,
        node: document.getElementById('product-component-1234567890'),
        moneyFormat: '₺{{amount}}',
        options: options
    });

    // Override cart behavior to integrate with our custom cart
    ui.onReady(() => {
        // Listen for add to cart events
        ui.components.product.forEach(product => {
            product.model.on('addVariantToCart', (variant) => {
                // Update our cart count
                updateCustomCartCount();
            });
        });
    });

    function updateCustomCartCount() {
        // Get cart items from Shopify
        client.checkout.fetch(localStorage.getItem('shopify_checkout_id')).then(checkout => {
            const itemCount = checkout.lineItems.reduce((count, item) => count + item.quantity, 0);
            document.getElementById('cart-count').textContent = itemCount;
        });
    }
})();

// Alternative implementation for manual button
window.shopifyBuyInit = function() {
    const button = document.querySelector('.manual-buy-button');
    if (button) {
        button.addEventListener('click', function() {
            // Redirect to Shopify checkout with product
            window.location.href = 'https://your-shop.myshopify.com/cart/add?id=YOUR_VARIANT_ID&quantity=1';
        });
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', window.shopifyBuyInit);