# 🔄 Cloudflare Cache Temizleme Rehberi

## ⚡ Hızlı Çözüm (Önerilen)

1. **Cloudflare Dashboard'a giriş yapın**
   - https://dash.cloudflare.com

2. **Domain'inizi seçin**
   - `soleportofino.com`

3. **Caching > Configuration**

4. **"Purge Everything" butonuna tıklayın**
   - Confirm

## 📱 Alternatif: Selective Purge

Sadece admin paneli temizlemek için:

1. **Caching > Configuration**
2. **"Custom Purge"**
3. URL'leri girin:
   ```
   https://admin.soleportofino.com/
   https://admin.soleportofino.com/index.html
   https://admin.soleportofino.com/dashboard.html
   https://admin.soleportofino.com/js/auth-common.js
   https://admin.soleportofino.com/js/auth-login.js
   https://admin.soleportofino.com/js/dashboard.js
   ```

## 🔍 Cache Durumunu Kontrol

Browser Developer Tools (F12):
1. Network tab'ı açın
2. Sayfayı yenileyin
3. JS dosyalarına tıklayın
4. Response Headers'da kontrol edin:
   - `cf-cache-status: HIT` = Cached (eski)
   - `cf-cache-status: MISS` = Fresh (yeni)

## ⏱️ Bekleme Süresi

- Purge sonrası 30 saniye - 2 dakika bekleyin
- Hard refresh yapın (Ctrl+F5)

## 🚨 Önemli

Version 1.1 debug loglarını görmüyorsanız:
```
🔵 AUTH-COMMON.JS loaded - Version: 1.1
🟢 AUTH-LOGIN.JS loaded - Version: 1.1
🟠 DASHBOARD.JS loaded - Version: 1.1
```

Cache temizlenmemiş demektir!