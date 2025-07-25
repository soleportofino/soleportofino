// Sole Portofino Admin Authentication

// Supabase configuration
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // TODO: Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // TODO: Replace with your Supabase anon key

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Check if user is already logged in
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
        // Redirect to dashboard if already logged in
        window.location.href = 'dashboard.html';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Handle login
async function handleLogin(e) {
    e.preventDefault();
    
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const remember = form.remember.checked;
    
    const submitButton = form.querySelector('.login-button');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoading = submitButton.querySelector('.button-loading');
    const errorMessage = document.getElementById('error-message');
    
    // Show loading state
    submitButton.disabled = true;
    buttonText.style.display = 'none';
    buttonLoading.style.display = 'inline-flex';
    errorMessage.style.display = 'none';
    
    try {
        // Attempt to sign in
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        
        if (error) throw error;
        
        // Store remember preference
        if (remember) {
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('rememberMe');
        }
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
        
    } catch (error) {
        // Show error message
        errorMessage.textContent = getErrorMessage(error);
        errorMessage.style.display = 'block';
        
        // Reset button state
        submitButton.disabled = false;
        buttonText.style.display = 'inline';
        buttonLoading.style.display = 'none';
    }
}

// Get user-friendly error message
function getErrorMessage(error) {
    if (error.message.includes('Invalid login credentials')) {
        return 'E-posta veya şifre hatalı. Lütfen tekrar deneyin.';
    } else if (error.message.includes('Email not confirmed')) {
        return 'E-posta adresinizi doğrulamanız gerekiyor.';
    } else if (error.message.includes('Network')) {
        return 'İnternet bağlantınızı kontrol edin.';
    } else {
        return 'Bir hata oluştu. Lütfen tekrar deneyin.';
    }
}

// Demo login (for testing without Supabase)
window.demoLogin = function() {
    const email = 'admin@soleportofino.com';
    const password = 'demo123';
    
    // Simulate login
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('loginTime', new Date().toISOString());
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
};

// Add demo login button if Supabase is not configured
if (!SUPABASE_URL.includes('supabase.co')) {
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.querySelector('.login-form');
        if (form) {
            const demoButton = document.createElement('button');
            demoButton.type = 'button';
            demoButton.className = 'login-button';
            demoButton.style.marginTop = '10px';
            demoButton.style.background = '#6C757D';
            demoButton.textContent = 'Demo Giriş';
            demoButton.onclick = window.demoLogin;
            
            form.appendChild(demoButton);
            
            // Add demo credentials hint
            const hint = document.createElement('p');
            hint.style.textAlign = 'center';
            hint.style.marginTop = '10px';
            hint.style.color = '#6C757D';
            hint.style.fontSize = '12px';
            hint.innerHTML = 'Demo: admin@soleportofino.com / demo123';
            form.appendChild(hint);
        }
    });
}