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
  // Ball Valves
  {
    id: '1',
    name: 'AV-100 Ball Shut-Off Valve',
    sku: 'AV-BV-SO-100',
    description: 'Precision ball shut-off valve for aviation fuel and hydraulic systems. Full bore design ensures maximum flow with minimal pressure drop.',
    category: 'Ball Valves',
    price: 1850.00,
    specifications: {
      pressureRating: '3000 PSI',
      material: 'Stainless Steel 316L',
      connectionType: 'AN Fittings',
      temperature: '-65°F to +400°F'
    },
    industries: ['airplane', 'helicopter'],
    inStock: true,
    imageUrl: '/valves/ball-shutoff.png'
  },
  {
    id: '2',
    name: 'AV-150 Ball Drain Valve',
    sku: 'AV-BV-DR-150',
    description: 'Quick-action ball drain valve for fuel tank and sump applications. Features positive sealing and corrosion-resistant construction.',
    category: 'Ball Valves',
    price: 1250.00,
    specifications: {
      pressureRating: '1500 PSI',
      material: 'Aluminum 7075-T6',
      connectionType: 'MS Fittings',
      temperature: '-65°F to +275°F'
    },
    industries: ['airplane', 'helicopter', 'drone'],
    inStock: true,
    imageUrl: '/valves/ball-drain.png'
  },
  {
    id: '3',
    name: 'AV-200 Flow Control Ball Valve',
    sku: 'AV-BV-FC-200',
    description: 'Variable position ball valve for precise flow control in fuel metering and hydraulic systems.',
    category: 'Ball Valves',
    price: 2650.00,
    specifications: {
      pressureRating: '5000 PSI',
      material: 'Titanium Grade 5',
      connectionType: 'Flange Mount',
      temperature: '-65°F to +450°F'
    },
    industries: ['airplane', 'helicopter'],
    inStock: true,
    imageUrl: '/valves/ball-flow-control.png'
  },
  {
    id: '4',
    name: 'AV-250 Remote Motor Operated Valve',
    sku: 'AV-BV-RMO-250',
    description: 'Electrically actuated ball valve with position feedback for remote operation. Ideal for fire suppression and fuel management systems.',
    category: 'Ball Valves',
    price: 4500.00,
    specifications: {
      pressureRating: '3000 PSI',
      material: 'Inconel 718',
      connectionType: 'SAE O-Ring Boss',
      temperature: '-65°F to +600°F'
    },
    industries: ['airplane', 'helicopter'],
    inStock: false,
    imageUrl: '/valves/ball-motor-operated.png'
  },
  // Drain Valves
  {
    id: '5',
    name: 'AV-300 Poppet Drain Valve',
    sku: 'AV-DV-POP-300',
    description: 'Spring-loaded poppet style drain valve for fuel sumps and water drain applications. Push-to-drain operation.',
    category: 'Drain Valves',
    price: 650.00,
    specifications: {
      pressureRating: '500 PSI',
      material: 'Stainless Steel 303',
      connectionType: 'Threaded',
      temperature: '-65°F to +250°F'
    },
    industries: ['airplane', 'helicopter', 'drone'],
    inStock: true,
    imageUrl: '/valves/drain-poppet.png'
  },
  {
    id: '6',
    name: 'AV-350 Solenoid Drain Valve',
    sku: 'AV-DV-SOL-350',
    description: 'Electrically actuated solenoid drain valve for automated fuel management systems. Fail-safe normally closed design.',
    category: 'Drain Valves',
    price: 1450.00,
    specifications: {
      pressureRating: '1000 PSI',
      material: 'Aluminum Bronze',
      connectionType: 'AN Fittings',
      temperature: '-40°F to +300°F'
    },
    industries: ['airplane', 'helicopter'],
    inStock: true,
    imageUrl: '/valves/drain-solenoid.png'
  },
  // Float Valves
  {
    id: '7',
    name: 'AV-400 Float Arm Valve',
    sku: 'AV-FV-ARM-400',
    description: 'Mechanical float arm style valve for fuel level control and overflow prevention in aircraft tanks.',
    category: 'Float Valves',
    price: 980.00,
    specifications: {
      pressureRating: '150 PSI',
      material: 'Stainless Steel 316',
      connectionType: 'Flange Mount',
      temperature: '-65°F to +200°F'
    },
    industries: ['airplane', 'helicopter'],
    inStock: true,
    imageUrl: '/valves/float-arm.png'
  },
  {
    id: '8',
    name: 'AV-450 Guided Float Valve',
    sku: 'AV-FV-GF-450',
    description: 'Precision guided float valve for accurate fuel level control. Vertical mounting with anti-slosh design.',
    category: 'Float Valves',
    price: 1350.00,
    specifications: {
      pressureRating: '200 PSI',
      material: 'Titanium Grade 2',
      connectionType: 'MS Fittings',
      temperature: '-65°F to +275°F'
    },
    industries: ['airplane', 'helicopter', 'drone'],
    inStock: true,
    imageUrl: '/valves/float-guided.png'
  },
  // Check Valves
  {
    id: '9',
    name: 'AV-500 Poppet Check Valve',
    sku: 'AV-CV-POP-500',
    description: 'High-flow poppet style check valve for fuel and hydraulic systems. Low cracking pressure with positive sealing.',
    category: 'Check Valves',
    price: 1150.00,
    specifications: {
      pressureRating: '5000 PSI',
      material: 'Stainless Steel 17-4PH',
      connectionType: 'AN Fittings',
      temperature: '-65°F to +400°F'
    },
    industries: ['airplane', 'helicopter'],
    inStock: true,
    imageUrl: '/valves/check-poppet.png'
  },
  {
    id: '10',
    name: 'AV-550 Swing Check Valve',
    sku: 'AV-CV-SW-550',
    description: 'Flapper style swing check valve for low-pressure fuel transfer systems. Lightweight design for weight-critical applications.',
    category: 'Check Valves',
    price: 890.00,
    specifications: {
      pressureRating: '1000 PSI',
      material: 'Aluminum 6061-T6',
      connectionType: 'Threaded',
      temperature: '-65°F to +250°F'
    },
    industries: ['airplane', 'drone'],
    inStock: true,
    imageUrl: '/valves/check-swing.png'
  },
  {
    id: '11',
    name: 'AV-600 Split Butterfly Check Valve',
    sku: 'AV-CV-SB-600',
    description: 'Dual-flapper split butterfly check valve for bi-directional sealing. Ideal for fuel crossfeed systems.',
    category: 'Check Valves',
    price: 1650.00,
    specifications: {
      pressureRating: '3000 PSI',
      material: 'Titanium Grade 5',
      connectionType: 'Flange Mount',
      temperature: '-65°F to +450°F'
    },
    industries: ['airplane', 'helicopter'],
    inStock: true,
    imageUrl: '/valves/check-butterfly.png'
  },
  // Pressure Vent Valves
  {
    id: '12',
    name: 'AV-700 In-Line Pressure Vent',
    sku: 'AV-PV-IL-700',
    description: 'In-line pressure/vacuum vent valve for fuel tank breathing. Prevents tank collapse and over-pressurization.',
    category: 'Pressure Vent Valves',
    price: 1250.00,
    specifications: {
      pressureRating: '50 PSI',
      material: 'Aluminum 7075-T6',
      connectionType: 'AN Fittings',
      temperature: '-65°F to +275°F'
    },
    industries: ['airplane', 'helicopter', 'drone'],
    inStock: true,
    imageUrl: '/valves/vent-inline.png'
  },
  {
    id: '13',
    name: 'AV-750 Tank Mount Vent Valve',
    sku: 'AV-PV-TM-750',
    description: 'Direct tank-mounted vent valve with ice protection. Maintains tank pressure equilibrium during altitude changes.',
    category: 'Pressure Vent Valves',
    price: 1850.00,
    specifications: {
      pressureRating: '75 PSI',
      material: 'Stainless Steel 316L',
      connectionType: 'Flange Mount',
      temperature: '-65°F to +300°F'
    },
    industries: ['airplane', 'helicopter'],
    inStock: true,
    imageUrl: '/valves/vent-tank.png'
  },
  // Hydraulic Valves
  {
    id: '14',
    name: 'AV-800 Hydraulic Regulator Valve',
    sku: 'AV-HV-REG-800',
    description: 'Precision hydraulic pressure regulator for flight control systems. Maintains constant downstream pressure.',
    category: 'Hydraulic Valves',
    price: 3450.00,
    specifications: {
      pressureRating: '5000 PSI',
      material: 'Stainless Steel 17-4PH',
      connectionType: 'MS Fittings',
      temperature: '-65°F to +275°F'
    },
    industries: ['airplane', 'helicopter'],
    inStock: true,
    imageUrl: '/valves/hydraulic-regulator.png'
  },
  {
    id: '15',
    name: 'AV-850 Relief/Dump Valve',
    sku: 'AV-HV-RD-850',
    description: 'Combination relief and dump valve for hydraulic system protection. Adjustable relief pressure with manual dump override.',
    category: 'Hydraulic Valves',
    price: 2850.00,
    specifications: {
      pressureRating: '6000 PSI',
      material: 'Titanium Grade 5',
      connectionType: 'SAE O-Ring Boss',
      temperature: '-65°F to +400°F'
    },
    industries: ['airplane', 'helicopter'],
    inStock: true,
    imageUrl: '/valves/hydraulic-relief.png'
  },
  {
    id: '16',
    name: 'AV-900 Hydraulic Control Valve',
    sku: 'AV-HV-CTL-900',
    description: 'Multi-function hydraulic control valve for actuator systems. Proportional control with position feedback.',
    category: 'Hydraulic Valves',
    price: 5200.00,
    specifications: {
      pressureRating: '5000 PSI',
      material: 'Inconel 625',
      connectionType: 'Flange Mount',
      temperature: '-65°F to +500°F'
    },
    industries: ['airplane', 'helicopter'],
    inStock: false,
    imageUrl: '/valves/hydraulic-control.png'
  },
  // Fill Caps
  {
    id: '17',
    name: 'AV-1000 Gravity Fuel Fill Cap',
    sku: 'AV-FC-GF-1000',
    description: 'Flush-mounted gravity fuel fill cap with vented design. Quick-release locking mechanism with fuel-resistant seals.',
    category: 'Fill Caps',
    price: 485.00,
    specifications: {
      pressureRating: '25 PSI',
      material: 'Aluminum 6061-T6',
      connectionType: 'Bayonet Mount',
      temperature: '-65°F to +200°F'
    },
    industries: ['airplane', 'helicopter', 'drone'],
    inStock: true,
    imageUrl: '/valves/fillcap-fuel.png'
  },
  {
    id: '18',
    name: 'AV-1050 Gravity Oil Fill Cap',
    sku: 'AV-FC-GO-1050',
    description: 'Engine oil fill cap with integrated dipstick provision. High-temperature resistant with positive locking.',
    category: 'Fill Caps',
    price: 325.00,
    specifications: {
      pressureRating: '15 PSI',
      material: 'Stainless Steel 303',
      connectionType: 'Threaded',
      temperature: '-40°F to +400°F'
    },
    industries: ['airplane', 'helicopter'],
    inStock: true,
    imageUrl: '/valves/fillcap-oil.png'
  },
  // Build to Print Services
  {
    id: '19',
    name: 'Build to Print Service',
    sku: 'AV-SVC-BTP',
    description: 'Custom manufacturing service for customer-supplied drawings and specifications. Full AS9100 quality system compliance.',
    category: 'Services',
    price: 0.00,
    specifications: {
      pressureRating: 'Per Customer Spec',
      material: 'Per Customer Spec',
      connectionType: 'Per Customer Spec',
      temperature: 'Per Customer Spec'
    },
    industries: ['airplane', 'helicopter', 'drone'],
    inStock: true,
    imageUrl: '/valves/service-btp.png'
  },
  {
    id: '20',
    name: 'Build to Spec Service',
    sku: 'AV-SVC-BTS',
    description: 'Custom valve design and manufacturing to customer performance specifications. Engineering support from concept to production.',
    category: 'Services',
    price: 0.00,
    specifications: {
      pressureRating: 'Per Customer Spec',
      material: 'Per Customer Spec',
      connectionType: 'Per Customer Spec',
      temperature: 'Per Customer Spec'
    },
    industries: ['airplane', 'helicopter', 'drone'],
    inStock: true,
    imageUrl: '/valves/service-bts.png'
  }
];

