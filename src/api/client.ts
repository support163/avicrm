import type { Customer, Product, Opportunity, DashboardStats } from '../types';

const API_BASE = 'http://localhost:3001/api';

// Application types for valve products
export type Application = {
  name: string;
  supplier: 'AutoValve' | 'Prospect' | 'Competitor';
};

export type AircraftEntry = {
  id?: number;
  customerId: string;
  name: string;
  applications: Application[];
};

// Generic fetch wrapper with error handling
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

// ==================== CUSTOMER API ====================

export const customerAPI = {
  getAll: () => fetchAPI<Customer[]>('/customers'),

  getById: (id: string) => fetchAPI<Customer>(`/customers/${id}`),

  create: (customer: Customer) =>
    fetchAPI<Customer>('/customers', {
      method: 'POST',
      body: JSON.stringify(customer),
    }),

  update: (id: string, updates: Partial<Customer>) =>
    fetchAPI<Customer>(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),

  delete: (id: string) =>
    fetchAPI<void>(`/customers/${id}`, {
      method: 'DELETE',
    }),
};

// ==================== AIRCRAFT API ====================

export const aircraftAPI = {
  getAll: () => fetchAPI<Record<string, AircraftEntry[]>>('/aircraft'),

  getByCustomer: (customerId: string) =>
    fetchAPI<AircraftEntry[]>(`/customers/${customerId}/aircraft`),

  create: (customerId: string, name: string, applications: Application[]) =>
    fetchAPI<AircraftEntry>(`/customers/${customerId}/aircraft`, {
      method: 'POST',
      body: JSON.stringify({ name, applications }),
    }),

  update: (id: number, name: string, applications: Application[]) =>
    fetchAPI<{ success: boolean }>(`/aircraft/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name, applications }),
    }),

  delete: (id: number) =>
    fetchAPI<void>(`/aircraft/${id}`, {
      method: 'DELETE',
    }),
};

// ==================== PRODUCT API ====================

export const productAPI = {
  getAll: () => fetchAPI<Product[]>('/products'),

  getById: (id: string) => fetchAPI<Product>(`/products/${id}`),

  create: (product: Product) =>
    fetchAPI<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),

  update: (id: string, updates: Partial<Product>) =>
    fetchAPI<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),

  delete: (id: string) =>
    fetchAPI<void>(`/products/${id}`, {
      method: 'DELETE',
    }),
};

// ==================== OPPORTUNITY API ====================

export const opportunityAPI = {
  getAll: () => fetchAPI<Opportunity[]>('/opportunities'),

  getById: (id: string) => fetchAPI<Opportunity>(`/opportunities/${id}`),

  create: (opportunity: Opportunity) =>
    fetchAPI<Opportunity>('/opportunities', {
      method: 'POST',
      body: JSON.stringify(opportunity),
    }),

  update: (id: string, updates: Partial<Opportunity>) =>
    fetchAPI<Opportunity>(`/opportunities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),

  delete: (id: string) =>
    fetchAPI<void>(`/opportunities/${id}`, {
      method: 'DELETE',
    }),
};

// ==================== DASHBOARD API ====================

export const dashboardAPI = {
  getStats: () => fetchAPI<DashboardStats>('/dashboard/stats'),
};

// ==================== BACKUP API ====================

export interface BackupFile {
  filename: string;
  path: string;
  createdAt: string;
}

export interface DatabaseInfo {
  path: string;
  size: number;
  modified: string;
  created: string;
}

export const backupAPI = {
  // Export all data as JSON (returns download)
  export: async () => {
    const response = await fetch(`${API_BASE}/backup/export`);
    if (!response.ok) throw new Error('Failed to export database');
    return response.json();
  },

  // Import data from JSON
  import: (data: {
    customers: Customer[];
    products: Product[];
    opportunities: Opportunity[];
    customerAircraft: Record<string, AircraftEntry[]>;
  }) =>
    fetchAPI<{ success: boolean; message: string }>('/backup/import', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Save backup to server
  save: () =>
    fetchAPI<{ success: boolean; filename: string; path: string }>('/backup/save', {
      method: 'POST',
    }),

  // List available backups
  list: () => fetchAPI<BackupFile[]>('/backup/list'),

  // Restore from a specific backup
  restore: (filename: string) =>
    fetchAPI<{ success: boolean; message: string }>(`/backup/restore/${filename}`, {
      method: 'POST',
    }),

  // Get database info
  getInfo: () => fetchAPI<DatabaseInfo>('/database/info'),
};

// ==================== HEALTH CHECK ====================

export const healthAPI = {
  check: () => fetchAPI<{ status: string; timestamp: string }>('/health'),
};
