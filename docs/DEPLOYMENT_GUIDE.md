# 🚀 SOLE PORTOFINO - CLOUDFLARE PAGES DEPLOYMENT

## 📋 İKİ PROJE OLUŞTURACAKSINIZ

### 1️⃣ **ANA SİTE** (Müşteriler için)
- **Klasör:** `sole-portofino-site/`
- **Domain:** `soleportofino.com`

### 2️⃣ **ADMIN PANEL** (Yönetim için)  
- **Klasör:** `sole-portofino-admin/`
- **Domain:** `admin.soleportofino.com`

---

## 🛠️ ANA SİTE DEPLOYMENT

### 1. GitHub'a Yükleyin
```bash
cd sole-portofino-site
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO
git push -u origin main
```

### 2. Cloudflare Pages'de Proje Oluşturun
1. **dash.cloudflare.com** → Pages → Create a project
2. **Connect to Git** → GitHub repo seçin
3. **Build settings:**
   - Build command: *(boş bırakın)*
   - Build output directory: `/`

### 3. Environment Variables Ekleyin
**Settings → Environment variables → Add variable**

```
SHOPIFY_DOMAIN = kpycef-cw.myshopify.com
SHOPIFY_STOREFRONT_TOKEN = 67b3c266a0539753364f87c8c3a0310c
SHOPIFY_PRODUCT_ID = 8662728474755
```

### 4. Deploy Edin
**Deployments → Retry deployment**

---

## 🔐 ADMIN PANEL DEPLOYMENT

### 1. GitHub'a Yükleyin
```bash
cd sole-portofino-admin
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_ADMIN_GITHUB_REPO
git push -u origin main
```

### 2. Cloudflare Pages'de Proje Oluşturun
1. **Yeni proje** → Connect to Git
2. **Build settings:** *(aynı - boş bırakın)*

### 3. Environment Variables Ekleyin
```
SUPABASE_URL = https://npfwslczctdocnkyntpf.supabase.co
SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wZndzbGN6Y3Rkb2Nua3ludHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0NjkwNTYsImV4cCI6MjA2OTA0NTA1Nn0.spWst7zB0AqXGpPCW1qfITjKSicRMUsF_3TC8xSJ-H4
```

### 4. Deploy Edin

---

## 🌐 DOMAIN AYARLARI

### Ana Site için:
1. **Custom domains** → Add custom domain
2. `soleportofino.com` ekleyin
3. DNS ayarları otomatik yapılacak

### Admin Panel için:
1. **Custom domains** → Add custom domain
2. `admin.soleportofino.com` ekleyin

---

## ✅ DEPLOY SONRASI KONTROL

### Ana Site Testi:
- ✅ Site açılıyor mu?
- ✅ Ürün görselleri yükleniyor mu?
- ✅ "SEPETE EKLE" butonu çalışıyor mu?
- ✅ Shopify checkout'a gidiyor mu?

### Admin Panel Testi:
- ✅ Login sayfası açılıyor mu?
- ✅ Demo giriş çalışıyor mu?
- ✅ Dashboard yükleniyor mu?

---

## ⚠️ ÖNEMLİ NOTLAR

1. **_worker.js dosyaları otomatik çalışacak** (manuel eklemeye gerek yok)
2. **Environment variables'ı doğru girdiğinizden emin olun**
3. **İlk deploy 2-3 dakika sürebilir**
4. **SSL sertifikası otomatik gelecek**

---

## 🆘 SORUN GİDERME

**"Environment variables not set" hatası:**
- Settings → Environment variables kontrol edin
- Deploy'u yeniden başlatın

**Site açılmıyor:**
- DNS propagasyonu 24 saat sürebilir
- Cloudflare DNS kayıtlarını kontrol edin

**Shopify butonu görünmüyor:**
- Console'da hata var mı kontrol edin
- Environment variables'ı tekrar girin

---

**HEPSI BU KADAR! 🎉**