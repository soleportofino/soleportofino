# 🚨 Supabase 500 Error - Acil Kontrol Listesi

## Geçici Çözüm Aktif ✅
Demo mode otomatik olarak aktif edildi. Giriş bilgileri:
- **Email:** admin@soleportofino.com
- **Password:** demo123

## Supabase Kontrol Listesi (Sırasıyla Yapın)

### 1. ⚡ Proje Durumu
- [ ] https://app.supabase.com adresine giriş yapın
- [ ] Projenizi seçin: **npfwslczctdocnkyntpf**
- [ ] **Proje durumu:** Active mi? (Pause değilse)
- [ ] Eğer Paused ise: Settings > General > **Restart Project**

### 2. 🔐 Authentication Ayarları
Authentication > Settings:
- [ ] **Email Auth:** Enabled ✅
- [ ] **Confirm Email:** Disabled (test için)
- [ ] **Enable Email Signup:** Enabled ✅

### 3. 🔑 API Anahtarları
Settings > API:
- [ ] **Project URL:** `https://npfwslczctdocnkyntpf.supabase.co`
- [ ] **Anon Public Key'i kopyalayın**
- [ ] Cloudflare Pages > Settings > Environment Variables:
  - SUPABASE_URL = `https://npfwslczctdocnkyntpf.supabase.co`
  - SUPABASE_ANON_KEY = [Kopyaladığınız key]

### 4. 🌐 URL Configuration
Authentication > URL Configuration:
- [ ] **Site URL:** `https://admin.soleportofino.com`
- [ ] **Redirect URLs:** 
  ```
  https://admin.soleportofino.com/*
  https://admin.soleportofino.com/dashboard.html
  ```

### 5. 👤 Kullanıcı Kontrolü
Authentication > Users:
- [ ] `admin@soleportofino.com` kullanıcısı var mı?
- [ ] Yoksa: **Add User** > **Create New User**
  - Email: admin@soleportofino.com
  - Password: [Güçlü şifre]
  - ✅ Auto Confirm User

### 6. 📊 Database Kontrolü
SQL Editor'de çalıştırın:
```sql
-- Kullanıcı kontrolü
SELECT email, created_at, last_sign_in_at 
FROM auth.users 
WHERE email = 'admin@soleportofino.com';

-- Auth ayarları kontrolü
SELECT * FROM auth.schema_migrations;
```

### 7. 🔍 Logs Kontrolü
Logs > API Logs:
- [ ] Son 500 hataları için log mesajlarını kontrol edin
- [ ] "Invalid API key" hatası var mı?
- [ ] "Auth not enabled" hatası var mı?

### 8. 🔄 Cloudflare Kontrolü
Cloudflare Dashboard:
- [ ] Pages > sole-portofino-admin > Settings
- [ ] Environment variables doğru mu?
- [ ] Son deployment başarılı mı?
- [ ] Functions > Real-time Logs'da hata var mı?

## Demo Mode'u Kaldırma

Tüm kontroller tamamlandıktan sonra:

1. `sole-portofino-admin/js/auth.js` dosyasını açın
2. Şu satırları silin veya comment yapın:
```javascript
// TEMPORARY: Force demo mode due to Supabase 500 error
console.warn('⚠️ TEMPORARY: Demo mode active due to Supabase configuration issues');
return false;
```
3. Commit ve push yapın

## Alternatif Çözümler

### A. Yeni Supabase Projesi
Eğer sorun devam ediyorsa:
1. Yeni bir Supabase projesi oluşturun
2. Yeni URL ve key'leri alın
3. Cloudflare'de güncelleyin

### B. Supabase CLI ile Debug
```bash
npx supabase status
npx supabase db dump
```

### C. CORS Sorunu Olabilir
Supabase Dashboard > Settings > API > CORS:
- Allowed Origins: `https://admin.soleportofino.com`

## Destek
- Supabase Discord: https://discord.supabase.com
- Supabase Support: support@supabase.io
- Status Page: https://status.supabase.com