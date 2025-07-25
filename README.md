# 🛍️ SOLE PORTOFINO E-COMMERCE PLATFORM

Lüks İtalyan el çantası markası Sole Portofino için modern e-ticaret çözümü. Cloudflare Pages, Shopify Buy Button ve Supabase entegrasyonu ile tam donanımlı platform.

## 🚀 Özellikler

- ✅ **Cloudflare Pages Hosting** - Global CDN ile hızlı yükleme
- ✅ **Shopify Buy Button** - Güvenli ödeme altyapısı
- ✅ **PayTR Entegrasyonu** - Türkiye'ye özel ödeme çözümü
- ✅ **Admin Panel** - Supabase ile yönetim sistemi
- ✅ **Tam Responsive Tasarım** - Tüm cihazlarda mükemmel görünüm
- ✅ **SEO Optimize** - Arama motorları için hazır
- ✅ **WhatsApp Entegrasyonu** - Alternatif sipariş yöntemi
- ✅ **Türkçe İçerik** - Tamamen Türkçe arayüz

## 📁 Proje Yapısı

```
sole-portofino/
├── sole-portofino-main/      # Ana müşteri sitesi (Cloudflare Pages)
│   ├── index.html           # Ana sayfa
│   ├── css/style.css        # Stiller
│   ├── js/app.js            # JavaScript + Shopify Buy Button
│   ├── images/              # Ürün görselleri
│   └── _headers             # Cloudflare cache ayarları
│
├── sole-portofino-admin/     # Admin panel (subdomain)
│   ├── index.html           # Giriş sayfası
│   ├── dashboard.html       # Yönetim paneli
│   ├── css/admin.css        # Admin stilleri
│   └── js/                  # Supabase entegrasyonu
│
├── fotos/                    # Orijinal ürün fotoğrafları
├── product-data.json         # Shopify ürün bilgileri
│
├── DEPLOYMENT_GUIDE.md      # Detaylı kurulum kılavuzu
├── SHOPIFY_BUY_BUTTON_KURULUM.md  # Shopify entegrasyon kılavuzu
└── README.md                # Bu dosya
```

## 🛠️ Hızlı Kurulum

### 1. Cloudflare Pages Deployment

#### Ana Site (soleportofino.com)
```bash
# GitHub'a yükle
cd sole-portofino-main
git init
git add .
git commit -m "Initial commit"
git push

# Cloudflare Pages'de bağla
# 1. Cloudflare Dashboard → Pages
# 2. Connect to Git → GitHub
# 3. Repository seç ve deploy
```

#### Admin Panel (admin.soleportofino.com)
```bash
cd sole-portofino-admin
# Aynı adımları tekrarla
```

### 2. Shopify Buy Button Entegrasyonu

1. **Shopify Lite** hesabı aç ($9/ay)
2. Ürünü ekle (product-data.json kullan)
3. Buy Button oluştur
4. `app.js` içinde güncelle:

```javascript
const client = ShopifyBuy.buildClient({
    domain: 'your-store.myshopify.com',
    storefrontAccessToken: 'your-token'
});
```

Detaylı kurulum: [SHOPIFY_BUY_BUTTON_KURULUM.md](./SHOPIFY_BUY_BUTTON_KURULUM.md)

### 3. Supabase Admin Panel

1. [Supabase.com](https://supabase.com) hesabı aç
2. Yeni proje oluştur
3. SQL tablolarını oluştur (DEPLOYMENT_GUIDE.md'de)
4. API anahtarlarını `auth.js` dosyasına ekle

### 4. PayTR Ödeme Entegrasyonu

1. Shopify Admin → Settings → Payments
2. Third-party provider → PayTR
3. API bilgilerini gir:
   - Merchant ID
   - Merchant Key
   - Merchant Salt

### 5. WhatsApp Numarası Güncelleme

`sole-portofino-main/index.html` dosyasında:

```html
<a href="https://wa.me/905551234567?text=..." 
```

### 6. Domain Ayarları

Cloudflare'de otomatik DNS ayarları:
- `soleportofino.com` → Ana site
- `admin.soleportofino.com` → Admin panel

## 📱 Mobil Uyumluluk

Site tamamen responsive tasarlanmıştır:
- **Desktop**: 1200px ve üzeri
- **Tablet**: 768px - 1199px
- **Mobile**: 767px ve altı

## 🔒 Güvenlik

- SSL sertifikası kullanmanız önerilir
- Ödeme işlemleri için güvenilir payment gateway kullanın
- Form verilerini backend'de doğrulayın

## 💳 Test Kartları

Ödeme sistemini test etmek için:

**Iyzico Test Kartı:**
- Kart No: 5528790000000008
- SKT: 12/30
- CVV: 123

**PayTR Test Kartı:**
- Kart No: 4355084355084358
- SKT: 12/26
- CVV: 000

## 🚨 Önemli Notlar

1. **LocalStorage Desteği**: Sepet verileri tarayıcıda saklanır
2. **Ödeme Güvenliği**: Gerçek ödemeler için mutlaka SSL kullanın
3. **Backup**: Düzenli yedekleme yapın
4. **Analytics**: Google Analytics eklemeyi unutmayın

## 💳 Ödeme Sistemi

**PayTR + Shopify Checkout**
- Tüm Türk bankaları desteği
- 3D Secure güvenlik
- 12 aya kadar taksit
- Mobil ödeme desteği

## 📊 Admin Panel Özellikleri

**URL:** admin.soleportofino.com

- **Dashboard:** Anlık satış özeti
- **Siparişler:** Sipariş yönetimi ve takibi
- **Müşteriler:** Müşteri veritabanı
- **Analizler:** Detaylı satış raporları
- **İadeler:** İade yönetimi

**Güvenlik:** Cloudflare Access + Supabase RLS

## 🛠️ Teknoloji Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **E-commerce:** Shopify Buy Button SDK
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Cloudflare Pages
- **CDN:** Cloudflare Global Network
- **Payment:** PayTR via Shopify
- **Analytics:** Cloudflare Analytics

## 📞 Destek

- **Teknik Destek:** destek@soleportofino.com
- **Dokümantasyon:** 
  - [Deployment Guide](./DEPLOYMENT_GUIDE.md)
  - [Shopify Buy Button Setup](./SHOPIFY_BUY_BUTTON_KURULUM.md)

## ✅ Launch Checklist

- [ ] Cloudflare hesabı açıldı
- [ ] Domain satın alındı
- [ ] GitHub repo'ları oluşturuldu
- [ ] Cloudflare Pages deploy edildi
- [ ] Shopify Lite hesabı açıldı
- [ ] Ürün Shopify'a eklendi
- [ ] Buy Button entegre edildi
- [ ] PayTR bağlandı
- [ ] Supabase kuruldu
- [ ] Admin panel aktif
- [ ] SSL sertifikası aktif
- [ ] Test siparişi verildi
- [ ] Canlıya geçildi

## 🎨 Özelleştirme

### Renkleri Değiştirme
`sole-portofino-main/css/style.css`:
```css
:root {
    --primary-color: #8B4513;
    --secondary-color: #DC143C;
}
```

### Shopify Ürün Güncelleme
1. Shopify Admin → Products
2. Bilgileri güncelle
3. Buy Button otomatik güncellenir

---

**Geliştirici:** Claude AI Assistant  
**Tarih:** Ocak 2024  
**Versiyon:** 2.0.0

**Başarılı satışlar dilerim!** 🛍️