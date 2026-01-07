import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import {
  initializeDatabase,
  isDatabaseEmpty,
  seedDatabase,
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  getAllCustomerAircraft,
  getCustomerAircraft,
  addAircraft,
  updateAircraft,
  deleteAircraft,
  getDashboardStats,
  exportDatabase,
  importDatabase,
  DB_PATH
} from './db';
import { seedData } from './seedData';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database on startup
console.log('Initializing database...');
initializeDatabase();

// Seed with initial data if database is empty
if (isDatabaseEmpty()) {
  console.log('Database is empty, seeding with initial data...');
  seedDatabase(seedData);
}

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ==================== CUSTOMER ROUTES ====================

app.get('/api/customers', (req, res) => {
  try {
    const customers = getAllCustomers();
    res.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

app.get('/api/customers/:id', (req, res) => {
  try {
    const customer = getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
});

app.post('/api/customers', (req, res) => {
  try {
    const customer = createCustomer(req.body);
    res.status(201).json(customer);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Failed to create customer' });
  }
});

app.put('/api/customers/:id', (req, res) => {
  try {
    const customer = updateCustomer(req.params.id, req.body);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Failed to update customer' });
  }
});

app.delete('/api/customers/:id', (req, res) => {
  try {
    const deleted = deleteCustomer(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
});

// ==================== AIRCRAFT ROUTES ====================

app.get('/api/aircraft', (req, res) => {
  try {
    const aircraft = getAllCustomerAircraft();
    res.json(aircraft);
  } catch (error) {
    console.error('Error fetching aircraft:', error);
    res.status(500).json({ error: 'Failed to fetch aircraft' });
  }
});

app.get('/api/customers/:customerId/aircraft', (req, res) => {
  try {
    const aircraft = getCustomerAircraft(req.params.customerId);
    res.json(aircraft);
  } catch (error) {
    console.error('Error fetching customer aircraft:', error);
    res.status(500).json({ error: 'Failed to fetch customer aircraft' });
  }
});

app.post('/api/customers/:customerId/aircraft', (req, res) => {
  try {
    const { name, applications } = req.body;
    const aircraft = addAircraft(req.params.customerId, name, applications);
    res.status(201).json(aircraft);
  } catch (error) {
    console.error('Error adding aircraft:', error);
    res.status(500).json({ error: 'Failed to add aircraft' });
  }
});

app.put('/api/aircraft/:id', (req, res) => {
  try {
    const { name, applications } = req.body;
    const updated = updateAircraft(parseInt(req.params.id), name, applications);
    if (!updated) {
      return res.status(404).json({ error: 'Aircraft not found' });
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating aircraft:', error);
    res.status(500).json({ error: 'Failed to update aircraft' });
  }
});

app.delete('/api/aircraft/:id', (req, res) => {
  try {
    const deleted = deleteAircraft(parseInt(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'Aircraft not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting aircraft:', error);
    res.status(500).json({ error: 'Failed to delete aircraft' });
  }
});

// ==================== PRODUCT ROUTES ====================

app.get('/api/products', (req, res) => {
  try {
    const products = getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', (req, res) => {
  try {
    const product = getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.post('/api/products', (req, res) => {
  try {
    const product = createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', (req, res) => {
  try {
    const product = updateProduct(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', (req, res) => {
  try {
    const deleted = deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ==================== OPPORTUNITY ROUTES ====================

app.get('/api/opportunities', (req, res) => {
  try {
    const opportunities = getAllOpportunities();
    res.json(opportunities);
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    res.status(500).json({ error: 'Failed to fetch opportunities' });
  }
});

app.get('/api/opportunities/:id', (req, res) => {
  try {
    const opportunity = getOpportunityById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }
    res.json(opportunity);
  } catch (error) {
    console.error('Error fetching opportunity:', error);
    res.status(500).json({ error: 'Failed to fetch opportunity' });
  }
});

app.post('/api/opportunities', (req, res) => {
  try {
    const opportunity = createOpportunity(req.body);
    res.status(201).json(opportunity);
  } catch (error) {
    console.error('Error creating opportunity:', error);
    res.status(500).json({ error: 'Failed to create opportunity' });
  }
});

app.put('/api/opportunities/:id', (req, res) => {
  try {
    const opportunity = updateOpportunity(req.params.id, req.body);
    if (!opportunity) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }
    res.json(opportunity);
  } catch (error) {
    console.error('Error updating opportunity:', error);
    res.status(500).json({ error: 'Failed to update opportunity' });
  }
});

app.delete('/api/opportunities/:id', (req, res) => {
  try {
    const deleted = deleteOpportunity(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Opportunity not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting opportunity:', error);
    res.status(500).json({ error: 'Failed to delete opportunity' });
  }
});

// ==================== DASHBOARD ROUTES ====================

app.get('/api/dashboard/stats', (req, res) => {
  try {
    const stats = getDashboardStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// ==================== BACKUP & RESTORE ROUTES ====================

// Export all data as JSON
app.get('/api/backup/export', (req, res) => {
  try {
    const data = exportDatabase();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=avicrm-backup-${new Date().toISOString().split('T')[0]}.json`);
    res.json(data);
  } catch (error) {
    console.error('Error exporting database:', error);
    res.status(500).json({ error: 'Failed to export database' });
  }
});

// Import data from JSON
app.post('/api/backup/import', (req, res) => {
  try {
    importDatabase(req.body);
    res.json({ success: true, message: 'Database imported successfully' });
  } catch (error) {
    console.error('Error importing database:', error);
    res.status(500).json({ error: 'Failed to import database' });
  }
});

// Save backup to file
app.post('/api/backup/save', (req, res) => {
  try {
    const data = exportDatabase();
    const backupDir = path.join(process.cwd(), 'data', 'backups');

    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const filename = `backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    const filepath = path.join(backupDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(data, null, 2));

    res.json({ success: true, filename, path: filepath });
  } catch (error) {
    console.error('Error saving backup:', error);
    res.status(500).json({ error: 'Failed to save backup' });
  }
});

// List available backups
app.get('/api/backup/list', (req, res) => {
  try {
    const backupDir = path.join(process.cwd(), 'data', 'backups');

    if (!fs.existsSync(backupDir)) {
      return res.json([]);
    }

    const files = fs.readdirSync(backupDir)
      .filter(f => f.endsWith('.json'))
      .map(f => ({
        filename: f,
        path: path.join(backupDir, f),
        createdAt: fs.statSync(path.join(backupDir, f)).birthtime
      }))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    res.json(files);
  } catch (error) {
    console.error('Error listing backups:', error);
    res.status(500).json({ error: 'Failed to list backups' });
  }
});

// Restore from a specific backup file
app.post('/api/backup/restore/:filename', (req, res) => {
  try {
    const backupDir = path.join(process.cwd(), 'data', 'backups');
    const filepath = path.join(backupDir, req.params.filename);

    if (!fs.existsSync(filepath)) {
      return res.status(404).json({ error: 'Backup file not found' });
    }

    const data = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    importDatabase(data);

    res.json({ success: true, message: 'Database restored successfully' });
  } catch (error) {
    console.error('Error restoring backup:', error);
    res.status(500).json({ error: 'Failed to restore backup' });
  }
});

// Get database info
app.get('/api/database/info', (req, res) => {
  try {
    const stats = fs.statSync(DB_PATH);
    res.json({
      path: DB_PATH,
      size: stats.size,
      modified: stats.mtime,
      created: stats.birthtime
    });
  } catch (error) {
    console.error('Error getting database info:', error);
    res.status(500).json({ error: 'Failed to get database info' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
  console.log(`Database location: ${DB_PATH}`);
});
