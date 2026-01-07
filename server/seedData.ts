// Initial seed data for the database
// This file is used to populate the database on first run

import { customers, products, opportunities, dashboardStats } from '../src/data/mockData';
import type { AircraftEntry } from './db';

// Aircraft data mapped to customers with applications and suppliers
// Originally hardcoded in Customers.tsx - now stored in database for persistence
export const customerAircraft: Record<string, AircraftEntry[]> = {
  '1': [ // Boeing
    { customerId: '1', name: '737 MAX', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }, { name: 'Check Valves', supplier: 'Competitor' }] },
    { customerId: '1', name: '747', applications: [{ name: 'Flow Control Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { customerId: '1', name: '767', applications: [{ name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }, { name: 'Relief/Dump Valves', supplier: 'Competitor' }] },
    { customerId: '1', name: '777', applications: [{ name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Gravity Fuel Fill Caps', supplier: 'AutoValve' }] },
    { customerId: '1', name: '787 Dreamliner', applications: [{ name: 'Float Arm Style Valves', supplier: 'AutoValve' }, { name: 'Solenoid Activated Valves', supplier: 'AutoValve' }] },
  ],
  '2': [ // Airbus
    { customerId: '2', name: 'A319', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Check Valves', supplier: 'AutoValve' }] },
    { customerId: '2', name: 'A320', applications: [{ name: 'Drain Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { customerId: '2', name: 'A321', applications: [{ name: 'Flow Control Valves', supplier: 'AutoValve' }, { name: 'Hydraulic Control Valves', supplier: 'Competitor' }] },
    { customerId: '2', name: 'A320neo', applications: [{ name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Gravity Fuel Fill Caps', supplier: 'AutoValve' }] },
    { customerId: '2', name: 'A330', applications: [{ name: 'Float Valves', supplier: 'AutoValve' }, { name: 'Relief/Dump Valves', supplier: 'AutoValve' }] },
    { customerId: '2', name: 'A350', applications: [{ name: 'Solenoid Activated Valves', supplier: 'AutoValve' }, { name: 'Tank Mounted Valves', supplier: 'AutoValve' }] },
    { customerId: '2', name: 'A380', applications: [{ name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }, { name: 'Split Butterfly Check Valves', supplier: 'Competitor' }] },
  ],
  '3': [ // Embraer
    { customerId: '3', name: 'E170', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }] },
    { customerId: '3', name: 'E190', applications: [{ name: 'Check Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { customerId: '3', name: 'E195', applications: [{ name: 'Float Valves', supplier: 'AutoValve' }, { name: 'Hydraulic Control Valves', supplier: 'AutoValve' }] },
    { customerId: '3', name: 'E2 Series', applications: [{ name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Gravity Fuel Fill Caps', supplier: 'AutoValve' }] },
    { customerId: '3', name: 'Phenom 100/300', applications: [{ name: 'Solenoid Activated Valves', supplier: 'AutoValve' }, { name: 'Relief/Dump Valves', supplier: 'AutoValve' }] },
    { customerId: '3', name: 'Praetor 500/600', applications: [{ name: 'Flow Control Valves', supplier: 'AutoValve' }, { name: 'Tank Mounted Valves', supplier: 'AutoValve' }] },
  ],
  '4': [ // Bombardier
    { customerId: '4', name: 'Global 7500', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }] },
    { customerId: '4', name: 'Global 8000', applications: [{ name: 'Drain Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { customerId: '4', name: 'Challenger 350', applications: [{ name: 'Check Valves', supplier: 'AutoValve' }, { name: 'Float Valves', supplier: 'AutoValve' }] },
    { customerId: '4', name: 'Challenger 650', applications: [{ name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Gravity Fuel Fill Caps', supplier: 'AutoValve' }] },
  ],
  '5': [ // COMAC
    { customerId: '5', name: 'C919', applications: [{ name: 'Shut-Off Valves', supplier: 'Prospect' }, { name: 'Drain Valves', supplier: 'Prospect' }, { name: 'Check Valves', supplier: 'Competitor' }] },
    { customerId: '5', name: 'ARJ21', applications: [{ name: 'Flow Control Valves', supplier: 'Prospect' }, { name: 'Pressure Vent Valves', supplier: 'Competitor' }] },
  ],
  '6': [ // Gulfstream
    { customerId: '6', name: 'G400', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }] },
    { customerId: '6', name: 'G500', applications: [{ name: 'Check Valves', supplier: 'AutoValve' }, { name: 'Hydraulic Control Valves', supplier: 'AutoValve' }] },
    { customerId: '6', name: 'G600', applications: [{ name: 'Float Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { customerId: '6', name: 'G650', applications: [{ name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Gravity Fuel Fill Caps', supplier: 'AutoValve' }] },
    { customerId: '6', name: 'G700', applications: [{ name: 'Solenoid Activated Valves', supplier: 'AutoValve' }, { name: 'Relief/Dump Valves', supplier: 'AutoValve' }] },
    { customerId: '6', name: 'G800', applications: [{ name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }, { name: 'Tank Mounted Valves', supplier: 'AutoValve' }] },
  ],
  '7': [ // Dassault
    { customerId: '7', name: 'Falcon 6X', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }, { name: 'Check Valves', supplier: 'AutoValve' }] },
    { customerId: '7', name: 'Falcon 8X', applications: [{ name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }, { name: 'Float Valves', supplier: 'AutoValve' }] },
    { customerId: '7', name: 'Falcon 10X', applications: [{ name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
  ],
  '8': [ // Textron/Cessna
    { customerId: '8', name: 'Citation CJ Series', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }] },
    { customerId: '8', name: 'Citation Latitude', applications: [{ name: 'Check Valves', supplier: 'AutoValve' }, { name: 'Float Valves', supplier: 'AutoValve' }] },
    { customerId: '8', name: 'Citation Longitude', applications: [{ name: 'Hydraulic Control Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { customerId: '8', name: 'Caravan', applications: [{ name: 'Gravity Fuel Fill Caps', supplier: 'AutoValve' }, { name: 'Gravity Oil Fill Caps', supplier: 'AutoValve' }] },
  ],
  '9': [ // Airbus Helicopters
    { customerId: '9', name: 'H125', applications: [{ name: 'Hydraulic Control Valves', supplier: 'AutoValve' }, { name: 'Check Valves', supplier: 'AutoValve' }] },
    { customerId: '9', name: 'H145', applications: [{ name: 'Float Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }] },
    { customerId: '9', name: 'H160', applications: [{ name: 'Pressure Vent Valves', supplier: 'AutoValve' }, { name: 'Shut-Off Valves', supplier: 'AutoValve' }] },
    { customerId: '9', name: 'Tiger', applications: [{ name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }, { name: 'Relief/Dump Valves', supplier: 'AutoValve' }] },
    { customerId: '9', name: 'NH90', applications: [{ name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Solenoid Activated Valves', supplier: 'AutoValve' }] },
  ],
  '10': [ // Bell
    { customerId: '10', name: 'Bell 407', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }] },
    { customerId: '10', name: 'Bell 429', applications: [{ name: 'Check Valves', supplier: 'AutoValve' }, { name: 'Float Valves', supplier: 'AutoValve' }] },
    { customerId: '10', name: 'Bell 505', applications: [{ name: 'Hydraulic Control Valves', supplier: 'AutoValve' }, { name: 'Gravity Fuel Fill Caps', supplier: 'AutoValve' }] },
    { customerId: '10', name: 'V-22 Osprey', applications: [{ name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }, { name: 'Relief/Dump Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'Competitor' }] },
    { customerId: '10', name: 'V-280 Valor', applications: [{ name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Solenoid Activated Valves', supplier: 'AutoValve' }] },
  ],
  '11': [ // Sikorsky
    { customerId: '11', name: 'UH-60 Black Hawk', applications: [{ name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }, { name: 'Relief/Dump Valves', supplier: 'AutoValve' }, { name: 'Check Valves', supplier: 'AutoValve' }] },
    { customerId: '11', name: 'CH-53K King Stallion', applications: [{ name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { customerId: '11', name: 'S-76', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Float Valves', supplier: 'AutoValve' }] },
    { customerId: '11', name: 'S-92', applications: [{ name: 'Drain Valves', supplier: 'AutoValve' }, { name: 'Solenoid Activated Valves', supplier: 'AutoValve' }] },
  ],
  '12': [ // Leonardo
    { customerId: '12', name: 'AW109', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }] },
    { customerId: '12', name: 'AW139', applications: [{ name: 'Check Valves', supplier: 'AutoValve' }, { name: 'Hydraulic Control Valves', supplier: 'AutoValve' }] },
    { customerId: '12', name: 'AW169', applications: [{ name: 'Float Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { customerId: '12', name: 'AW609', applications: [{ name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }] },
    { customerId: '12', name: 'AW101', applications: [{ name: 'Relief/Dump Valves', supplier: 'AutoValve' }, { name: 'Tank Mounted Valves', supplier: 'AutoValve' }] },
    { customerId: '12', name: 'AW159 Wildcat', applications: [{ name: 'Solenoid Activated Valves', supplier: 'AutoValve' }, { name: 'Gravity Fuel Fill Caps', supplier: 'AutoValve' }] },
  ],
  '13': [ // Lockheed Martin
    { customerId: '13', name: 'F-35 Lightning II', applications: [{ name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }, { name: 'Relief/Dump Valves', supplier: 'AutoValve' }, { name: 'Control Valves', supplier: 'AutoValve' }] },
    { customerId: '13', name: 'F-16 Fighting Falcon', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Check Valves', supplier: 'AutoValve' }] },
    { customerId: '13', name: 'C-130J Super Hercules', applications: [{ name: 'Drain Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }, { name: 'Float Valves', supplier: 'AutoValve' }] },
  ],
  '14': [ // Northrop Grumman
    { customerId: '14', name: 'RQ-4 Global Hawk', applications: [{ name: 'Flow Control Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { customerId: '14', name: 'MQ-4C Triton', applications: [{ name: 'Check Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }] },
    { customerId: '14', name: 'B-21 Raider', applications: [{ name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }, { name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Tank Mounted Valves', supplier: 'AutoValve' }] },
  ],
  '15': [ // General Atomics
    { customerId: '15', name: 'MQ-9 Reaper', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }, { name: 'Check Valves', supplier: 'AutoValve' }] },
    { customerId: '15', name: 'MQ-9B SkyGuardian', applications: [{ name: 'Flow Control Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { customerId: '15', name: 'MQ-1C Gray Eagle', applications: [{ name: 'Float Valves', supplier: 'AutoValve' }, { name: 'Solenoid Activated Valves', supplier: 'AutoValve' }] },
    { customerId: '15', name: 'Avenger', applications: [{ name: 'Hydraulic Control Valves', supplier: 'AutoValve' }, { name: 'Relief/Dump Valves', supplier: 'AutoValve' }] },
  ],
  '16': [ // Anduril
    { customerId: '16', name: 'Ghost', applications: [{ name: 'Check Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { customerId: '16', name: 'Altius-600', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Flow Control Valves', supplier: 'AutoValve' }] },
    { customerId: '16', name: 'Altius-700', applications: [{ name: 'Drain Valves', supplier: 'AutoValve' }, { name: 'Float Valves', supplier: 'AutoValve' }] },
    { customerId: '16', name: 'YFQ-44A (CCA)', applications: [{ name: 'Hydraulic Control Valves', supplier: 'AutoValve' }, { name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }] },
  ],
  '17': [ // Kratos
    { customerId: '17', name: 'XQ-58A Valkyrie', applications: [{ name: 'Shut-Off Valves', supplier: 'Prospect' }, { name: 'Check Valves', supplier: 'Competitor' }, { name: 'Hydraulic Control Valves', supplier: 'Prospect' }] },
    { customerId: '17', name: 'BQM-167 Target Drones', applications: [{ name: 'Drain Valves', supplier: 'Prospect' }, { name: 'Pressure Vent Valves', supplier: 'Competitor' }] },
  ],
  '18': [ // AeroVironment
    { customerId: '18', name: 'Switchblade 300/600', applications: [{ name: 'Check Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { customerId: '18', name: 'RQ-11 Raven', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Flow Control Valves', supplier: 'AutoValve' }] },
    { customerId: '18', name: 'RQ-20 Puma', applications: [{ name: 'Drain Valves', supplier: 'AutoValve' }, { name: 'Float Valves', supplier: 'AutoValve' }] },
  ],
  '19': [ // Baykar
    { customerId: '19', name: 'Bayraktar TB2', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }, { name: 'Check Valves', supplier: 'AutoValve' }] },
    { customerId: '19', name: 'Bayraktar TB3', applications: [{ name: 'Flow Control Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { customerId: '19', name: 'Bayraktar Akinci', applications: [{ name: 'Hydraulic Control Valves', supplier: 'AutoValve' }, { name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }] },
  ],
  '20': [ // IAI
    { customerId: '20', name: 'Heron', applications: [{ name: 'Shut-Off Valves', supplier: 'Competitor' }, { name: 'Check Valves', supplier: 'Competitor' }] },
    { customerId: '20', name: 'Heron TP (Eitan)', applications: [{ name: 'Drain Valves', supplier: 'Competitor' }, { name: 'Pressure Vent Valves', supplier: 'Competitor' }] },
    { customerId: '20', name: 'Harop', applications: [{ name: 'Flow Control Valves', supplier: 'Competitor' }, { name: 'Float Valves', supplier: 'Prospect' }] },
  ],
};

export const seedData = {
  customers,
  products,
  opportunities,
  customerAircraft,
  dashboardStats
};
