export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type IndustryType = 'airplane' | 'drone' | 'helicopter'
export type OpportunityStage = 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost'
export type CustomerStatus = 'active' | 'inactive' | 'prospect'

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string
          company_name: string
          contact_name: string
          email: string
          phone: string
          industry: IndustryType
          address: string
          created_at: string
          notes: string | null
          status: CustomerStatus
        }
        Insert: {
          id?: string
          company_name: string
          contact_name: string
          email: string
          phone: string
          industry: IndustryType
          address: string
          created_at?: string
          notes?: string | null
          status?: CustomerStatus
        }
        Update: {
          id?: string
          company_name?: string
          contact_name?: string
          email?: string
          phone?: string
          industry?: IndustryType
          address?: string
          created_at?: string
          notes?: string | null
          status?: CustomerStatus
        }
      }
      products: {
        Row: {
          id: string
          name: string
          sku: string
          description: string | null
          category: string
          price: number
          specifications: {
            pressureRating: string
            material: string
            connectionType: string
            temperature: string
          }
          industries: IndustryType[]
          in_stock: boolean
          image_url: string | null
        }
        Insert: {
          id?: string
          name: string
          sku: string
          description?: string | null
          category: string
          price: number
          specifications?: {
            pressureRating: string
            material: string
            connectionType: string
            temperature: string
          }
          industries?: IndustryType[]
          in_stock?: boolean
          image_url?: string | null
        }
        Update: {
          id?: string
          name?: string
          sku?: string
          description?: string | null
          category?: string
          price?: number
          specifications?: {
            pressureRating: string
            material: string
            connectionType: string
            temperature: string
          }
          industries?: IndustryType[]
          in_stock?: boolean
          image_url?: string | null
        }
      }
      opportunities: {
        Row: {
          id: string
          title: string
          customer_id: string
          stage: OpportunityStage
          value: number
          probability: number
          expected_close_date: string
          created_at: string
          notes: string | null
          industry: IndustryType
        }
        Insert: {
          id?: string
          title: string
          customer_id: string
          stage?: OpportunityStage
          value: number
          probability: number
          expected_close_date: string
          created_at?: string
          notes?: string | null
          industry: IndustryType
        }
        Update: {
          id?: string
          title?: string
          customer_id?: string
          stage?: OpportunityStage
          value?: number
          probability?: number
          expected_close_date?: string
          created_at?: string
          notes?: string | null
          industry?: IndustryType
        }
      }
      opportunity_products: {
        Row: {
          id: string
          opportunity_id: string
          product_id: string
          quantity: number
          price: number
        }
        Insert: {
          id?: string
          opportunity_id: string
          product_id: string
          quantity: number
          price: number
        }
        Update: {
          id?: string
          opportunity_id?: string
          product_id?: string
          quantity?: number
          price?: number
        }
      }
    }
    Views: {
      opportunities_with_customer: {
        Row: {
          id: string
          title: string
          customer_id: string
          customer_name: string
          stage: OpportunityStage
          value: number
          probability: number
          expected_close_date: string
          created_at: string
          notes: string | null
          industry: IndustryType
        }
      }
    }
  }
}

// Convenience types for use in components
export type Customer = Database['public']['Tables']['customers']['Row']
export type Product = Database['public']['Tables']['products']['Row']
export type Opportunity = Database['public']['Tables']['opportunities']['Row']
export type OpportunityProduct = Database['public']['Tables']['opportunity_products']['Row']
export type OpportunityWithCustomer = Database['public']['Views']['opportunities_with_customer']['Row']

// Type with products included (for frontend use)
export type OpportunityWithProducts = OpportunityWithCustomer & {
  products: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
  }>
}
