-- Sole Portofino Admin User Creation Script
-- =====================================================
-- Bu script'i Supabase SQL Editor'de çalıştırın
-- ÖNEMLİ: 'GÜVENLİ_ŞİFRENİZ' yerine güçlü bir şifre belirleyin!
-- =====================================================

-- YÖNTEM 1: BASİT VE GÜVENLİ SQL İLE KULLANICI EKLEME
-- =====================================================

-- UUID extension'ı etkinleştir (eğer yoksa)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Basit admin kullanıcı oluşturma
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@soleportofino.com',
    crypt('GÜVENLİ_ŞİFRENİZ', gen_salt('bf')),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"name": "Admin User"}',
    now(),
    now(),
    '',
    ''
);

-- YÖNTEM 2: EĞER YUKARIDA HATA ALIYORSANIZ, BU DAHA BASİT VERSİYONU DENEYİN
-- =========================================================================
/*
-- Sadece gerekli alanlarla kullanıcı oluştur
INSERT INTO auth.users (
    email,
    encrypted_password,
    email_confirmed_at,
    role,
    aud
) VALUES (
    'admin@soleportofino.com',
    crypt('GÜVENLİ_ŞİFRENİZ', gen_salt('bf')),
    now(),
    'authenticated',
    'authenticated'
);
*/

-- YÖNTEM 3: MEVCUT KULLANICININ ŞİFRESİNİ GÜNCELLEME
-- ==================================================
/*
UPDATE auth.users 
SET encrypted_password = crypt('YENİ_ŞİFRENİZ', gen_salt('bf'))
WHERE email = 'admin@soleportofino.com';
*/

-- Admin için profil tablosu oluştur (opsiyonel)
-- Eğer profiles tablonuz varsa bu kısmı kullanabilirsiniz
/*
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin profili ekle
INSERT INTO public.profiles (id, email, full_name, role)
SELECT id, email, 'Admin User', 'admin'
FROM auth.users
WHERE email = 'admin@soleportofino.com'
ON CONFLICT (id) DO UPDATE
SET role = 'admin', full_name = 'Admin User';
*/

-- Kontrol sorgusu - admin kullanıcının oluşturulduğunu doğrula
SELECT 
    u.id,
    u.email,
    u.created_at,
    u.email_confirmed_at,
    u.role,
    u.raw_user_meta_data->>'role' as user_role
FROM auth.users u
WHERE u.email = 'admin@soleportofino.com';

-- =====================================================
-- KULLANIM TALİMATLARI:
-- 1. 'GÜVENLİ_ŞİFRENİZ' yazan yeri güçlü bir şifre ile değiştirin
-- 2. Supabase Dashboard > SQL Editor'e gidin
-- 3. Bu script'i yapıştırın ve Run butonuna tıklayın
-- 4. Başarılı mesajını görene kadar bekleyin
-- 5. admin@soleportofino.com ve belirlediğiniz şifre ile giriş yapın
-- =====================================================

-- ÖNERİLEN ŞİFRE ÖZELLİKLERİ:
-- - En az 12 karakter
-- - Büyük ve küçük harfler
-- - Rakamlar
-- - Özel karakterler (!@#$%^&*)
-- Örnek: SoleP0rt0f!no2024Admin#