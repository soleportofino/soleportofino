# 🚀 SOLE PORTOFINO KOMPLE DEPLOYMENT KILAVUZU

## 📁 Proje Yapısı

```
sole-portofino/
├── sole-portofino-main/      # Ana müşteri sitesi
├── sole-portofino-admin/     # Admin panel (subdomain)
├── fotos/                    # Ürün görselleri
├── product-data.json         # Ürün bilgileri
├── SHOPIFY_BUY_BUTTON_KURULUM.md
└── DEPLOYMENT_GUIDE.md       # Bu dosya
```

## 1️⃣ CLOUDFLARE HESAP KURULUMU

### A. Cloudflare Hesabı
1. [cloudflare.com](https://cloudflare.com) → Sign up
2. Email doğrulama
3. Plan seçimi: Free (başlangıç için yeterli)

### B. Domain Satın Alma
1. Cloudflare Dashboard → Domain Registration
2. Domain ara: `soleportofino.com`
3. Satın al (~$10/yıl)
4. Whois privacy: Ücretsiz dahil

## 2️⃣ CLOUDFLARE PAGES KURULUMU

### A. Ana Site (soleportofino.com)

#### 1. GitHub'a Yükleme
```bash
# GitHub'da yeni repo oluştur: sole-portofino-main

# Lokal'de:
cd sole-portofino-main
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/sole-portofino-main.git
git push -u origin main
```

#### 2. Cloudflare Pages Bağlantısı
1. Cloudflare Dashboard → Pages
2. "Create a project" → "Connect to Git"
3. GitHub hesabını bağla
4. Repository seç: `sole-portofino-main`
5. Build settings:
   - Build command: (boş bırak)
   - Build output directory: `/`
   - Root directory: `/`
6. "Save and Deploy"

#### 3. Custom Domain Bağlama
1. Project → Settings → Custom domains
2. "Add custom domain"
3. `soleportofino.com` girin
4. DNS kayıtları otomatik eklenir

### B. Admin Panel (admin.soleportofino.com)

#### 1. GitHub'a Yükleme
```bash
# GitHub'da yeni repo: sole-portofino-admin

cd sole-portofino-admin
git init
git add .
git commit -m "Admin panel initial commit"
git remote add origin https://github.com/YOUR_USERNAME/sole-portofino-admin.git
git push -u origin main
```

#### 2. Cloudflare Pages
1. Yeni proje oluştur
2. `sole-portofino-admin` repo'yu seç
3. Aynı build settings
4. Deploy

#### 3. Subdomain Ekleme
1. Custom domain: `admin.soleportofino.com`
2. Otomatik DNS kaydı

## 3️⃣ SUPABASE KURULUMU

### A. Hesap ve Proje
1. [supabase.com](https://supabase.com) → Start your project
2. GitHub ile giriş
3. New project:
   - Name: `sole-portofino`
   - Password: Güçlü şifre
   - Region: Frankfurt (EU)

### B. Database Tabloları

SQL Editor'de çalıştırın:

```sql
-- Müşteriler tablosu
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    shopify_customer_id BIGINT
);

-- Siparişler tablosu
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id),
    total_amount DECIMAL(10,2),
    status VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    shopify_order_id BIGINT,
    tracking_number VARCHAR(100),
    notes TEXT
);

-- İadeler tablosu
CREATE TABLE returns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id),
    reason TEXT,
    status VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Analytics events
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(50),
    page_url TEXT,
    user_agent TEXT,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- İlk admin kullanıcı
INSERT INTO admin_users (email) VALUES ('admin@soleportofino.com');
```

### C. Row Level Security (RLS)

```sql
-- RLS'i etkinleştir
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE returns ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Admin policy
CREATE POLICY "Admin users can view all" ON orders
    FOR ALL USING (
        auth.jwt() ->> 'email' IN (
            SELECT email FROM admin_users
        )
    );
```

### D. API Keys
1. Settings → API
2. Kopyala:
   - `anon public` key
   - `service_role` key (gizli!)
   - Project URL

## 4️⃣ ENVIRONMENT VARIABLES

### A. Cloudflare Pages (Ana Site)

Settings → Environment variables:

```
SHOPIFY_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=your-token
SHOPIFY_PRODUCT_ID=1234567890
```

### B. Cloudflare Pages (Admin)

```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_KEY=eyJhbGc... (Production only)
```

## 5️⃣ SHOPIFY KURULUMU

### A. Shopify Lite
1. Shopify.com → Pricing → Shopify Lite ($9/ay)
2. Hesap oluştur

### B. Ürün Ekleme
1. Products → Add product
2. `product-data.json` dosyasındaki bilgileri gir
3. Görselleri yükle

### C. Buy Button
[SHOPIFY_BUY_BUTTON_KURULUM.md](./SHOPIFY_BUY_BUTTON_KURULUM.md) dosyasını takip edin

### D. PayTR Entegrasyonu
1. Settings → Payments
2. Third-party providers → PayTR
3. API bilgilerini gir

## 6️⃣ DOSYA GÜNCELLEMELERİ

### A. Ana Site (app.js)
```javascript
// Shopify bilgilerini güncelle
domain: 'your-store.myshopify.com',
storefrontAccessToken: 'your-actual-token',
id: 'YOUR_PRODUCT_ID'
```

### B. Admin Panel (auth.js)
```javascript
// Supabase bilgilerini güncelle
const SUPABASE_URL = 'https://xxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGc...';
```

## 7️⃣ CLOUDFLARE GÜVENLİK

### A. Ana Site
Herkes erişebilir - güvenlik ayarı yok

### B. Admin Panel

1. Zero Trust → Access → Applications
2. "Add an application" → Self-hosted
3. Configure:
   - Name: Sole Portofino Admin
   - Domain: `admin.soleportofino.com`
4. Policy:
   - Name: Admin Access
   - Action: Allow
   - Include: Emails ending in `@soleportofino.com`
5. Save

## 8️⃣ DEPLOYMENT

### A. Değişiklik Yapma
```bash
# Ana site güncellemesi
cd sole-portofino-main
# Değişiklikleri yap
git add .
git commit -m "Update: description"
git push

# Cloudflare Pages otomatik deploy eder
```

### B. Monitoring
1. Cloudflare Analytics
2. Supabase Dashboard
3. Shopify Analytics

## 9️⃣ SSL & GÜVENLIK

### Otomatik Ayarlar
- ✅ SSL: Cloudflare otomatik
- ✅ HTTPS redirect: Otomatik
- ✅ HSTS: Cloudflare'de etkin

### Ekstra Güvenlik
1. Cloudflare → Security → WAF
2. Security Level: Medium
3. Bot Fight Mode: ON

## 🧪 TEST

### 1. Ana Site Testi
- [ ] https://soleportofino.com açılıyor
- [ ] Ürün görselleri yükleniyor
- [ ] Buy Button çalışıyor
- [ ] Mobil responsive
- [ ] Form gönderimi

### 2. Admin Panel Testi
- [ ] https://admin.soleportofino.com açılıyor
- [ ] Login çalışıyor
- [ ] Dashboard yükleniyor
- [ ] Güvenlik (sadece yetkili email)

### 3. E2E Test
- [ ] Ürün satın alma
- [ ] PayTR ödeme
- [ ] Admin'de sipariş görme

## 🚨 TROUBLESHOOTING

### "Page not found"
- Build output directory: `/` olmalı
- index.html root'ta olmalı

### "Shopify button not showing"
- Console'da hata kontrol et
- Token ve domain doğru mu?
- CORS izinleri?

### "Supabase connection failed"
- API keys doğru mu?
- RLS policies aktif mi?
- Network tab'da 401 hatası?

## 📱 DESTEK

### Cloudflare
- Status: cloudflarestatus.com
- Support: support.cloudflare.com

### Shopify
- Status: status.shopify.com
- Help: help.shopify.com

### Supabase
- Status: status.supabase.com
- Discord: discord.supabase.com

## ✅ LAUNCH CHECKLIST

- [ ] Domain aktif
- [ ] SSL çalışıyor
- [ ] Ana site yayında
- [ ] Admin panel güvenli
- [ ] Shopify ürün eklendi
- [ ] Buy Button entegre
- [ ] PayTR aktif
- [ ] Supabase bağlı
- [ ] Test siparişi başarılı
- [ ] Analytics aktif

## 🎉 TEBRİKLER!

Siteniz hazır! 

Ana site: https://soleportofino.com
Admin panel: https://admin.soleportofino.com

İlk 48 saat içinde DNS propagasyonu tamamlanacaktır.

---

**Not:** Tüm `your-` ile başlayan değerleri gerçek bilgilerinizle değiştirin!