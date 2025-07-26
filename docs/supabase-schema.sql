-- Sole Portofino Supabase Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number TEXT UNIQUE NOT NULL,
    customer_email TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT,
    customer_address TEXT,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    payment_method TEXT,
    payment_status TEXT DEFAULT 'pending',
    shipping_method TEXT,
    shipping_address TEXT,
    tracking_number TEXT,
    notes TEXT,
    shopify_order_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    city TEXT,
    country TEXT DEFAULT 'TR',
    total_orders INTEGER DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0,
    last_order_date TIMESTAMP WITH TIME ZONE,
    tags TEXT[],
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table (for analytics, actual products in Shopify)
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shopify_product_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    sku TEXT,
    price DECIMAL(10,2) NOT NULL,
    inventory_quantity INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    add_to_cart_count INTEGER DEFAULT 0,
    purchase_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics events table
CREATE TABLE IF NOT EXISTS analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type TEXT NOT NULL,
    page_url TEXT,
    referrer_url TEXT,
    user_agent TEXT,
    ip_address TEXT,
    session_id TEXT,
    user_id UUID REFERENCES customers(id),
    product_id UUID REFERENCES products(id),
    event_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Returns/Refunds table
CREATE TABLE IF NOT EXISTS returns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id),
    customer_email TEXT NOT NULL,
    reason TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    refund_amount DECIMAL(10,2),
    return_shipping_label TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin activity log
CREATE TABLE IF NOT EXISTS admin_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_email TEXT NOT NULL,
    action TEXT NOT NULL,
    resource_type TEXT,
    resource_id UUID,
    changes JSONB,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_analytics_event_type ON analytics(event_type);
CREATE INDEX idx_analytics_created_at ON analytics(created_at DESC);
CREATE INDEX idx_returns_status ON returns(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at trigger to tables
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_returns_updated_at BEFORE UPDATE ON returns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE returns ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Admin can see all data
CREATE POLICY "Admin full access to orders" ON orders
    FOR ALL USING (auth.jwt() ->> 'email' = 'admin@soleportofino.com');

CREATE POLICY "Admin full access to customers" ON customers
    FOR ALL USING (auth.jwt() ->> 'email' = 'admin@soleportofino.com');

CREATE POLICY "Admin full access to products" ON products
    FOR ALL USING (auth.jwt() ->> 'email' = 'admin@soleportofino.com');

CREATE POLICY "Admin full access to analytics" ON analytics
    FOR ALL USING (auth.jwt() ->> 'email' = 'admin@soleportofino.com');

CREATE POLICY "Admin full access to returns" ON returns
    FOR ALL USING (auth.jwt() ->> 'email' = 'admin@soleportofino.com');

CREATE POLICY "Admin full access to admin_logs" ON admin_logs
    FOR ALL USING (auth.jwt() ->> 'email' = 'admin@soleportofino.com');

-- Public can insert analytics events
CREATE POLICY "Public can insert analytics" ON analytics
    FOR INSERT WITH CHECK (true);

-- Sample data for testing (optional)
/*
INSERT INTO customers (email, name, phone, city) VALUES
    ('test1@example.com', 'Ayşe Yılmaz', '0555 123 4567', 'İstanbul'),
    ('test2@example.com', 'Mehmet Öz', '0555 234 5678', 'Ankara'),
    ('test3@example.com', 'Zeynep Kara', '0555 345 6789', 'İzmir');

INSERT INTO orders (order_number, customer_email, customer_name, product_id, product_name, quantity, unit_price, total_amount, status) VALUES
    ('SP2024001', 'test1@example.com', 'Ayşe Yılmaz', 'gid://shopify/Product/1234567890', 'Sole Portofino Signature Gingham Tote', 1, 2999.00, 2999.00, 'completed'),
    ('SP2024002', 'test2@example.com', 'Mehmet Öz', 'gid://shopify/Product/1234567890', 'Sole Portofino Signature Gingham Tote', 1, 2999.00, 2999.00, 'processing'),
    ('SP2024003', 'test3@example.com', 'Zeynep Kara', 'gid://shopify/Product/1234567890', 'Sole Portofino Signature Gingham Tote', 2, 2999.00, 5998.00, 'pending');
*/