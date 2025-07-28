# SHOPIFY BUY BUTTON KURULUM KILAVUZU

## 🛒 Shopify Buy Button Nedir?

Shopify Buy Button, kendi web sitenizde Shopify'ın güvenli ödeme altyapısını kullanmanızı sağlar. Müşteriler sitenizden ayrılmadan veya Shopify'ın checkout sayfasına yönlendirilerek güvenle ödeme yapabilir.

## 📋 Gereksinimler

1. **Shopify Lite** planı ($9/ay) veya üstü
2. En az bir ürün eklenmiş Shopify mağazası
3. PayTR veya başka bir ödeme yöntemi entegrasyonu

## 🚀 Adım Adım Kurulum

### 1. Shopify Admin Paneli Ayarları

#### A. Buy Button Channel Ekleme
```
1. Shopify Admin → Apps → Visit Shopify App Store
2. "Buy Button channel" ara
3. "Add app" tıkla (ücretsiz)
4. Uygulamayı yükle
```

#### B. Buy Button Oluşturma
```
1. Shopify Admin → Sales channels → Buy Button
2. "Create a Buy Button" tıkla
3. "Product Buy Button" seç
4. Ürününüzü seçin: "Sole Portofino Signature Gingham Tote"
5. "Select" tıkla
```

### 2. Buy Button Özelleştirme

#### A. Button Görünümü
```javascript
Layout style: Basic
Button style: Add to cart
Button text: "SATIN AL"
Button color: #8B4513
Font: Montserrat
```

#### B. Cart Ayarları
```javascript
Cart type: Modal
Checkout type: Shopify checkout page
Show quantity selector: No
```

#### C. Advanced Settings
```javascript
{
  "product": {
    "iframe": false,
    "variantId": "all",
    "contents": {
      "img": false,
      "imgWithCarousel": false,
      "title": false,
      "variantTitle": false,
      "price": false,
      "description": false,
      "buttonWithQuantity": false,
      "button": true
    }
  }
}
```

### 3. Kodu Web Sitenize Ekleme

#### A. Shopify'dan Kodu Kopyalama
"Generate code" butonuna tıkladıktan sonra size 2 kod parçası verilecek:

