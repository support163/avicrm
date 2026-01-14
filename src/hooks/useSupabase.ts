import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Customer, Product, Opportunity, OpportunityWithCustomer, OpportunityWithProducts } from '../types/database';

// Hook for fetching customers
export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('company_name');

      if (error) throw error;
      setCustomers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  }

  return { customers, loading, error, refetch: fetchCustomers };
}

// Hook for fetching products
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }

  return { products, loading, error, refetch: fetchProducts };
}

// Hook for fetching opportunities with customer names and products
export function useOpportunities() {
  const [opportunities, setOpportunities] = useState<OpportunityWithProducts[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  async function fetchOpportunities() {
    try {
      setLoading(true);

      // Fetch opportunities with customer name from view
      const { data: oppsData, error: oppsError } = await supabase
        .from('opportunities_with_customer')
        .select('*')
        .order('created_at', { ascending: false });

      if (oppsError) throw oppsError;

      // Fetch opportunity products with product names
      const { data: productsData, error: productsError } = await supabase
        .from('opportunity_products')
        .select(`
          opportunity_id,
          product_id,
          quantity,
          price,
          products (name)
        `);

      if (productsError) throw productsError;

      // Map products to opportunities
      const opportunitiesWithProducts: OpportunityWithProducts[] = (oppsData || []).map((opp: OpportunityWithCustomer) => {
        const oppProducts = (productsData || [])
          .filter((p: { opportunity_id: string }) => p.opportunity_id === opp.id)
          .map((p: { product_id: string; quantity: number; price: number; products: { name: string } }) => ({
            productId: p.product_id,
            productName: p.products?.name || 'Unknown Product',
            quantity: p.quantity,
            price: p.price
          }));

        return {
          ...opp,
          products: oppProducts
        };
      });

      setOpportunities(opportunitiesWithProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch opportunities');
    } finally {
      setLoading(false);
    }
  }

  return { opportunities, loading, error, refetch: fetchOpportunities };
}

// Hook for fetching dashboard stats (computed from data)
export function useDashboardStats() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeCustomers: 0,
    openOpportunities: 0,
    pipelineValue: 0,
    conversionRate: 0,
    industryBreakdown: {
      airplane: 0,
      drone: 0,
      helicopter: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      setLoading(true);

      // Fetch customers count
      const { count: activeCustomers, error: custError } = await supabase
        .from('customers')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      if (custError) throw custError;

      // Fetch all opportunities
      const { data: opportunitiesData, error: oppsError } = await supabase
        .from('opportunities')
        .select('*');

      if (oppsError) throw oppsError;

      const opportunities = opportunitiesData as Opportunity[] || [];

      // Calculate stats
      const closedWon = opportunities.filter(o => o.stage === 'closed_won');
      const openOpps = opportunities.filter(o => !o.stage.startsWith('closed'));
      const allClosed = opportunities.filter(o => o.stage.startsWith('closed'));

      const totalRevenue = closedWon.reduce((sum, o) => sum + Number(o.value), 0);
      const pipelineValue = openOpps.reduce((sum, o) => sum + Number(o.value), 0);
      const conversionRate = allClosed.length > 0
        ? (closedWon.length / allClosed.length) * 100
        : 0;

      // Industry breakdown (from closed won)
      const industryBreakdown = {
        airplane: closedWon.filter(o => o.industry === 'airplane').reduce((sum, o) => sum + Number(o.value), 0),
        drone: closedWon.filter(o => o.industry === 'drone').reduce((sum, o) => sum + Number(o.value), 0),
        helicopter: closedWon.filter(o => o.industry === 'helicopter').reduce((sum, o) => sum + Number(o.value), 0)
      };

      setStats({
        totalRevenue,
        activeCustomers: activeCustomers || 0,
        openOpportunities: openOpps.length,
        pipelineValue,
        conversionRate: Math.round(conversionRate * 10) / 10,
        industryBreakdown
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  }

  return { stats, loading, error, refetch: fetchStats };
}
