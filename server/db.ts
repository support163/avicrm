import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import type { Customer, Product, Opportunity, DashboardStats, IndustryType, OpportunityStage } from '../src/types';

// Database file path - stored outside of source code for persistence
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'avicrm.db');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize database connection
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL'); // Better performance for concurrent access

// Aircraft/Application types
export interface Application {
  name: string;
  supplier: 'AutoValve' | 'Prospect' | 'Competitor';
}

export interface AircraftEntry {
  id?: number;
  customerId: string;
  name: string;
  applications: Application[];
}

// Initialize database schema
export function initializeDatabase(): void {
  // Customers table
  db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      companyName TEXT NOT NULL,
      contactName TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      industry TEXT NOT NULL CHECK (industry IN ('airplane', 'drone', 'helicopter')),
      address TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      notes TEXT,
      status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'prospect'))
    )
  `);

  // Products table
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      sku TEXT NOT NULL UNIQUE,
      description TEXT,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      specifications TEXT NOT NULL,
      industries TEXT NOT NULL,
      inStock INTEGER NOT NULL DEFAULT 1,
      imageUrl TEXT
    )
  `);

  // Opportunities table
  db.exec(`
    CREATE TABLE IF NOT EXISTS opportunities (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      customerId TEXT NOT NULL,
      customerName TEXT NOT NULL,
      products TEXT NOT NULL,
      stage TEXT NOT NULL CHECK (stage IN ('lead', 'qualified', 'proposal', 'negotiation', 'closed_won', 'closed_lost')),
      value REAL NOT NULL,
      probability INTEGER NOT NULL,
      expectedCloseDate TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      notes TEXT,
      industry TEXT NOT NULL CHECK (industry IN ('airplane', 'drone', 'helicopter')),
      FOREIGN KEY (customerId) REFERENCES customers(id)
    )
  `);

  // Customer Aircraft table (for aircraft and applications data)
  db.exec(`
    CREATE TABLE IF NOT EXISTS customer_aircraft (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customerId TEXT NOT NULL,
      name TEXT NOT NULL,
      applications TEXT NOT NULL,
      FOREIGN KEY (customerId) REFERENCES customers(id)
    )
  `);

  // Dashboard stats cache table
  db.exec(`
    CREATE TABLE IF NOT EXISTS dashboard_stats (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      totalRevenue REAL NOT NULL,
      activeCustomers INTEGER NOT NULL,
      openOpportunities INTEGER NOT NULL,
      pipelineValue REAL NOT NULL,
      conversionRate REAL NOT NULL,
      industryBreakdown TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `);

  console.log('Database schema initialized');
}

// Check if database needs seeding
export function isDatabaseEmpty(): boolean {
  const result = db.prepare('SELECT COUNT(*) as count FROM customers').get() as { count: number };
  return result.count === 0;
}