**Script (Head'e eklenecek):**
```html
<script type="text/javascript">
/*<![CDATA[*/
(function () {
  var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
  if (window.ShopifyBuy) {
    if (window.ShopifyBuy.UI) {
      ShopifyBuyInit();
    } else {
      loadScript();
    }
  } else {
    loadScript();
  }
  function loadScript() {
    var script = document.createElement('script');
    script.async = true;
    script.src = scriptURL;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
    script.onload = ShopifyBuyInit;
  }
  function ShopifyBuyInit() {
    var client = ShopifyBuy.buildClient({
      domain: 'your-store.myshopify.com',
      storefrontAccessToken: 'your-access-token',
    });
    // Geri kalan kod...
  }
})();
/*]]>*/
</script>
```

**Div (Butonu göstermek istediğiniz yere):**
```html
<div id='product-component-1706123456789'></div>
```

#### B. app.js Dosyasını Güncelleme

`sole-portofino-main/js/app.js` dosyasında şu bölümü bulun ve güncelleyin:

```javascript
// Shopify Buy Button Integration
document.addEventListener('DOMContentLoaded', function() {
    if (window.ShopifyBuy) {
        initializeShopifyBuyButton();
    }
});

function initializeShopifyBuyButton() {
    const client = ShopifyBuy.buildClient({
        domain: 'your-store.myshopify.com', // BURAYA SHOPIFY DOMAIN'İNİZİ YAZIN
        storefrontAccessToken: 'your-storefront-access-token', // BURAYA ACCESS TOKEN'INIZI YAZIN
    });
```

### 4. Storefront Access Token Alma

```
1. Shopify Admin → Apps → Develop apps (alt kısımda)
2. "Create an app" tıkla
3. App adı: "Buy Button Integration"
4. App oluşturduktan sonra → Configuration
5. Storefront API → Configure
6. Storefront API access scopes:
   ✓ unauthenticated_read_product_listings
   ✓ unauthenticated_read_product_inventory
   ✓ unauthenticated_read_checkouts
   ✓ unauthenticated_write_checkouts
7. Save
8. API credentials → Install app
9. Storefront access token'ı kopyala
```

### 5. Product ID Bulma

```
1. Shopify Admin → Products
2. Ürününüze tıklayın
3. URL'den ID'yi alın:
   admin.shopify.com/store/your-store/products/1234567890
   Product ID: 1234567890
```

Veya Shopify Admin API'den:
```javascript
// Browser console'da:
fetch('/admin/api/2024-01/products.json')
  .then(res => res.json())
  .then(data => console.log(data.products[0].id))
```

### 6. PayTR Entegrasyonu

#### A. PayTR'yi Shopify'a Ekleme
```
1. Shopify Admin → Settings → Payments
2. "Add payment methods" → "Search by provider"
3. "PayTR" ara (yoksa "Alternative payment methods")
4. PayTR bilgilerinizi girin:
   - Merchant ID
   - Merchant Key
   - Merchant Salt
5. Test mode: ON (test için)
6. Save
```

#### B. Ödeme Deneyimi
1. Müşteri "Satın Al" butonuna tıklar
2. Shopify checkout sayfası açılır
3. Müşteri bilgilerini girer
4. Ödeme yöntemi olarak "Kredi/Banka Kartı" seçer
5. PayTR ödeme sayfasına yönlendirilir
6. 3D Secure ile ödeme tamamlanır
7. Başarılı sayfasına dönülür

### 7. Test Etme

#### A. Test Kartları (PayTR)
```
Kart No: 4355 0843 5508 4358
Son Kullanma: 12/26
CVV: 000
3D Şifre: a
```

#### B. Test Prosedürü
1. Sitenizi açın
2. Ürün sayfasına gidin
3. "Satın Al" butonuna tıklayın
4. Checkout'ta test bilgileri girin
5. Ödemeyi tamamlayın

### 8. Canlıya Geçiş

1. PayTR test mode: OFF
2. Gerçek API bilgilerini girin
3. SSL sertifikanızın aktif olduğundan emin olun
4. Cloudflare'de payment sayfaları için cache'i kapatın

## 🔧 Sorun Giderme

### Button Görünmüyor
```javascript
// Console'da kontrol edin:
console.log(window.ShopifyBuy); // undefined olmamalı
console.log(document.getElementById('product-component-1706123456789')); // element bulunmalı
```

### CORS Hatası
Shopify Admin → Apps → Your app → API credentials → Allowed redirection URL(s):
```
https://yourdomain.com
https://www.yourdomain.com
https://admin.yourdomain.com
```

### Token Hatası
- Token'ın doğru kopyalandığından emin olun
- Storefront API scopelarını kontrol edin
- App'in install edildiğinden emin olun

## 📊 Analytics

Shopify Admin'den takip edebileceğiniz metrikler:
- Buy Button tıklama sayısı
- Dönüşüm oranı
- Terk edilen sepetler
- Ortalama sipariş değeri

## 🎨 Gelişmiş Özelleştirme

### Özel Stil Ekleme
```javascript
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
    ":hover": {
      "background-color": "#6B3410"
    },
    "background-color": "#8B4513",
    "border-radius": "4px"
  }
}
```

### Türkçe Metinler
```javascript
text: {
  button: 'SATIN AL',
  outOfStock: 'Stokta Yok',
  unavailable: 'Mevcut Değil'
}
```

## ✅ Kontrol Listesi

- [ ] Shopify Lite hesabı açıldı
- [ ] Buy Button channel yüklendi
- [ ] Storefront Access Token alındı
- [ ] Product ID bulundu
- [ ] PayTR entegrasyonu yapıldı
- [ ] Kod web sitesine eklendi
- [ ] Test siparişi verildi
- [ ] Canlıya geçildi

## 📞 Destek

- Shopify Buy Button Docs: https://help.shopify.com/en/manual/online-sales-channels/buy-button
- PayTR Entegrasyon: https://www.paytr.com/entegrasyon/shopify
- Teknik Destek: destek@soleportofino.com

---

**Not:** Bu dokümandaki `your-store.myshopify.com` ve token bilgilerini kendi bilgilerinizle değiştirmeyi unutmayın!