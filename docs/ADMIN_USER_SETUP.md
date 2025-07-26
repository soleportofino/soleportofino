# 🔐 Sole Portofino Admin Kullanıcı Kurulum Rehberi

## 🚀 3 Farklı Kurulum Yöntemi

### YÖNTEM 1: Supabase Dashboard'dan Manuel Ekleme (ÖNERİLEN)

1. **Supabase Dashboard'a giriş yapın**
   - https://app.supabase.com adresine gidin
   - Projenizi seçin

2. **Authentication > Users sekmesine gidin**
   - Sol menüden "Authentication" tıklayın
   - "Users" sekmesini seçin

3. **"Add user" > "Create new user" butonuna tıklayın**

4. **Kullanıcı bilgilerini girin:**
   - Email: `admin@soleportofino.com`
   - Password: Güçlü bir şifre belirleyin
   - ✅ "Auto Confirm User" seçeneğini işaretleyin
   - "Create User" butonuna tıklayın

### YÖNTEM 2: SQL Script ile Ekleme

1. **SQL Editor'ü açın**
   - Sol menüden "SQL Editor" sekmesine tıklayın
   - "New Query" butonuna tıklayın

2. **Admin kullanıcı oluşturma script'ini çalıştırın**
   - `create-admin-user.sql` dosyasındaki YÖNTEM 1'i deneyin
   - **ÖNEMLİ:** `GÜVENLİ_ŞİFRENİZ` yazan yeri kendi şifrenizle değiştirin
   - "Run" butonuna tıklayın
   - Hata alırsanız YÖNTEM 2'yi deneyin

### YÖNTEM 3: Supabase CLI ile Ekleme

```bash
# Supabase CLI kuruluysa
supabase db reset --db-url "postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Ardından SQL komutunu çalıştırın
```

## Güvenli Şifre Önerileri

### ✅ İyi Şifre Özellikleri:
- En az 12-16 karakter uzunluğunda
- Büyük harfler (A-Z)
- Küçük harfler (a-z)
- Rakamlar (0-9)
- Özel karakterler (!@#$%^&*)

### 🚫 Kullanmayın:
- Kişisel bilgiler (doğum tarihi, isim, telefon)
- Sözlükte bulunan kelimeler
- Klavye desenleri (qwerty, 123456)
- Önceki şifreleriniz

### 💡 Örnek Güçlü Şifreler:
```
SoleP@rt0f!no2024#Adm!n
Tk$2024!PortofinoAdmin&
Admin#Sole!2024$Strong
```

## Admin Giriş Bilgileri

Başarılı kurulumdan sonra:
- **E-posta:** admin@soleportofino.com
- **Şifre:** [Sizin belirlediğiniz şifre]

## Giriş Yapma

1. https://admin.soleportofino.com adresine gidin
2. E-posta ve şifrenizi girin
3. "Giriş Yap" butonuna tıklayın

## Sorun Giderme

### 🔴 SQL Script Hataları

#### "null value in column 'provider_id'" hatası:
Bu hata Supabase'in yeni versiyonlarında görülür. Çözüm:
1. Dashboard'dan manuel ekleme yöntemini kullanın (YÖNTEM 1)
2. Veya daha basit SQL versiyonunu deneyin (create-admin-user.sql içinde YÖNTEM 2)

#### "duplicate key value violates unique constraint" hatası:
Kullanıcı zaten mevcut. Şifresini güncelleyin:
```sql
UPDATE auth.users 
SET encrypted_password = crypt('YENİ_ŞİFRENİZ', gen_salt('bf'))
WHERE email = 'admin@soleportofino.com';
```

### 🟡 Giriş Sorunları

#### "Invalid login credentials" hatası:
1. Şifrenizi doğru yazdığınızdan emin olun
2. Kullanıcının oluşturulduğunu kontrol edin:
   ```sql
   SELECT email, created_at FROM auth.users WHERE email = 'admin@soleportofino.com';
   ```
3. Email confirmation gerekiyorsa, Dashboard'dan "Confirm Email" butonuna tıklayın

#### Demo mode uyarısı:
"Environment variables not set. Using demo mode." görüyorsanız:
1. Cloudflare Pages'de environment variables kontrolü:
   - SUPABASE_URL
   - SUPABASE_ANON_KEY
2. Deployment'ın tamamlandığından emin olun
3. Hard refresh yapın (Ctrl+F5)

### 🟢 Alternatif Çözümler

#### Magic Link ile giriş:
Supabase Dashboard > Authentication > Settings > Email Auth:
- Enable Email Confirmations: OFF yapın
- Enable Magic Link: ON yapın

#### Password Recovery:
1. Supabase Dashboard > Authentication > Users
2. Kullanıcıyı bulun ve "Send Recovery Email" tıklayın

## Güvenlik Önerileri

1. **Şifrenizi düzenli değiştirin** (3-6 ayda bir)
2. **Şifrenizi kimseyle paylaşmayın**
3. **Farklı cihazlardan giriş yaparken dikkatli olun**
4. **Giriş yaptıktan sonra oturumu kapatmayı unutmayın**

## Ek Admin Kullanıcı Ekleme

Başka admin kullanıcılar eklemek için:
```sql
-- Yeni admin kullanıcı ekle
INSERT INTO auth.users (
    email,
    encrypted_password,
    email_confirmed_at,
    raw_user_meta_data,
    role,
    aud
) VALUES (
    'yeni.admin@soleportofino.com',
    crypt('YeniAdminŞifresi', gen_salt('bf')),
    NOW(),
    '{"name": "Yeni Admin", "role": "admin"}',
    'authenticated',
    'authenticated'
);
```

## Destek

Sorun yaşarsanız:
1. Supabase Dashboard loglarını kontrol edin
2. Browser console'da hata mesajlarını inceleyin
3. SQL script'inin tam olarak çalıştığından emin olun

---

**NOT:** Bu dokümandaki şifre örnekleri sadece format göstermek içindir. Lütfen kendi benzersiz ve güçlü şifrenizi oluşturun!