// Seed database with initial data
export function seedDatabase(data: {
  customers: Customer[];
  products: Product[];
  opportunities: Opportunity[];
  customerAircraft: Record<string, AircraftEntry[]>;
  dashboardStats: DashboardStats;
}): void {
  const insertCustomer = db.prepare(`
    INSERT OR REPLACE INTO customers (id, companyName, contactName, email, phone, industry, address, createdAt, notes, status)
    VALUES (@id, @companyName, @contactName, @email, @phone, @industry, @address, @createdAt, @notes, @status)
  `);

  const insertProduct = db.prepare(`
    INSERT OR REPLACE INTO products (id, name, sku, description, category, price, specifications, industries, inStock, imageUrl)
    VALUES (@id, @name, @sku, @description, @category, @price, @specifications, @industries, @inStock, @imageUrl)
  `);

  const insertOpportunity = db.prepare(`
    INSERT OR REPLACE INTO opportunities (id, title, customerId, customerName, products, stage, value, probability, expectedCloseDate, createdAt, notes, industry)
    VALUES (@id, @title, @customerId, @customerName, @products, @stage, @value, @probability, @expectedCloseDate, @createdAt, @notes, @industry)
  `);

  const insertAircraft = db.prepare(`
    INSERT INTO customer_aircraft (customerId, name, applications)
    VALUES (@customerId, @name, @applications)
  `);

  const insertStats = db.prepare(`
    INSERT OR REPLACE INTO dashboard_stats (id, totalRevenue, activeCustomers, openOpportunities, pipelineValue, conversionRate, industryBreakdown, updatedAt)
    VALUES (1, @totalRevenue, @activeCustomers, @openOpportunities, @pipelineValue, @conversionRate, @industryBreakdown, @updatedAt)
  `);

  // Use transaction for atomic seeding
  const seedAll = db.transaction(() => {
    // Seed customers
    for (const customer of data.customers) {
      insertCustomer.run(customer);
    }

    // Seed products
    for (const product of data.products) {
      insertProduct.run({
        ...product,
        specifications: JSON.stringify(product.specifications),
        industries: JSON.stringify(product.industries),
        inStock: product.inStock ? 1 : 0
      });
    }

    // Seed opportunities
    for (const opp of data.opportunities) {
      insertOpportunity.run({
        ...opp,
        products: JSON.stringify(opp.products)
      });
    }

    // Seed customer aircraft
    for (const [customerId, aircraftList] of Object.entries(data.customerAircraft)) {
      for (const aircraft of aircraftList) {
        insertAircraft.run({
          customerId,
          name: aircraft.name,
          applications: JSON.stringify(aircraft.applications)
        });
      }
    }

    // Seed dashboard stats
    insertStats.run({
      ...data.dashboardStats,
      industryBreakdown: JSON.stringify(data.dashboardStats.industryBreakdown),
      updatedAt: new Date().toISOString()
    });
  });

  seedAll();
  console.log('Database seeded with initial data');
}

// ==================== CUSTOMER OPERATIONS ====================

export function getAllCustomers(): Customer[] {
  return db.prepare('SELECT * FROM customers ORDER BY companyName').all() as Customer[];
}

export function getCustomerById(id: string): Customer | undefined {
  return db.prepare('SELECT * FROM customers WHERE id = ?').get(id) as Customer | undefined;
}

export function createCustomer(customer: Customer): Customer {
  const stmt = db.prepare(`
    INSERT INTO customers (id, companyName, contactName, email, phone, industry, address, createdAt, notes, status)
    VALUES (@id, @companyName, @contactName, @email, @phone, @industry, @address, @createdAt, @notes, @status)
  `);
  stmt.run(customer);
  return customer;
}

export function updateCustomer(id: string, updates: Partial<Customer>): Customer | undefined {
  const current = getCustomerById(id);
  if (!current) return undefined;

  const updated = { ...current, ...updates };
  const stmt = db.prepare(`
    UPDATE customers SET
      companyName = @companyName,
      contactName = @contactName,
      email = @email,
      phone = @phone,
      industry = @industry,
      address = @address,
      notes = @notes,
      status = @status
    WHERE id = @id
  `);
  stmt.run(updated);
  return updated;
}

export function deleteCustomer(id: string): boolean {
  const result = db.prepare('DELETE FROM customers WHERE id = ?').run(id);
  return result.changes > 0;
}

// ==================== AIRCRAFT OPERATIONS ====================

export function getCustomerAircraft(customerId: string): AircraftEntry[] {
  const rows = db.prepare('SELECT * FROM customer_aircraft WHERE customerId = ?').all(customerId) as Array<{
    id: number;
    customerId: string;
    name: string;
    applications: string;
  }>;

  return rows.map(row => ({
    id: row.id,
    customerId: row.customerId,
    name: row.name,
    applications: JSON.parse(row.applications)
  }));
}

export function getAllCustomerAircraft(): Record<string, AircraftEntry[]> {
  const rows = db.prepare('SELECT * FROM customer_aircraft ORDER BY customerId, name').all() as Array<{
    id: number;
    customerId: string;
    name: string;
    applications: string;
  }>;

  const result: Record<string, AircraftEntry[]> = {};
  for (const row of rows) {
    if (!result[row.customerId]) {
      result[row.customerId] = [];
    }
    result[row.customerId].push({
      id: row.id,
      customerId: row.customerId,
      name: row.name,
      applications: JSON.parse(row.applications)
    });
  }
  return result;
}

export function addAircraft(customerId: string, name: string, applications: Application[]): AircraftEntry {
  const stmt = db.prepare(`
    INSERT INTO customer_aircraft (customerId, name, applications)
    VALUES (@customerId, @name, @applications)
  `);
  const result = stmt.run({
    customerId,
    name,
    applications: JSON.stringify(applications)
  });
  return {
    id: result.lastInsertRowid as number,
    customerId,
    name,
    applications
  };
}

