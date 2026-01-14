-- AutoValve CRM Database Schema
-- Run this in your Supabase SQL Editor to create the tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE industry_type AS ENUM ('airplane', 'drone', 'helicopter');
CREATE TYPE opportunity_stage AS ENUM ('lead', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost');
CREATE TYPE customer_status AS ENUM ('active', 'inactive', 'prospect');

-- Customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  industry industry_type NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  status customer_status DEFAULT 'active'
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  sku TEXT NOT NULL UNIQUE,
  description TEXT,
  category TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  specifications JSONB NOT NULL DEFAULT '{}',
  industries industry_type[] NOT NULL DEFAULT '{}',
  in_stock BOOLEAN DEFAULT true,
  image_url TEXT
);

-- Opportunities table
CREATE TABLE opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  stage opportunity_stage DEFAULT 'lead',
  value DECIMAL(12, 2) NOT NULL,
  probability INTEGER CHECK (probability >= 0 AND probability <= 100),
  expected_close_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT,
  industry industry_type NOT NULL
);

-- Opportunity products junction table
CREATE TABLE opportunity_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price DECIMAL(10, 2) NOT NULL,
  UNIQUE(opportunity_id, product_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_customers_industry ON customers(industry);
CREATE INDEX idx_customers_status ON customers(status);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_industries ON products USING GIN(industries);
CREATE INDEX idx_opportunities_customer_id ON opportunities(customer_id);
CREATE INDEX idx_opportunities_stage ON opportunities(stage);
CREATE INDEX idx_opportunities_industry ON opportunities(industry);
CREATE INDEX idx_opportunity_products_opportunity_id ON opportunity_products(opportunity_id);
CREATE INDEX idx_opportunity_products_product_id ON opportunity_products(product_id);

-- Enable Row Level Security (RLS)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunity_products ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (adjust as needed for your auth requirements)
CREATE POLICY "Allow public read access on customers" ON customers FOR SELECT USING (true);
CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access on opportunities" ON opportunities FOR SELECT USING (true);
CREATE POLICY "Allow public read access on opportunity_products" ON opportunity_products FOR SELECT USING (true);

-- Create policies for authenticated insert/update/delete (adjust as needed)
CREATE POLICY "Allow authenticated insert on customers" ON customers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update on customers" ON customers FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete on customers" ON customers FOR DELETE USING (true);

CREATE POLICY "Allow authenticated insert on products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update on products" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete on products" ON products FOR DELETE USING (true);

CREATE POLICY "Allow authenticated insert on opportunities" ON opportunities FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update on opportunities" ON opportunities FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete on opportunities" ON opportunities FOR DELETE USING (true);

CREATE POLICY "Allow authenticated insert on opportunity_products" ON opportunity_products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update on opportunity_products" ON opportunity_products FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete on opportunity_products" ON opportunity_products FOR DELETE USING (true);

-- Create a view for opportunities with customer name (for convenience)
CREATE VIEW opportunities_with_customer AS
SELECT
  o.*,
  c.company_name as customer_name
FROM opportunities o
JOIN customers c ON o.customer_id = c.id;
