# 🛍️ SOLE PORTOFINO E-TİCARET SİSTEMİ

Lüks İtalyan çanta markası Sole Portofino için hazırlanmış komple e-ticaret çözümü.

## 🚀 Sistem Özellikleri

### 1. **Ana Site** (Müşteriler için)
- Modern, responsive tasarım
- Ürün gösterimi ve detay sayfası
- Shopify Buy Button entegrasyonu
- WhatsApp sipariş desteği
- İletişim formu
- SEO optimize

### 2. **Admin Panel** (Yönetim için)
- Sipariş yönetimi
- Müşteri takibi
- Satış analizleri
- İade yönetimi
- Gerçek zamanlı dashboard

### 3. **Entegrasyonlar**
- **Shopify**: Ödeme ve envanter yönetimi
- **Supabase**: Veritabanı ve authentication
- **Cloudflare Pages**: Hosting ve CDN
- **PayTR**: Türkiye'ye özel ödeme çözümü

## 📁 Dosya Yapısı

```
sole-portofino/
├── sole-portofino-site/        # Ana site
│   ├── index.html             # Ana sayfa
│   ├── css/style.css          # Stiller
│   ├── js/
│   │   ├── app.js            # Ana uygulama
│   │   └── shopify-buy.js    # Shopify entegrasyonu
│   └── images/               # Ürün görselleri
│
└── sole-portofino-admin/      # Admin panel
    ├── index.html            # Giriş sayfası
    ├── dashboard.html        # Yönetim paneli
    ├── css/admin.css        # Admin stilleri
    └── js/
        └── auth.js          # Kimlik doğrulama
```

## 🛠️ Kurulum Adımları

### 1. Shopify Kurulumu

1. **Shopify Hesabı Açın**
   ```
   - shopify.com → Start free trial
   - Mağaza adı: sole-portofino
   - Plan: Shopify Lite ($9/ay) veya Basic ($39/ay)
   ```

2. **Ürün Ekleyin**
   ```
   Products → Add product
   - Title: Sole Portofino Signature Gingham Tote
   - Price: ₺2,999
   - Images: Yükleyin
   - Save
   ```

3. **Buy Button Oluşturun**
   ```
   Sales channels → Buy Button
   Create Buy Button → Select product
   Customize → Copy code
   ```

4. **PayTR Entegrasyonu**
   ```
   Settings → Payments → Third-party providers
   PayTR ekleyin
   API bilgilerini girin
   ```

### 2. Cloudflare Pages Deployment

1. **GitHub'a Yükleyin**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Cloudflare Pages Projesi**
   ```
   dash.cloudflare.com → Pages
   Create a project → Connect to Git
   Select repository
   Build settings:
   - Build command: (boş bırakın)
   - Build output: /
   ```

3. **Custom Domain Bağlama**
   ```
   Project → Custom domains
   Add custom domain → soleportofino.com
   DNS ayarlarını yapın
   ```

4. **Admin Subdomain**
   ```
   Ayrı proje oluşturun: sole-portofino-admin
   Custom domain: admin.soleportofino.com
   ```

### 3. Supabase Kurulumu

1. **Proje Oluşturun**
   ```
   supabase.com → New project
   Project name: sole-portofino
   Database password: Güçlü bir şifre
   Region: Frankfurt (eu-central-1)
   ```

2. **Tabloları Oluşturun**
   ```sql
   -- Orders table
   CREATE TABLE orders (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     order_number TEXT UNIQUE,
     customer_email TEXT,
     customer_name TEXT,
     product_id TEXT,
     quantity INTEGER,
     total_amount DECIMAL,
     status TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Customers table
   CREATE TABLE customers (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     email TEXT UNIQUE,
     name TEXT,
     phone TEXT,
     address TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );

   -- Analytics events
   CREATE TABLE analytics (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     event_type TEXT,
     page_url TEXT,
     user_agent TEXT,
     ip_address TEXT,
     created_at TIMESTAMP DEFAULT NOW()
   );
   ```

3. **Authentication Ayarları**
   ```
   Authentication → Providers → Email
   Enable Email provider
   
   Users → Invite → admin@soleportofino.com
   ```

### 4. Konfigürasyon

1. **Shopify Buy Button** (`js/shopify-buy.js`)
   ```javascript
   const client = ShopifyBuy.buildClient({
     domain: 'YOUR-SHOP.myshopify.com',
     storefrontAccessToken: 'YOUR-TOKEN'
   });
   
   const productId = 'YOUR-PRODUCT-ID';
   ```

2. **Supabase** (`js/auth.js`)
   ```javascript
   const SUPABASE_URL = 'https://YOUR-PROJECT.supabase.co';
   const SUPABASE_ANON_KEY = 'YOUR-ANON-KEY';
   ```

3. **Environment Variables** (Cloudflare Pages)
   ```
   Settings → Environment variables
   - SUPABASE_URL
   - SUPABASE_ANON_KEY
   - SHOPIFY_DOMAIN
   - SHOPIFY_TOKEN
   ```

## 🔧 Özelleştirme

### Renk Değiştirme
```css
/* css/style.css */
:root {
    --primary-color: #8B4513;  /* Ana renk */
    --secondary-color: #DC143C; /* Vurgu rengi */
}
```

### Logo Ekleme
```html
<!-- Metin yerine logo -->
<a href="/" class="logo">
    <img src="images/logo.png" alt="Sole Portofino">
</a>
```

### WhatsApp Numarası
```html
<!-- index.html - Line 168 -->
<a href="https://wa.me/905555555555?text=..." 
```

## 📊 Admin Panel Kullanımı

1. **Giriş**: admin.soleportofino.com
2. **Demo**: admin@soleportofino.com / demo123
3. **Özellikler**:
   - Dashboard: Genel bakış
   - Siparişler: Tüm siparişleri yönet
   - Müşteriler: Müşteri listesi ve detayları
   - Analizler: Detaylı raporlar
   - İadeler: İade talepleri yönetimi

## 🚨 Güvenlik

- Cloudflare Access ile admin panel koruması
- Supabase Row Level Security
- HTTPS zorunlu
- Rate limiting aktif

## 📱 Mobil Uyumluluk

- Tam responsive tasarım
- Touch-friendly arayüz
- Hızlı yükleme süreleri
- PWA desteği eklenebilir

## 🆘 Sorun Giderme

**Site açılmıyor**
- DNS propagasyonunu bekleyin (24 saat)
- Cloudflare SSL ayarlarını kontrol edin

**Shopify Buy Button çalışmıyor**
- Token ve domain bilgilerini kontrol edin
- Ürün ID'sinin doğru olduğundan emin olun

**Admin panele giriş yapamıyorum**
- Supabase'de kullanıcı oluşturduğunuzdan emin olun
- Demo giriş butonunu kullanın

## 📞 Destek

- Email: destek@soleportofino.com
- WhatsApp: +90 555 555 55 55

---

© 2024 Sole Portofino. Tüm hakları saklıdır.