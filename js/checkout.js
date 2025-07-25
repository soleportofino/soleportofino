// Sole Portofino - Checkout Management

// Get checkout data from session storage
const checkoutData = JSON.parse(sessionStorage.getItem('checkoutData')) || null;

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    if (!checkoutData || !checkoutData.cart || checkoutData.cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    displayOrderSummary();
    setupFormValidation();
    setupPaymentMethodHandlers();
    updateCartCount();
});

// Display order summary
function displayOrderSummary() {
    const orderItemsContainer = document.getElementById('orderItems');
    let itemsHTML = '';
    
    checkoutData.cart.forEach(item => {
        itemsHTML += `
            <div class="order-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="order-item-details">
                    <h4>${item.name}</h4>
                    <p>Adet: ${item.quantity} x ₺${item.price.toLocaleString('tr-TR')}</p>
                </div>
            </div>
        `;
    });
    
    orderItemsContainer.innerHTML = itemsHTML;
    
    // Update totals
    const subtotal = checkoutData.totals.subtotal;
    const shipping = checkoutData.totals.shipping;
    const total = subtotal + shipping;
    
    document.getElementById('orderSubtotal').textContent = `₺${subtotal.toLocaleString('tr-TR')}`;
    document.getElementById('orderShipping').textContent = shipping === 0 ? 'Ücretsiz' : `₺${shipping}`;
    document.getElementById('orderTotal').textContent = `₺${total.toLocaleString('tr-TR')}`;
}

// Setup form validation
function setupFormValidation() {
    const form = document.getElementById('checkoutForm');
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + ' ' + value.slice(3);
            } else if (value.length <= 8) {
                value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6);
            } else {
                value = value.slice(0, 3) + ' ' + value.slice(3, 6) + ' ' + value.slice(6, 8) + ' ' + value.slice(8, 10);
            }
        }
        this.value = value;
    });
    
    // Credit card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    cardNumberInput.addEventListener('input', function() {
        let value = this.value.replace(/\s/g, '');
        let formattedValue = '';
        
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        this.value = formattedValue;
    });
    
    // Expiry date formatting
    const expiryInput = document.getElementById('expiryDate');
    expiryInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        this.value = value;
    });
    
    // CVV input - numbers only
    const cvvInput = document.getElementById('cvv');
    cvvInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '');
    });
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Bu alan zorunludur');
        return false;
    }
    
    // Email validation
    if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Geçerli bir e-posta adresi giriniz');
            return false;
        }
    }
    
    // Phone validation
    if (fieldName === 'phone') {
        const phoneRegex = /^[\d\s]+$/;
        if (!phoneRegex.test(value) || value.replace(/\s/g, '').length < 10) {
            showFieldError(field, 'Geçerli bir telefon numarası giriniz');
            return false;
        }
    }
    
    clearFieldError(field);
    return true;
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('error');
    
    const errorElement = document.createElement('span');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--secondary-color)';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.style.display = 'block';
    
    field.parentElement.appendChild(errorElement);
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('error');
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Setup payment method handlers
function setupPaymentMethodHandlers() {
    const creditCardForm = document.getElementById('creditCardForm');
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            if (this.value === 'credit-card') {
                creditCardForm.style.display = 'block';
                creditCardForm.querySelectorAll('input').forEach(input => {
                    input.setAttribute('required', '');
                });
            } else {
                creditCardForm.style.display = 'none';
                creditCardForm.querySelectorAll('input').forEach(input => {
                    input.removeAttribute('required');
                });
            }
        });
    });
}

// Select payment method
function selectPaymentMethod(method) {
    document.querySelectorAll('.payment-method').forEach(el => {
        el.classList.remove('selected');
    });
    
    const selectedMethod = document.querySelector(`input[value="${method}"]`);
    selectedMethod.checked = true;
    selectedMethod.closest('.payment-method').classList.add('selected');
    
    // Trigger change event
    selectedMethod.dispatchEvent(new Event('change'));
}

// Place order
async function placeOrder() {
    const form = document.getElementById('checkoutForm');
    const termsCheckbox = document.getElementById('terms');
    
    // Check terms acceptance
    if (!termsCheckbox.checked) {
        alert('Lütfen satış sözleşmesini kabul ediniz.');
        termsCheckbox.focus();
        return;
    }
    
    // Validate all required fields
    const requiredFields = form.querySelectorAll('input[required]:not([type="checkbox"]), select[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        alert('Lütfen tüm zorunlu alanları doldurunuz.');
        return;
    }
    
    // Disable button to prevent double submission
    const orderButton = document.querySelector('.place-order-btn');
    orderButton.disabled = true;
    orderButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> İşleniyor...';
    
    // Simulate order processing
    setTimeout(() => {
        // Generate order number
        const orderNumber = 'SP' + new Date().getFullYear() + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        
        // Clear cart
        localStorage.removeItem('solePortofinoCart');
        sessionStorage.removeItem('checkoutData');
        
        // Show success modal
        document.getElementById('orderNumber').textContent = '#' + orderNumber;
        document.getElementById('successModal').style.display = 'block';
        
        // Log order data (normally would send to server)
        console.log('Order placed:', {
            orderNumber: orderNumber,
            customer: {
                email: document.getElementById('email').value,
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                phone: document.getElementById('phone').value
            },
            shipping: {
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                district: document.getElementById('district').value,
                zipCode: document.getElementById('zipCode').value
            },
            paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
            items: checkoutData.cart,
            totals: {
                subtotal: checkoutData.totals.subtotal,
                shipping: checkoutData.totals.shipping,
                total: checkoutData.totals.subtotal + checkoutData.totals.shipping
            }
        });
    }, 2000);
}

// Add CSS for error states
const style = document.createElement('style');
style.textContent = `
    input.error,
    select.error {
        border-color: var(--secondary-color) !important;
    }
    
    .field-error {
        color: var(--secondary-color);
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    }
`;
document.head.appendChild(style);