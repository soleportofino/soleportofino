# 🔐 Cloudflare Pages Environment Variables Kurulum Rehberi

## Supabase Entegrasyonu İçin Güvenli Yapılandırma

### 1. **Cloudflare Pages'de Environment Variables Ekleme**

1. [Cloudflare Dashboard](https://dash.cloudflare.com)'a giriş yapın
2. **Pages** → Projenizi seçin
3. **Settings** → **Environment variables**
4. **Add variable** butonuna tıklayın

### 2. **Eklenecek Environment Variables**

#### Admin Panel için (sole-portofino-admin):
```
SUPABASE_URL = https://npfwslczctdocnkyntpf.supabase.co
SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wZndzbGN6Y3Rkb2Nua3ludHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NjkwNTYsImV4cCI6MjA2OTA0NTA1Nn0.spWst7zB0AqXGpPCW1qfITjKSicRMUsF_3TC8xSJ-H4
```

#### Ana Site için (sole-portofino-site):
```
SHOPIFY_DOMAIN = kpycef-cw.myshopify.com
SHOPIFY_STOREFRONT_TOKEN = 67b3c266a0539753364f87c8c3a0310c
SHOPIFY_PRODUCT_ID = 8662728474755
```

**ÖNEMLİ:** Service role key'i ASLA client-side kodda kullanmayın!

### 3. **Admin Panel Projesi İçin Özel Ayarlar**

Admin panel ayrı bir Cloudflare Pages projesi olarak kurulacak:

1. **Yeni proje oluşturun:** `sole-portofino-admin`
2. **Git repository:** `sole-portofino-admin` klasörünü ayrı repo yapın
3. **Build settings:**
   - Build command: (boş bırakın)
   - Build output directory: `/`
   - Root directory: `/`

### 4. **_worker.js Dosyası Kullanımı**

Her iki projede de `_worker.js` dosyaları environment variable'ları güvenli şekilde inject eder:

**Admin Panel** (`sole-portofino-admin/_worker.js`):
```javascript
// auth.js içindeki placeholder'ları değiştirir
// __SUPABASE_URL__ → gerçek URL
// __SUPABASE_ANON_KEY__ → gerçek key
```

**Ana Site** (`sole-portofino-site/_worker.js`):
```javascript
// shopify-buy.js içindeki placeholder'ları değiştirir
// __SHOPIFY_DOMAIN__ → gerçek domain
// __SHOPIFY_STOREFRONT_TOKEN__ → gerçek token
// __SHOPIFY_PRODUCT_ID__ → gerçek product ID
```

### 5. **Deployment Sonrası Kontrol**

1. **Browser Console'da kontrol edin:**
   ```javascript
   // Eğer düzgün yüklendiyse bu mesajı GÖRMEMELİSİNİZ:
   "Environment variables not set. Using demo mode."
   ```

2. **Network tab'da kontrol:**
   - `auth.js` dosyasının içinde `__SUPABASE_URL__` yerine gerçek URL'i görmelisiniz

### 6. **Güvenlik Önlemleri**

✅ **YAPILMASI GEREKENLER:**
- Environment variables'ı sadece Cloudflare dashboard'dan ekleyin
- Admin panel'i ayrı subdomain'de barındırın (`admin.soleportofino.com`)
- Cloudflare Access ile ekstra güvenlik ekleyin

❌ **YAPILMAMASI GEREKENLER:**
- Service role key'i client-side kodda kullanmayın
- Environment variables'ı GitHub'a commit etmeyin
- Gerçek key'leri kod içinde yazmayın

### 7. **Local Development**

Local'de çalışırken:

1. **Wrangler kullanın:**
   ```bash
   npm install -D wrangler
   npx wrangler pages dev . --compatibility-date=2023-05-18
   ```

2. **.dev.vars dosyası oluşturun:** (GİTİGNORE'A EKLEYİN!)
   ```
   SUPABASE_URL=https://npfwslczctdocnkyntpf.supabase.co
   SUPABASE_ANON_KEY=your_key_here
   ```

### 8. **Troubleshooting**

**Problem: "Environment variables not set" hatası**
- Çözüm: Cloudflare dashboard'da variables'ları kontrol edin
- Deploy'dan sonra cache temizleyin

**Problem: Authentication çalışmıyor**
- Çözüm: Supabase dashboard'da email authentication'ın aktif olduğunu kontrol edin
- Admin kullanıcı oluşturun: `INSERT INTO auth.users...`

### 9. **Supabase'de Admin Kullanıcı Oluşturma**

SQL Editor'de çalıştırın:
```sql
-- Önce auth.users tablosuna kullanıcı ekleyin
INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES (
    'admin@soleportofino.com',
    crypt('güvenli_şifreniz', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW()
);
```

### 10. **Deployment Checklist**

- [ ] Environment variables Cloudflare'de tanımlı
- [ ] _worker.js dosyası mevcut
- [ ] Admin subdomain DNS ayarları yapıldı
- [ ] Supabase'de admin kullanıcı oluşturuldu
- [ ] SSL sertifikası aktif
- [ ] Demo login butonu production'da gizli

---

**NOT:** Bu dokümandaki gerçek key'ler sadece sizin kullanımınız içindir. Başka kimseyle paylaşmayın!