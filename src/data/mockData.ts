import type { Customer, Product, Opportunity, DashboardStats } from '../types';

export const customers: Customer[] = [
  {
    id: '1',
    companyName: 'Boeing Commercial',
    contactName: 'Sarah Mitchell',
    email: 'sarah.mitchell@boeing.com',
    phone: '+1 (206) 555-0142',
    industry: 'airplane',
    address: '100 N Riverside, Chicago, IL 60606',
    createdAt: '2024-01-15',
    notes: 'Key account - requires quarterly reviews',
    status: 'active'
  },
  {
    id: '2',
    companyName: 'DJI Enterprise',
    contactName: 'Wei Chen',
    email: 'w.chen@dji.com',
    phone: '+86 755 2678 5678',
    industry: 'drone',
    address: 'DJI Sky City, Shenzhen, China',
    createdAt: '2024-02-20',
    notes: 'Growing drone manufacturing operations',
    status: 'active'
  },
  {
    id: '3',
    companyName: 'Airbus Helicopters',
    contactName: 'Jean-Pierre Dubois',
    email: 'jp.dubois@airbus.com',
    phone: '+33 5 62 74 74 74',
    industry: 'helicopter',
    address: 'Aéroport de Marignane, France',
    createdAt: '2024-03-10',
    notes: 'European defense contracts',
    status: 'active'
  },
  {
    id: '4',
    companyName: 'Lockheed Martin',
    contactName: 'Robert Hayes',
    email: 'robert.hayes@lmco.com',
    phone: '+1 (301) 555-0198',
    industry: 'airplane',
    address: '6801 Rockledge Dr, Bethesda, MD',
    createdAt: '2024-01-22',
    notes: 'Defense aerospace programs',
    status: 'active'
  },
  {
    id: '5',
    companyName: 'Skydio Inc',
    contactName: 'Emily Frost',
    email: 'emily@skydio.com',
    phone: '+1 (650) 555-0177',
    industry: 'drone',
    address: '114 Hazel Ave, Redwood City, CA',
    createdAt: '2024-04-05',
    notes: 'Autonomous drone technology leader',
    status: 'prospect'
  },
  {
    id: '6',
    companyName: 'Bell Textron',
    contactName: 'Michael Torres',
    email: 'm.torres@bellflight.com',
    phone: '+1 (817) 555-0156',
    industry: 'helicopter',
    address: '3255 Bell Flight Blvd, Fort Worth, TX',
    createdAt: '2024-02-14',
    notes: 'V-22 Osprey component supplier',
    status: 'active'
  },
  {
    id: '7',
    companyName: 'Embraer S.A.',
    contactName: 'Ana Costa',
    email: 'ana.costa@embraer.com',
    phone: '+55 12 3927 5858',
    industry: 'airplane',
    address: 'São José dos Campos, Brazil',
    createdAt: '2024-03-28',
    notes: 'Regional jet manufacturer',
    status: 'active'
  },
  {
    id: '8',
    companyName: 'Parrot Drones',
    contactName: 'Marie Laurent',
    email: 'marie.laurent@parrot.com',
    phone: '+33 1 48 03 60 60',
    industry: 'drone',
    address: '174 Quai de Jemmapes, Paris, France',
    createdAt: '2024-05-12',
    notes: 'Consumer and professional drones',
    status: 'inactive'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'AeroFlow 5000 Check Valve',
    sku: 'AF-5000-CV',
    description: 'High-performance check valve for aviation fuel systems with titanium construction.',
    category: 'Check Valves',
    price: 2450.00,
    specifications: {
      pressureRating: '5000 PSI',
      material: 'Titanium Grade 5',
      connectionType: 'AN Fittings',
      temperature: '-65°F to +450°F'
    },
    industries: ['airplane', 'helicopter'],
    inStock: true,
    imageUrl: '/valves/check-valve.png'
  },
  {
    id: '2',
    name: 'MicroFlow UAV Relief Valve',
    sku: 'MF-UAV-RV-100',
    description: 'Lightweight relief valve designed for unmanned aerial vehicle hydraulic systems.',
    category: 'Relief Valves',
    price: 890.00,
    specifications: {
      pressureRating: '1000 PSI',
      material: 'Aluminum 7075-T6',
      connectionType: 'Miniature Quick-Connect',
      temperature: '-40°F to +250°F'
    },
    industries: ['drone'],
    inStock: true,
    imageUrl: '/valves/relief-valve.png'
  },
  {
    id: '3',
    name: 'HydraControl Servo Valve',
    sku: 'HC-SV-3000',
    description: 'Precision electrohydraulic servo valve for flight control systems.',
    category: 'Servo Valves',
    price: 8750.00,
    specifications: {
      pressureRating: '3000 PSI',
      material: 'Stainless Steel 17-4PH',
      connectionType: 'MS Fittings',
      temperature: '-65°F to +275°F'
    },
    industries: ['airplane', 'helicopter'],
    inStock: true,
    imageUrl: '/valves/servo-valve.png'
  },
  {
    id: '4',
    name: 'AeroShut Emergency Shutoff',
    sku: 'AS-ESV-2000',
    description: 'Fail-safe emergency shutoff valve with redundant actuators for fuel systems.',
    category: 'Shutoff Valves',
    price: 4200.00,
    specifications: {
      pressureRating: '2000 PSI',
      material: 'Inconel 718',
      connectionType: 'Flange Mount',
      temperature: '-65°F to +600°F'
    },
    industries: ['airplane', 'helicopter'],
    inStock: false,
    imageUrl: '/valves/shutoff-valve.png'
  },
  {
    id: '5',
    name: 'NanoFlow Proportional Valve',
    sku: 'NF-PV-500',
    description: 'Ultra-compact proportional valve for precision drone control surfaces.',
    category: 'Proportional Valves',
    price: 1250.00,
    specifications: {
      pressureRating: '500 PSI',
      material: 'Carbon Fiber Composite',
      connectionType: 'Press-Fit',
      temperature: '-30°F to +180°F'
    },
    industries: ['drone'],
    inStock: true,
    imageUrl: '/valves/proportional-valve.png'
  },
  {
    id: '6',
    name: 'RotorSafe Pressure Regulator',
    sku: 'RS-PR-4000',
    description: 'Heavy-duty pressure regulator for helicopter rotor hydraulic systems.',
    category: 'Pressure Regulators',
    price: 3600.00,
    specifications: {
      pressureRating: '4000 PSI',
      material: 'Titanium Grade 5',
      connectionType: 'SAE O-Ring Boss',
      temperature: '-65°F to +400°F'
    },
    industries: ['helicopter'],
    inStock: true,
    imageUrl: '/valves/pressure-regulator.png'
  },
  {
    id: '7',
    name: 'JetStream Flow Control',
    sku: 'JS-FC-6000',
    description: 'Advanced flow control valve for jet engine fuel metering systems.',
    category: 'Flow Control Valves',
    price: 12500.00,
    specifications: {
      pressureRating: '6000 PSI',
      material: 'Hastelloy C-276',
      connectionType: 'Dual Flange',
      temperature: '-65°F to +800°F'
    },
    industries: ['airplane'],
    inStock: true,
    imageUrl: '/valves/flow-control-valve.png'
  },
  {
    id: '8',
    name: 'MultiPort Selector Valve',
    sku: 'MP-SV-2500',
    description: 'Multi-position selector valve for hydraulic system routing.',
    category: 'Selector Valves',
    price: 5800.00,
    specifications: {
      pressureRating: '2500 PSI',
      material: 'Stainless Steel 316L',
      connectionType: 'MS Fittings',
      temperature: '-65°F to +350°F'
    },
    industries: ['airplane', 'helicopter', 'drone'],
    inStock: true,
    imageUrl: '/valves/selector-valve.png'
  }
];

