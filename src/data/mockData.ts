import type { Customer, Product, Opportunity, DashboardStats } from '../types';

export const customers: Customer[] = [
  // Commercial Aircraft Manufacturers
  {
    id: '1',
    companyName: 'Boeing Commercial Airplanes',
    contactName: 'Sarah Mitchell',
    email: 'sarah.mitchell@boeing.com',
    phone: '+1 (206) 555-0142',
    industry: 'airplane',
    address: '100 N Riverside, Chicago, IL 60606',
    createdAt: '2024-01-15',
    notes: 'Key account - 737 MAX, 777, 787 Dreamliner programs',
    status: 'active'
  },
  {
    id: '2',
    companyName: 'Airbus Commercial Aircraft',
    contactName: 'François Martin',
    email: 'f.martin@airbus.com',
    phone: '+33 5 61 93 33 33',
    industry: 'airplane',
    address: '1 Rond-Point Maurice Bellonte, Toulouse, France',
    createdAt: '2024-01-20',
    notes: 'A320neo family, A350, A380 programs - major European account',
    status: 'active'
  },
  {
    id: '3',
    companyName: 'Embraer S.A.',
    contactName: 'Ana Costa',
    email: 'ana.costa@embraer.com',
    phone: '+55 12 3927 5858',
    industry: 'airplane',
    address: 'São José dos Campos, Brazil',
    createdAt: '2024-02-10',
    notes: 'E-Jet E2 series, Phenom and Praetor business jets',
    status: 'active'
  },
  {
    id: '4',
    companyName: 'Bombardier Aviation',
    contactName: 'Marc Tremblay',
    email: 'm.tremblay@bombardier.com',
    phone: '+1 (514) 555-0188',
    industry: 'airplane',
    address: '400 Côte-Vertu Road West, Montreal, QC, Canada',
    createdAt: '2024-02-15',
    notes: 'Global 7500/8000, Challenger series business jets',
    status: 'active'
  },
  {
    id: '5',
    companyName: 'COMAC',
    contactName: 'Li Wei',
    email: 'li.wei@comac.cc',
    phone: '+86 21 2032 0000',
    industry: 'airplane',
    address: 'Shanghai, China',
    createdAt: '2024-03-01',
    notes: 'C919 narrow-body, ARJ21 regional jet - growing Chinese market',
    status: 'prospect'
  },
  // Business Jet Manufacturers
  {
    id: '6',
    companyName: 'Gulfstream Aerospace',
    contactName: 'David Thompson',
    email: 'd.thompson@gulfstream.com',
    phone: '+1 (912) 555-0145',
    industry: 'airplane',
    address: '500 Gulfstream Road, Savannah, GA',
    createdAt: '2024-01-25',
    notes: 'G700, G650, G500/G600 ultra-long range jets',
    status: 'active'
  },
  {
    id: '7',
    companyName: 'Dassault Aviation',
    contactName: 'Pierre Lefebvre',
    email: 'p.lefebvre@dassault-aviation.com',
    phone: '+33 1 47 11 40 00',
    industry: 'airplane',
    address: '78 Quai Marcel Dassault, Saint-Cloud, France',
    createdAt: '2024-02-05',
    notes: 'Falcon 8X, 6X, 10X business jets - European defense contracts',
    status: 'active'
  },
  {
    id: '8',
    companyName: 'Textron Aviation (Cessna)',
    contactName: 'Jennifer Adams',
    email: 'j.adams@txtav.com',
    phone: '+1 (316) 555-0167',
    industry: 'airplane',
    address: 'One Cessna Boulevard, Wichita, KS',
    createdAt: '2024-02-20',
    notes: 'Citation series jets, Caravan turboprops',
    status: 'active'
  },
  // Helicopter Manufacturers
  {
    id: '9',
    companyName: 'Airbus Helicopters',
    contactName: 'Jean-Pierre Dubois',
    email: 'jp.dubois@airbus.com',
    phone: '+33 5 62 74 74 74',
    industry: 'helicopter',
    address: 'Aéroport de Marignane, France',
    createdAt: '2024-01-18',
    notes: 'H125, H145, H160, Tiger, NH90 programs',
    status: 'active'
  },
  {
    id: '10',
    companyName: 'Bell Textron',
    contactName: 'Michael Torres',
    email: 'm.torres@bellflight.com',
    phone: '+1 (817) 555-0156',
    industry: 'helicopter',
    address: '3255 Bell Flight Blvd, Fort Worth, TX',
    createdAt: '2024-01-22',
    notes: 'Bell 407/429/505, V-280 Valor tiltrotor, V-22 Osprey',
    status: 'active'
  },
  {
    id: '11',
    companyName: 'Sikorsky (Lockheed Martin)',
    contactName: 'Robert Hayes',
    email: 'robert.hayes@lmco.com',
    phone: '+1 (203) 555-0198',
    industry: 'helicopter',
    address: '6900 Main Street, Stratford, CT',
    createdAt: '2024-02-01',
    notes: 'UH-60 Black Hawk, CH-53K King Stallion, S-76/S-92 commercial',
    status: 'active'
  },
  {
    id: '12',
    companyName: 'Leonardo Helicopters',
    contactName: 'Marco Rossi',
    email: 'm.rossi@leonardo.com',
    phone: '+39 06 324731',
    industry: 'helicopter',
    address: 'Piazza Monte Grappa, Rome, Italy',
    createdAt: '2024-02-12',
    notes: 'AW139, AW169, AW609 tiltrotor, AW101 military',
    status: 'active'
  },
  // Defense/Military Manufacturers
  {
    id: '13',
    companyName: 'Lockheed Martin Aeronautics',
    contactName: 'Karen Williams',
    email: 'k.williams@lmco.com',
    phone: '+1 (301) 555-0134',
    industry: 'airplane',
    address: '6801 Rockledge Dr, Bethesda, MD',
    createdAt: '2024-01-10',
    notes: 'F-35 Lightning II, F-16, C-130J programs',
    status: 'active'
  },
  {
    id: '14',
    companyName: 'Northrop Grumman',
    contactName: 'James Peterson',
    email: 'j.peterson@ngc.com',
    phone: '+1 (703) 555-0189',
    industry: 'drone',
    address: '2980 Fairview Park Drive, Falls Church, VA',
    createdAt: '2024-02-08',
    notes: 'RQ-4 Global Hawk, MQ-4C Triton, B-21 Raider',
    status: 'active'
  },
  // UAS/Drone Manufacturers
  {
    id: '15',
    companyName: 'General Atomics Aeronautical',
    contactName: 'Steven Clark',
    email: 's.clark@ga-asi.com',
    phone: '+1 (858) 555-0177',
    industry: 'drone',
    address: '14200 Kirkham Way, Poway, CA',
    createdAt: '2024-01-28',
    notes: 'MQ-9 Reaper, MQ-9B SkyGuardian, Gray Eagle - major MALE UAS supplier',
    status: 'active'
  },
  {
    id: '16',
    companyName: 'Anduril Industries',
    contactName: 'Emily Chen',
    email: 'e.chen@anduril.com',
    phone: '+1 (949) 555-0166',
    industry: 'drone',
    address: '2272 Michelson Drive, Irvine, CA',
    createdAt: '2024-03-15',
    notes: 'Ghost, Altius autonomous systems, CCA prototypes - emerging defense tech',
    status: 'active'
  },
  {
    id: '17',
    companyName: 'Kratos Defense',
    contactName: 'Brian Miller',
    email: 'b.miller@kratosdefense.com',
    phone: '+1 (858) 555-0144',
    industry: 'drone',
    address: '10680 Treena Street, San Diego, CA',
    createdAt: '2024-03-20',
    notes: 'XQ-58A Valkyrie, target drones, low-cost attritable aircraft',
    status: 'prospect'
  },
  {
    id: '18',
    companyName: 'AeroVironment',
    contactName: 'Lisa Anderson',
    email: 'l.anderson@avinc.com',
    phone: '+1 (805) 555-0155',
    industry: 'drone',
    address: '800 Royal Oaks Drive, Monrovia, CA',
    createdAt: '2024-02-25',
    notes: 'Switchblade loitering munitions, Raven, Puma tactical ISR',
    status: 'active'
  },
  {
    id: '19',
    companyName: 'Baykar Technologies',
    contactName: 'Ahmet Yilmaz',
    email: 'a.yilmaz@baykartech.com',
    phone: '+90 212 555 0188',
    industry: 'drone',
    address: 'Istanbul, Turkey',
    createdAt: '2024-04-01',
    notes: 'Bayraktar TB2, Akıncı MALE UAS - high export demand',
    status: 'active'
  },
  {
    id: '20',
    companyName: 'Israel Aerospace Industries',
    contactName: 'David Cohen',
    email: 'd.cohen@iai.co.il',
    phone: '+972 3 935 8111',
    industry: 'drone',
    address: 'Ben Gurion International Airport, Israel',
    createdAt: '2024-03-10',
    notes: 'Heron, Eitan (Heron TP), Harop loitering munition',
    status: 'active'
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
  // Commercial Aircraft
  {
    id: '1',
    title: 'Boeing 787 Dreamliner Fuel System Upgrade',
    customerId: '1',
    customerName: 'Boeing Commercial Airplanes',
    products: [
      { productId: '9', productName: 'AV-500 Poppet Check Valve', quantity: 200, price: 1150 },
      { productId: '3', productName: 'AV-200 Flow Control Ball Valve', quantity: 50, price: 2650 }
    ],
    stage: 'negotiation',
    value: 362500,
    probability: 75,
    expectedCloseDate: '2024-08-15',
    createdAt: '2024-03-01',
    notes: 'Final pricing discussion for 787-9 and 787-10 variants',
    industry: 'airplane'
  },
  {
    id: '2',
    title: 'Airbus A320neo Family Valve Package',
    customerId: '2',
    customerName: 'Airbus Commercial Aircraft',
    products: [
      { productId: '1', productName: 'AV-100 Ball Shut-Off Valve', quantity: 500, price: 1850 },
      { productId: '13', productName: 'AV-750 Tank Mount Vent Valve', quantity: 300, price: 1850 }
    ],
    stage: 'proposal',
    value: 1480000,
    probability: 60,
    expectedCloseDate: '2024-09-30',
    createdAt: '2024-04-12',
    notes: 'A319neo, A320neo, A321neo fuel system components',
    industry: 'airplane'
  },
  {
    id: '3',
    title: 'Embraer E2 Series Production',
    customerId: '3',
    customerName: 'Embraer S.A.',
    products: [
      { productId: '11', productName: 'AV-600 Split Butterfly Check Valve', quantity: 100, price: 1650 },
      { productId: '17', productName: 'AV-1000 Gravity Fuel Fill Cap', quantity: 200, price: 485 }
    ],
    stage: 'qualified',
    value: 262000,
    probability: 50,
    expectedCloseDate: '2024-10-15',
    createdAt: '2024-05-08',
    notes: 'E190-E2 and E195-E2 regional jet program',
    industry: 'airplane'
  },
  {
    id: '4',
    title: 'Bombardier Global 7500/8000 Fuel System',
    customerId: '4',
    customerName: 'Bombardier Aviation',
    products: [
      { productId: '3', productName: 'AV-200 Flow Control Ball Valve', quantity: 80, price: 2650 },
      { productId: '8', productName: 'AV-450 Guided Float Valve', quantity: 60, price: 1350 }
    ],
    stage: 'closed_won',
    value: 293000,
    probability: 100,
    expectedCloseDate: '2024-06-01',
    createdAt: '2024-01-20',
    notes: 'Long-range business jet valve supply contract signed',
    industry: 'airplane'
  },
  {
    id: '5',
    title: 'Gulfstream G700 Hydraulic Package',
    customerId: '6',
    customerName: 'Gulfstream Aerospace',
    products: [
      { productId: '14', productName: 'AV-800 Hydraulic Regulator Valve', quantity: 50, price: 3450 },
      { productId: '16', productName: 'AV-900 Hydraulic Control Valve', quantity: 30, price: 5200 }
    ],
    stage: 'negotiation',
    value: 328500,
    probability: 70,
    expectedCloseDate: '2024-08-30',
    createdAt: '2024-03-15',
    notes: 'Ultra-long range G700 flagship program',
    industry: 'airplane'
  },
  // Helicopter Programs
  {
    id: '6',
    title: 'Airbus H160 Fuel System Components',
    customerId: '9',
    customerName: 'Airbus Helicopters',
    products: [
      { productId: '7', productName: 'AV-400 Float Arm Valve', quantity: 150, price: 980 },
      { productId: '5', productName: 'AV-300 Poppet Drain Valve', quantity: 200, price: 650 }
    ],
    stage: 'proposal',
    value: 277000,
    probability: 55,
    expectedCloseDate: '2024-11-20',
    createdAt: '2024-05-20',
    notes: 'Next-gen medium helicopter program',
    industry: 'helicopter'
  },
  {
    id: '7',
    title: 'Bell V-280 Valor FLRAA Program',
    customerId: '10',
    customerName: 'Bell Textron',
    products: [
      { productId: '16', productName: 'AV-900 Hydraulic Control Valve', quantity: 100, price: 5200 },
      { productId: '4', productName: 'AV-250 Remote Motor Operated Valve', quantity: 80, price: 4500 }
    ],
    stage: 'closed_won',
    value: 880000,
    probability: 100,
    expectedCloseDate: '2024-05-15',
    createdAt: '2024-02-10',
    notes: 'Future Long-Range Assault Aircraft - US Army contract',
    industry: 'helicopter'
  },
  {
    id: '8',
    title: 'Sikorsky CH-53K King Stallion',
    customerId: '11',
    customerName: 'Sikorsky (Lockheed Martin)',
    products: [
      { productId: '14', productName: 'AV-800 Hydraulic Regulator Valve', quantity: 200, price: 3450 },
      { productId: '15', productName: 'AV-850 Relief/Dump Valve', quantity: 150, price: 2850 }
    ],
    stage: 'qualified',
    value: 1117500,
    probability: 45,
    expectedCloseDate: '2024-12-01',
    createdAt: '2024-04-01',
    notes: 'Heavy-lift helicopter for USMC - Build to Print opportunity',
    industry: 'helicopter'
  },
  {
    id: '9',
    title: 'Leonardo AW609 Tiltrotor',
    customerId: '12',
    customerName: 'Leonardo Helicopters',
    products: [
      { productId: '4', productName: 'AV-250 Remote Motor Operated Valve', quantity: 40, price: 4500 },
      { productId: '11', productName: 'AV-600 Split Butterfly Check Valve', quantity: 60, price: 1650 }
    ],
    stage: 'lead',
    value: 279000,
    probability: 25,
    expectedCloseDate: '2025-03-01',
    createdAt: '2024-06-01',
    notes: 'Commercial tiltrotor certification program',
    industry: 'helicopter'
  },
  // Defense/Military Aircraft
  {
    id: '10',
    title: 'F-35 Lightning II Block 4 Upgrade',
    customerId: '13',
    customerName: 'Lockheed Martin Aeronautics',
    products: [
      { productId: '4', productName: 'AV-250 Remote Motor Operated Valve', quantity: 500, price: 4500 },
      { productId: '1', productName: 'AV-100 Ball Shut-Off Valve', quantity: 800, price: 1850 }
    ],
    stage: 'closed_won',
    value: 3730000,
    probability: 100,
    expectedCloseDate: '2024-06-01',
    createdAt: '2024-01-15',
    notes: 'Multi-year production contract for F-35A/B/C variants',
    industry: 'airplane'
  },
  // UAS/Drone Programs
  {
    id: '11',
    title: 'MQ-9 Reaper Block 5 Production',
    customerId: '15',
    customerName: 'General Atomics Aeronautical',
    products: [
      { productId: '2', productName: 'AV-150 Ball Drain Valve', quantity: 300, price: 1250 },
      { productId: '12', productName: 'AV-700 In-Line Pressure Vent', quantity: 200, price: 1250 }
    ],
    stage: 'negotiation',
    value: 625000,
    probability: 80,
    expectedCloseDate: '2024-07-15',
    createdAt: '2024-02-20',
    notes: 'MALE UAS fuel system valves - USAF and export customers',
    industry: 'drone'
  },
  {
    id: '12',
    title: 'RQ-4 Global Hawk Sustainment',
    customerId: '14',
    customerName: 'Northrop Grumman',
    products: [
      { productId: '9', productName: 'AV-500 Poppet Check Valve', quantity: 150, price: 1150 },
      { productId: '13', productName: 'AV-750 Tank Mount Vent Valve', quantity: 100, price: 1850 }
    ],
    stage: 'proposal',
    value: 357500,
    probability: 50,
    expectedCloseDate: '2024-09-15',
    createdAt: '2024-04-10',
    notes: 'HALE UAS fleet sustainment and spares',
    industry: 'drone'
  },
  {
    id: '13',
    title: 'Anduril Altius-600M Production',
    customerId: '16',
    customerName: 'Anduril Industries',
    products: [
      { productId: '5', productName: 'AV-300 Poppet Drain Valve', quantity: 1000, price: 650 },
      { productId: '10', productName: 'AV-550 Swing Check Valve', quantity: 500, price: 890 }
    ],
    stage: 'qualified',
    value: 1095000,
    probability: 40,
    expectedCloseDate: '2024-11-01',
    createdAt: '2024-05-15',
    notes: 'Autonomous loitering munition - Build to Spec opportunity',
    industry: 'drone'
  },
  {
    id: '14',
    title: 'Bayraktar TB3 Naval Variant',
    customerId: '19',
    customerName: 'Baykar Technologies',
    products: [
      { productId: '6', productName: 'AV-350 Solenoid Drain Valve', quantity: 200, price: 1450 },
      { productId: '8', productName: 'AV-450 Guided Float Valve', quantity: 150, price: 1350 }
    ],
    stage: 'lead',
    value: 492500,
    probability: 30,
    expectedCloseDate: '2025-02-01',
    createdAt: '2024-06-10',
    notes: 'New carrier-capable MALE UAS for Turkish Navy',
    industry: 'drone'
  },
  {
    id: '15',
    title: 'IAI Heron TP Fleet Expansion',
    customerId: '20',
    customerName: 'Israel Aerospace Industries',
    products: [
      { productId: '3', productName: 'AV-200 Flow Control Ball Valve', quantity: 80, price: 2650 },
      { productId: '12', productName: 'AV-700 In-Line Pressure Vent', quantity: 120, price: 1250 }
    ],
    stage: 'closed_lost',
    value: 362000,
    probability: 0,
    expectedCloseDate: '2024-04-30',
    createdAt: '2024-02-01',
    notes: 'Lost to local Israeli supplier - price and delivery terms',
    industry: 'drone'
  }
];

export const dashboardStats: DashboardStats = {
  totalRevenue: 4903000,
  activeCustomers: 18,
  openOpportunities: 11,
  pipelineValue: 6741500,
  conversionRate: 26.7,
  industryBreakdown: {
    airplane: 6456000,
    drone: 2932000,
    helicopter: 2553500
  }
};