export function updateAircraft(id: number, name: string, applications: Application[]): boolean {
  const result = db.prepare(`
    UPDATE customer_aircraft SET name = ?, applications = ? WHERE id = ?
  `).run(name, JSON.stringify(applications), id);
  return result.changes > 0;
}

export function deleteAircraft(id: number): boolean {
  const result = db.prepare('DELETE FROM customer_aircraft WHERE id = ?').run(id);
  return result.changes > 0;
}

// ==================== PRODUCT OPERATIONS ====================

export function getAllProducts(): Product[] {
  const rows = db.prepare('SELECT * FROM products ORDER BY name').all() as Array<{
    id: string;
    name: string;
    sku: string;
    description: string;
    category: string;
    price: number;
    specifications: string;
    industries: string;
    inStock: number;
    imageUrl: string;
  }>;

  return rows.map(row => ({
    ...row,
    specifications: JSON.parse(row.specifications),
    industries: JSON.parse(row.industries),
    inStock: row.inStock === 1
  }));
}

export function getProductById(id: string): Product | undefined {
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(id) as {
    id: string;
    name: string;
    sku: string;
    description: string;
    category: string;
    price: number;
    specifications: string;
    industries: string;
    inStock: number;
    imageUrl: string;
  } | undefined;

  if (!row) return undefined;

  return {
    ...row,
    specifications: JSON.parse(row.specifications),
    industries: JSON.parse(row.industries),
    inStock: row.inStock === 1
  };
}