export const opportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Boeing 787 Fuel System Upgrade',
    customerId: '1',
    customerName: 'Boeing Commercial',
    products: [
      { productId: '1', productName: 'AeroFlow 5000 Check Valve', quantity: 200, price: 2450 },
      { productId: '7', productName: 'JetStream Flow Control', quantity: 50, price: 12500 }
    ],
    stage: 'negotiation',
    value: 1115000,
    probability: 75,
    expectedCloseDate: '2024-08-15',
    createdAt: '2024-03-01',
    notes: 'Final pricing discussion scheduled for next week',
    industry: 'airplane'
  },
  {
    id: '2',
    title: 'DJI Matrice Series Valve Kit',
    customerId: '2',
    customerName: 'DJI Enterprise',
    products: [
      { productId: '2', productName: 'MicroFlow UAV Relief Valve', quantity: 5000, price: 890 },
      { productId: '5', productName: 'NanoFlow Proportional Valve', quantity: 3000, price: 1250 }
    ],
    stage: 'proposal',
    value: 8200000,
    probability: 50,
    expectedCloseDate: '2024-09-30',
    createdAt: '2024-04-12',
    notes: 'Proposal submitted, awaiting feedback from engineering team',
    industry: 'drone'
  },
  {
    id: '3',
    title: 'Airbus H175 Hydraulic Package',
    customerId: '3',
    customerName: 'Airbus Helicopters',
    products: [
      { productId: '3', productName: 'HydraControl Servo Valve', quantity: 100, price: 8750 },
      { productId: '6', productName: 'RotorSafe Pressure Regulator', quantity: 150, price: 3600 }
    ],
    stage: 'qualified',
    value: 1415000,
    probability: 40,
    expectedCloseDate: '2024-11-20',
    createdAt: '2024-05-08',
    notes: 'Technical evaluation in progress',
    industry: 'helicopter'
  },
  {
    id: '4',
    title: 'F-35 Component Supply Contract',
    customerId: '4',
    customerName: 'Lockheed Martin',
    products: [
      { productId: '4', productName: 'AeroShut Emergency Shutoff', quantity: 500, price: 4200 },
      { productId: '1', productName: 'AeroFlow 5000 Check Valve', quantity: 800, price: 2450 }
    ],
    stage: 'closed_won',
    value: 4060000,
    probability: 100,
    expectedCloseDate: '2024-06-01',
    createdAt: '2024-01-20',
    notes: 'Contract signed - production schedule confirmed',
    industry: 'airplane'
  },
  {
    id: '5',
    title: 'Skydio X2 Fleet Upgrade',
    customerId: '5',
    customerName: 'Skydio Inc',
    products: [
      { productId: '5', productName: 'NanoFlow Proportional Valve', quantity: 2000, price: 1250 }
    ],
    stage: 'lead',
    value: 2500000,
    probability: 20,
    expectedCloseDate: '2024-12-15',
    createdAt: '2024-06-01',
    notes: 'Initial contact - needs discovery call',
    industry: 'drone'
  },
  {
    id: '6',
    title: 'Bell V-280 Valor Program',
    customerId: '6',
    customerName: 'Bell Textron',
    products: [
      { productId: '3', productName: 'HydraControl Servo Valve', quantity: 60, price: 8750 },
      { productId: '8', productName: 'MultiPort Selector Valve', quantity: 120, price: 5800 }
    ],
    stage: 'closed_won',
    value: 1221000,
    probability: 100,
    expectedCloseDate: '2024-05-20',
    createdAt: '2024-02-10',
    notes: 'Long-term supply agreement in place',
    industry: 'helicopter'
  },
  {
    id: '7',
    title: 'Embraer E2 Production Line',
    customerId: '7',
    customerName: 'Embraer S.A.',
    products: [
      { productId: '7', productName: 'JetStream Flow Control', quantity: 30, price: 12500 },
      { productId: '1', productName: 'AeroFlow 5000 Check Valve', quantity: 100, price: 2450 }
    ],
    stage: 'proposal',
    value: 620000,
    probability: 60,
    expectedCloseDate: '2024-10-01',
    createdAt: '2024-04-28',
    notes: 'Competitive bid situation with two other suppliers',
    industry: 'airplane'
  },
  {
    id: '8',
    title: 'Parrot ANAFI Government',
    customerId: '8',
    customerName: 'Parrot Drones',
    products: [
      { productId: '2', productName: 'MicroFlow UAV Relief Valve', quantity: 500, price: 890 }
    ],
    stage: 'closed_lost',
    value: 445000,
    probability: 0,
    expectedCloseDate: '2024-04-30',
    createdAt: '2024-02-15',
    notes: 'Lost to competitor - price sensitivity',
    industry: 'drone'
  }
];

export const dashboardStats: DashboardStats = {
  totalRevenue: 5281000,
  activeCustomers: 6,
  openOpportunities: 5,
  pipelineValue: 13850000,
  conversionRate: 33.3,
  industryBreakdown: {
    airplane: 5795000,
    drone: 10700000,
    helicopter: 2636000
  }
};
