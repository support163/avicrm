export type IndustryType = 'airplane' | 'drone' | 'helicopter';

export type OpportunityStage = 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';

export interface Customer {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  industry: IndustryType;
  address: string;
  createdAt: string;
  notes: string;
  status: 'active' | 'inactive' | 'prospect';
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  category: string;
  price: number;
  specifications: {
    pressureRating: string;
    material: string;
    connectionType: string;
    temperature: string;
  };
  industries: IndustryType[];
  inStock: boolean;
  imageUrl: string;
}

export interface Opportunity {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  products: { productId: string; productName: string; quantity: number; price: number }[];
  stage: OpportunityStage;
  value: number;
  probability: number;
  expectedCloseDate: string;
  createdAt: string;
  notes: string;
  industry: IndustryType;
}

export interface DashboardStats {
  totalRevenue: number;
  activeCustomers: number;
  openOpportunities: number;
  pipelineValue: number;
  conversionRate: number;
  industryBreakdown: {
    airplane: number;
    drone: number;
    helicopter: number;
  };
}