export const opportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Boeing 787 Fuel System Upgrade',
    customerId: '1',
    customerName: 'Boeing Commercial',
    products: [
      { productId: '9', productName: 'AV-500 Poppet Check Valve', quantity: 200, price: 1150 },
      { productId: '3', productName: 'AV-200 Flow Control Ball Valve', quantity: 50, price: 2650 }
    ],
    stage: 'negotiation',
    value: 362500,
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
      { productId: '5', productName: 'AV-300 Poppet Drain Valve', quantity: 5000, price: 650 },
      { productId: '12', productName: 'AV-700 In-Line Pressure Vent', quantity: 3000, price: 1250 }
    ],
    stage: 'proposal',
    value: 7000000,
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
      { productId: '14', productName: 'AV-800 Hydraulic Regulator Valve', quantity: 100, price: 3450 },
      { productId: '15', productName: 'AV-850 Relief/Dump Valve', quantity: 150, price: 2850 }
    ],
    stage: 'qualified',
    value: 772500,
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
      { productId: '4', productName: 'AV-250 Remote Motor Operated Valve', quantity: 500, price: 4500 },
      { productId: '1', productName: 'AV-100 Ball Shut-Off Valve', quantity: 800, price: 1850 }
    ],
    stage: 'closed_won',
    value: 3730000,
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
      { productId: '10', productName: 'AV-550 Swing Check Valve', quantity: 2000, price: 890 },
      { productId: '17', productName: 'AV-1000 Gravity Fuel Fill Cap', quantity: 2000, price: 485 }
    ],
    stage: 'lead',
    value: 2750000,
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
      { productId: '16', productName: 'AV-900 Hydraulic Control Valve', quantity: 60, price: 5200 },
      { productId: '7', productName: 'AV-400 Float Arm Valve', quantity: 120, price: 980 }
    ],
    stage: 'closed_won',
    value: 429600,
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
      { productId: '11', productName: 'AV-600 Split Butterfly Check Valve', quantity: 30, price: 1650 },
      { productId: '13', productName: 'AV-750 Tank Mount Vent Valve', quantity: 100, price: 1850 }
    ],
    stage: 'proposal',
    value: 234500,
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
      { productId: '2', productName: 'AV-150 Ball Drain Valve', quantity: 500, price: 1250 }
    ],
    stage: 'closed_lost',
    value: 625000,
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
