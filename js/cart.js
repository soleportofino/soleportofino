// Sole Portofino - Cart Management

// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem('solePortofinoCart')) || [];

// Initialize cart page
document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    updateCartTotals();
});

// Display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <h3>Sepetiniz Boş</h3>
                <p>Henüz sepetinize ürün eklemediniz.</p>
                <a href="index.html" class="continue-shopping">Alışverişe Başla</a>
            </div>
        `;
        document.querySelector('.cart-summary').style.display = 'none';
        return;
    }
    
    let cartHTML = '';
    cart.forEach((item, index) => {
        cartHTML += `
            <div class="cart-item">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="item-sku">Ürün Kodu: ${item.id}</p>
                </div>
                <div class="item-quantity">
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${index}, -1)">-</button>
                        <input type="number" value="${item.quantity}" min="1" max="10" onchange="setQuantity(${index}, this.value)">
                        <button onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="item-price">
                    <span class="price">₺${(item.price * item.quantity).toLocaleString('tr-TR')}</span>
                    <span class="unit-price">₺${item.price.toLocaleString('tr-TR')} / adet</span>
                </div>
                <div class="item-remove">
                    <button onclick="removeItem(${index})" class="remove-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = cartHTML;
}

// Update quantity
function updateQuantity(index, change) {
    const newQuantity = cart[index].quantity + change;
    
    if (newQuantity >= 1 && newQuantity <= 10) {
        cart[index].quantity = newQuantity;
        saveCart();
        displayCartItems();
        updateCartTotals();
    }
}

// Set quantity directly
function setQuantity(index, value) {
    const quantity = parseInt(value);
    
    if (quantity >= 1 && quantity <= 10) {
        cart[index].quantity = quantity;
        saveCart();
        displayCartItems();
        updateCartTotals();
    }
}

// Remove item from cart
function removeItem(index) {
    if (confirm('Bu ürünü sepetinizden kaldırmak istediğinize emin misiniz?')) {
        cart.splice(index, 1);
        saveCart();
        displayCartItems();
        updateCartTotals();
        updateCartCount();
    }
}

// Clear entire cart
function clearCart() {
    if (confirm('Sepetinizi tamamen boşaltmak istediğinize emin misiniz?')) {
        cart = [];
        saveCart();
        displayCartItems();
        updateCartTotals();
        updateCartCount();
    }
}

// Update cart totals
function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 500 ? 0 : 30; // Free shipping over 500 TL
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `₺${subtotal.toLocaleString('tr-TR')}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'Ücretsiz' : `₺${shipping}`;
    document.getElementById('total').textContent = `₺${total.toLocaleString('tr-TR')}`;
    
    // Show free shipping message
    const freeShippingMsg = document.getElementById('freeShippingMsg');
    if (subtotal < 500 && subtotal > 0) {
        const remaining = 500 - subtotal;
        freeShippingMsg.style.display = 'block';
        freeShippingMsg.innerHTML = `<i class="fas fa-truck"></i> Ücretsiz kargo için <strong>₺${remaining}</strong> değerinde daha alışveriş yapın!`;
    } else {
        freeShippingMsg.style.display = 'none';
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('solePortofinoCart', JSON.stringify(cart));
}

// Update cart count in header
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Apply coupon code
function applyCoupon() {
    const couponInput = document.getElementById('couponCode');
    const couponCode = couponInput.value.trim().toUpperCase();
    
    // Example coupon codes
    const coupons = {
        'WELCOME10': 0.10,
        'SUMMER20': 0.20
    };
    
    if (coupons[couponCode]) {
        alert(`${(coupons[couponCode] * 100)}% indirim kuponu uygulandı!`);
        // Here you would apply the discount
    } else {
        alert('Geçersiz kupon kodu!');
    }
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Sepetiniz boş!');
        return;
    }
    
    // Save cart data for checkout page
    sessionStorage.setItem('checkoutData', JSON.stringify({
        cart: cart,
        totals: {
            subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            shipping: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) >= 500 ? 0 : 30
        }
    }));
    
    window.location.href = 'checkout.html';
}