export function createProduct(product: Product): Product {
  const stmt = db.prepare(`
    INSERT INTO products (id, name, sku, description, category, price, specifications, industries, inStock, imageUrl)
    VALUES (@id, @name, @sku, @description, @category, @price, @specifications, @industries, @inStock, @imageUrl)
  `);
  stmt.run({
    ...product,
    specifications: JSON.stringify(product.specifications),
    industries: JSON.stringify(product.industries),
    inStock: product.inStock ? 1 : 0
  });
  return product;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | undefined {
  const current = getProductById(id);
  if (!current) return undefined;

  const updated = { ...current, ...updates };
  const stmt = db.prepare(`
    UPDATE products SET
      name = @name,
      sku = @sku,
      description = @description,
      category = @category,
      price = @price,
      specifications = @specifications,
      industries = @industries,
      inStock = @inStock,
      imageUrl = @imageUrl
    WHERE id = @id
  `);
  stmt.run({
    ...updated,
    specifications: JSON.stringify(updated.specifications),
    industries: JSON.stringify(updated.industries),
    inStock: updated.inStock ? 1 : 0
  });
  return updated;
}

export function deleteProduct(id: string): boolean {
  const result = db.prepare('DELETE FROM products WHERE id = ?').run(id);
  return result.changes > 0;
}

// ==================== OPPORTUNITY OPERATIONS ====================

export function getAllOpportunities(): Opportunity[] {
  const rows = db.prepare('SELECT * FROM opportunities ORDER BY createdAt DESC').all() as Array<{
    id: string;
    title: string;
    customerId: string;
    customerName: string;
    products: string;
    stage: OpportunityStage;
    value: number;
    probability: number;
    expectedCloseDate: string;
    createdAt: string;
    notes: string;
    industry: IndustryType;
  }>;

  return rows.map(row => ({
    ...row,
    products: JSON.parse(row.products)
  }));
}

export function getOpportunityById(id: string): Opportunity | undefined {
  const row = db.prepare('SELECT * FROM opportunities WHERE id = ?').get(id) as {
    id: string;
    title: string;
    customerId: string;
    customerName: string;
    products: string;
    stage: OpportunityStage;
    value: number;
    probability: number;
    expectedCloseDate: string;
    createdAt: string;
    notes: string;
    industry: IndustryType;
  } | undefined;

  if (!row) return undefined;

  return {
    ...row,
    products: JSON.parse(row.products)
  };
}

export function createOpportunity(opportunity: Opportunity): Opportunity {
  const stmt = db.prepare(`
    INSERT INTO opportunities (id, title, customerId, customerName, products, stage, value, probability, expectedCloseDate, createdAt, notes, industry)
    VALUES (@id, @title, @customerId, @customerName, @products, @stage, @value, @probability, @expectedCloseDate, @createdAt, @notes, @industry)
  `);
  stmt.run({
    ...opportunity,
    products: JSON.stringify(opportunity.products)
  });
  return opportunity;
}

export function updateOpportunity(id: string, updates: Partial<Opportunity>): Opportunity | undefined {
  const current = getOpportunityById(id);
  if (!current) return undefined;

  const updated = { ...current, ...updates };
  const stmt = db.prepare(`
    UPDATE opportunities SET
      title = @title,
      customerId = @customerId,
      customerName = @customerName,
      products = @products,
      stage = @stage,
      value = @value,
      probability = @probability,
      expectedCloseDate = @expectedCloseDate,
      notes = @notes,
      industry = @industry
    WHERE id = @id
  `);
  stmt.run({
    ...updated,
    products: JSON.stringify(updated.products)
  });
  return updated;
}

export function deleteOpportunity(id: string): boolean {
  const result = db.prepare('DELETE FROM opportunities WHERE id = ?').run(id);
  return result.changes > 0;
}

// ==================== DASHBOARD STATS ====================

export function getDashboardStats(): DashboardStats {
  // Calculate stats from actual data
  const customers = getAllCustomers();
  const opportunities = getAllOpportunities();

  const activeCustomers = customers.filter(c => c.status === 'active').length;
  const openOpportunities = opportunities.filter(o => !['closed_won', 'closed_lost'].includes(o.stage)).length;

  const closedWonOpps = opportunities.filter(o => o.stage === 'closed_won');
  const totalRevenue = closedWonOpps.reduce((sum, o) => sum + o.value, 0);

  const pipelineValue = opportunities
    .filter(o => !['closed_won', 'closed_lost'].includes(o.stage))
    .reduce((sum, o) => sum + o.value, 0);

  const totalOpps = opportunities.filter(o => ['closed_won', 'closed_lost'].includes(o.stage)).length;
  const conversionRate = totalOpps > 0 ? (closedWonOpps.length / totalOpps) * 100 : 0;

  const industryBreakdown = {
    airplane: opportunities.filter(o => o.industry === 'airplane').reduce((sum, o) => sum + o.value, 0),
    drone: opportunities.filter(o => o.industry === 'drone').reduce((sum, o) => sum + o.value, 0),
    helicopter: opportunities.filter(o => o.industry === 'helicopter').reduce((sum, o) => sum + o.value, 0)
  };

  return {
    totalRevenue,
    activeCustomers,
    openOpportunities,
    pipelineValue,
    conversionRate: Math.round(conversionRate * 10) / 10,
    industryBreakdown
  };
}

// ==================== BACKUP & RESTORE ====================

export function exportDatabase(): {
  customers: Customer[];
  products: Product[];
  opportunities: Opportunity[];
  customerAircraft: Record<string, AircraftEntry[]>;
  exportedAt: string;
} {
  return {
    customers: getAllCustomers(),
    products: getAllProducts(),
    opportunities: getAllOpportunities(),
    customerAircraft: getAllCustomerAircraft(),
    exportedAt: new Date().toISOString()
  };
}

export function importDatabase(data: {
  customers: Customer[];
  products: Product[];
  opportunities: Opportunity[];
  customerAircraft: Record<string, AircraftEntry[]>;
}): void {
  const clearAndImport = db.transaction(() => {
    // Clear existing data
    db.exec('DELETE FROM customer_aircraft');
    db.exec('DELETE FROM opportunities');
    db.exec('DELETE FROM products');
    db.exec('DELETE FROM customers');

    // Import new data
    for (const customer of data.customers) {
      createCustomer(customer);
    }
    for (const product of data.products) {
      createProduct(product);
    }
    for (const opp of data.opportunities) {
      createOpportunity(opp);
    }
    for (const [customerId, aircraftList] of Object.entries(data.customerAircraft)) {
      for (const aircraft of aircraftList) {
        addAircraft(customerId, aircraft.name, aircraft.applications);
      }
    }
  });

  clearAndImport();
}

// Export database instance for direct access if needed
export { db, DB_PATH };
