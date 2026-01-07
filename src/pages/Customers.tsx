import { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  Mail,
  Phone,
  MoreVertical,
  Plane,
  Rocket,
  Compass,
  X,
  LayoutGrid,
  List,
  Save,
  Trash2,
  PlusCircle,
} from 'lucide-react';
import { customers as initialCustomers } from '../data/mockData';
import type { Customer, IndustryType } from '../types';

const industryIcons = {
  airplane: Plane,
  drone: Rocket,
  helicopter: Compass,
};

const industryColors = {
  airplane: 'bg-blue-100 text-blue-700 border-blue-200',
  drone: 'bg-purple-100 text-purple-700 border-purple-200',
  helicopter: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

// Application types for valve products
type Application = {
  name: string;
  supplier: 'AutoValve' | 'Prospect' | 'Competitor';
};

type AircraftEntry = {
  name: string;
  applications: Application[];
};

// Aircraft data mapped to customers with applications and suppliers
const customerAircraft: Record<string, AircraftEntry[]> = {
  '1': [ // Boeing
    { name: '737 MAX', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }, { name: 'Check Valves', supplier: 'Competitor' }] },
    { name: '747', applications: [{ name: 'Flow Control Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { name: '767', applications: [{ name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }, { name: 'Relief/Dump Valves', supplier: 'Competitor' }] },
    { name: '777', applications: [{ name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Gravity Fuel Fill Caps', supplier: 'AutoValve' }] },
    { name: '787 Dreamliner', applications: [{ name: 'Float Arm Style Valves', supplier: 'AutoValve' }, { name: 'Solenoid Activated Valves', supplier: 'AutoValve' }] },
  ],
  '2': [ // Airbus
    { name: 'A319', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Check Valves', supplier: 'AutoValve' }] },
    { name: 'A320', applications: [{ name: 'Drain Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { name: 'A321', applications: [{ name: 'Flow Control Valves', supplier: 'AutoValve' }, { name: 'Hydraulic Control Valves', supplier: 'Competitor' }] },
    { name: 'A320neo', applications: [{ name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Gravity Fuel Fill Caps', supplier: 'AutoValve' }] },
    { name: 'A330', applications: [{ name: 'Float Valves', supplier: 'AutoValve' }, { name: 'Relief/Dump Valves', supplier: 'AutoValve' }] },
    { name: 'A350', applications: [{ name: 'Solenoid Activated Valves', supplier: 'AutoValve' }, { name: 'Tank Mounted Valves', supplier: 'AutoValve' }] },
    { name: 'A380', applications: [{ name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }, { name: 'Split Butterfly Check Valves', supplier: 'Competitor' }] },
  ],
  '3': [ // Embraer
    { name: 'E170', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }] },
    { name: 'E190', applications: [{ name: 'Check Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { name: 'E195', applications: [{ name: 'Float Valves', supplier: 'AutoValve' }, { name: 'Hydraulic Control Valves', supplier: 'AutoValve' }] },
    { name: 'E2 Series', applications: [{ name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Gravity Fuel Fill Caps', supplier: 'AutoValve' }] },
    { name: 'Phenom 100/300', applications: [{ name: 'Solenoid Activated Valves', supplier: 'AutoValve' }, { name: 'Relief/Dump Valves', supplier: 'AutoValve' }] },
    { name: 'Praetor 500/600', applications: [{ name: 'Flow Control Valves', supplier: 'AutoValve' }, { name: 'Tank Mounted Valves', supplier: 'AutoValve' }] },
  ],
  '4': [ // Bombardier
    { name: 'Global 7500', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }] },
    { name: 'Global 8000', applications: [{ name: 'Drain Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { name: 'Challenger 350', applications: [{ name: 'Check Valves', supplier: 'AutoValve' }, { name: 'Float Valves', supplier: 'AutoValve' }] },
    { name: 'Challenger 650', applications: [{ name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Gravity Fuel Fill Caps', supplier: 'AutoValve' }] },
  ],
  '5': [ // COMAC
    { name: 'C919', applications: [{ name: 'Shut-Off Valves', supplier: 'Prospect' }, { name: 'Drain Valves', supplier: 'Prospect' }, { name: 'Check Valves', supplier: 'Competitor' }] },
    { name: 'ARJ21', applications: [{ name: 'Flow Control Valves', supplier: 'Prospect' }, { name: 'Pressure Vent Valves', supplier: 'Competitor' }] },
  ],
  '6': [ // Gulfstream
    { name: 'G400', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }] },
    { name: 'G500', applications: [{ name: 'Check Valves', supplier: 'AutoValve' }, { name: 'Hydraulic Control Valves', supplier: 'AutoValve' }] },
    { name: 'G600', applications: [{ name: 'Float Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { name: 'G650', applications: [{ name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Gravity Fuel Fill Caps', supplier: 'AutoValve' }] },
    { name: 'G700', applications: [{ name: 'Solenoid Activated Valves', supplier: 'AutoValve' }, { name: 'Relief/Dump Valves', supplier: 'AutoValve' }] },
    { name: 'G800', applications: [{ name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }, { name: 'Tank Mounted Valves', supplier: 'AutoValve' }] },
  ],
  '7': [ // Dassault
    { name: 'Falcon 6X', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }, { name: 'Check Valves', supplier: 'AutoValve' }] },
    { name: 'Falcon 8X', applications: [{ name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }, { name: 'Float Valves', supplier: 'AutoValve' }] },
    { name: 'Falcon 10X', applications: [{ name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
  ],
  '8': [ // Textron/Cessna
    { name: 'Citation CJ Series', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }] },
    { name: 'Citation Latitude', applications: [{ name: 'Check Valves', supplier: 'AutoValve' }, { name: 'Float Valves', supplier: 'AutoValve' }] },
    { name: 'Citation Longitude', applications: [{ name: 'Hydraulic Control Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { name: 'Caravan', applications: [{ name: 'Gravity Fuel Fill Caps', supplier: 'AutoValve' }, { name: 'Gravity Oil Fill Caps', supplier: 'AutoValve' }] },
  ],
  '9': [ // Airbus Helicopters
    { name: 'H125', applications: [{ name: 'Hydraulic Control Valves', supplier: 'AutoValve' }, { name: 'Check Valves', supplier: 'AutoValve' }] },
    { name: 'H145', applications: [{ name: 'Float Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }] },
    { name: 'H160', applications: [{ name: 'Pressure Vent Valves', supplier: 'AutoValve' }, { name: 'Shut-Off Valves', supplier: 'AutoValve' }] },
    { name: 'Tiger', applications: [{ name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }, { name: 'Relief/Dump Valves', supplier: 'AutoValve' }] },
    { name: 'NH90', applications: [{ name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Solenoid Activated Valves', supplier: 'AutoValve' }] },
  ],
  '10': [ // Bell
    { name: 'Bell 407', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }] },
    { name: 'Bell 429', applications: [{ name: 'Check Valves', supplier: 'AutoValve' }, { name: 'Float Valves', supplier: 'AutoValve' }] },
    { name: 'Bell 505', applications: [{ name: 'Hydraulic Control Valves', supplier: 'AutoValve' }, { name: 'Gravity Fuel Fill Caps', supplier: 'AutoValve' }] },
    { name: 'V-22 Osprey', applications: [{ name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }, { name: 'Relief/Dump Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'Competitor' }] },
    { name: 'V-280 Valor', applications: [{ name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Solenoid Activated Valves', supplier: 'AutoValve' }] },
  ],
  '11': [ // Sikorsky
    { name: 'UH-60 Black Hawk', applications: [{ name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }, { name: 'Relief/Dump Valves', supplier: 'AutoValve' }, { name: 'Check Valves', supplier: 'AutoValve' }] },
    { name: 'CH-53K King Stallion', applications: [{ name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { name: 'S-76', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Float Valves', supplier: 'AutoValve' }] },
    { name: 'S-92', applications: [{ name: 'Drain Valves', supplier: 'AutoValve' }, { name: 'Solenoid Activated Valves', supplier: 'AutoValve' }] },
  ],
  '12': [ // Leonardo
    { name: 'AW109', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }] },
    { name: 'AW139', applications: [{ name: 'Check Valves', supplier: 'AutoValve' }, { name: 'Hydraulic Control Valves', supplier: 'AutoValve' }] },
    { name: 'AW169', applications: [{ name: 'Float Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { name: 'AW609', applications: [{ name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }] },
    { name: 'AW101', applications: [{ name: 'Relief/Dump Valves', supplier: 'AutoValve' }, { name: 'Tank Mounted Valves', supplier: 'AutoValve' }] },
    { name: 'AW159 Wildcat', applications: [{ name: 'Solenoid Activated Valves', supplier: 'AutoValve' }, { name: 'Gravity Fuel Fill Caps', supplier: 'AutoValve' }] },
  ],
  '13': [ // Lockheed Martin
    { name: 'F-35 Lightning II', applications: [{ name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }, { name: 'Relief/Dump Valves', supplier: 'AutoValve' }, { name: 'Control Valves', supplier: 'AutoValve' }] },
    { name: 'F-16 Fighting Falcon', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Check Valves', supplier: 'AutoValve' }] },
    { name: 'C-130J Super Hercules', applications: [{ name: 'Drain Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }, { name: 'Float Valves', supplier: 'AutoValve' }] },
  ],
  '14': [ // Northrop Grumman
    { name: 'RQ-4 Global Hawk', applications: [{ name: 'Flow Control Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { name: 'MQ-4C Triton', applications: [{ name: 'Check Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }] },
    { name: 'B-21 Raider', applications: [{ name: 'Hydraulic Regulator Valves', supplier: 'AutoValve' }, { name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }, { name: 'Tank Mounted Valves', supplier: 'AutoValve' }] },
  ],
  '15': [ // General Atomics
    { name: 'MQ-9 Reaper', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }, { name: 'Check Valves', supplier: 'AutoValve' }] },
    { name: 'MQ-9B SkyGuardian', applications: [{ name: 'Flow Control Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { name: 'MQ-1C Gray Eagle', applications: [{ name: 'Float Valves', supplier: 'AutoValve' }, { name: 'Solenoid Activated Valves', supplier: 'AutoValve' }] },
    { name: 'Avenger', applications: [{ name: 'Hydraulic Control Valves', supplier: 'AutoValve' }, { name: 'Relief/Dump Valves', supplier: 'AutoValve' }] },
  ],
  '16': [ // Anduril
    { name: 'Ghost', applications: [{ name: 'Check Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { name: 'Altius-600', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Flow Control Valves', supplier: 'AutoValve' }] },
    { name: 'Altius-700', applications: [{ name: 'Drain Valves', supplier: 'AutoValve' }, { name: 'Float Valves', supplier: 'AutoValve' }] },
    { name: 'YFQ-44A (CCA)', applications: [{ name: 'Hydraulic Control Valves', supplier: 'AutoValve' }, { name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }] },
  ],
  '17': [ // Kratos
    { name: 'XQ-58A Valkyrie', applications: [{ name: 'Shut-Off Valves', supplier: 'Prospect' }, { name: 'Check Valves', supplier: 'Competitor' }, { name: 'Hydraulic Control Valves', supplier: 'Prospect' }] },
    { name: 'BQM-167 Target Drones', applications: [{ name: 'Drain Valves', supplier: 'Prospect' }, { name: 'Pressure Vent Valves', supplier: 'Competitor' }] },
  ],
  '18': [ // AeroVironment
    { name: 'Switchblade 300/600', applications: [{ name: 'Check Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { name: 'RQ-11 Raven', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Flow Control Valves', supplier: 'AutoValve' }] },
    { name: 'RQ-20 Puma', applications: [{ name: 'Drain Valves', supplier: 'AutoValve' }, { name: 'Float Valves', supplier: 'AutoValve' }] },
  ],
  '19': [ // Baykar
    { name: 'Bayraktar TB2', applications: [{ name: 'Shut-Off Valves', supplier: 'AutoValve' }, { name: 'Drain Valves', supplier: 'AutoValve' }, { name: 'Check Valves', supplier: 'AutoValve' }] },
    { name: 'Bayraktar TB3', applications: [{ name: 'Flow Control Valves', supplier: 'AutoValve' }, { name: 'Pressure Vent Valves', supplier: 'AutoValve' }] },
    { name: 'Bayraktar Akıncı', applications: [{ name: 'Hydraulic Control Valves', supplier: 'AutoValve' }, { name: 'Remote Motor Operated Valves', supplier: 'AutoValve' }] },
  ],
  '20': [ // IAI
    { name: 'Heron', applications: [{ name: 'Shut-Off Valves', supplier: 'Competitor' }, { name: 'Check Valves', supplier: 'Competitor' }] },
    { name: 'Heron TP (Eitan)', applications: [{ name: 'Drain Valves', supplier: 'Competitor' }, { name: 'Pressure Vent Valves', supplier: 'Competitor' }] },
    { name: 'Harop', applications: [{ name: 'Flow Control Valves', supplier: 'Competitor' }, { name: 'Float Valves', supplier: 'Prospect' }] },
  ],
};

// Initial aircraft data - will be managed in state
const initialCustomerAircraft: Record<string, AircraftEntry[]> = { ...customerAircraft };

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [aircraftData, setAircraftData] = useState<Record<string, AircraftEntry[]>>(initialCustomerAircraft);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState<IndustryType | 'all'>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Edit form state
  const [editForm, setEditForm] = useState<Customer | null>(null);
  const [editAircraft, setEditAircraft] = useState<AircraftEntry[]>([]);

  const openEditModal = (customer: Customer) => {
    setEditForm({ ...customer });
    setEditAircraft(JSON.parse(JSON.stringify(aircraftData[customer.id] || [])));
    setIsEditModalOpen(true);
  };

  const handleEditFormChange = (field: keyof Customer, value: string) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value });
    }
  };

  const handleAddAircraft = () => {
    setEditAircraft([
      ...editAircraft,
      { name: '', applications: [{ name: '', supplier: 'Prospect' }] },
    ]);
  };

  const handleRemoveAircraft = (index: number) => {
    setEditAircraft(editAircraft.filter((_, i) => i !== index));
  };

  const handleAircraftNameChange = (index: number, name: string) => {
    const updated = [...editAircraft];
    updated[index].name = name;
    setEditAircraft(updated);
  };

  const handleAddApplication = (aircraftIndex: number) => {
    const updated = [...editAircraft];
    updated[aircraftIndex].applications.push({ name: '', supplier: 'Prospect' });
    setEditAircraft(updated);
  };

  const handleRemoveApplication = (aircraftIndex: number, appIndex: number) => {
    const updated = [...editAircraft];
    updated[aircraftIndex].applications = updated[aircraftIndex].applications.filter(
      (_, i) => i !== appIndex
    );
    setEditAircraft(updated);
  };

  const handleApplicationChange = (
    aircraftIndex: number,
    appIndex: number,
    field: 'name' | 'supplier',
    value: string
  ) => {
    const updated = [...editAircraft];
    if (field === 'supplier') {
      updated[aircraftIndex].applications[appIndex].supplier = value as 'AutoValve' | 'Prospect' | 'Competitor';
    } else {
      updated[aircraftIndex].applications[appIndex].name = value;
    }
    setEditAircraft(updated);
  };

  const handleSaveCustomer = () => {
    if (!editForm) return;

    // Update customer in list
    setCustomers(customers.map((c) => (c.id === editForm.id ? editForm : c)));

    // Update aircraft data
    const filteredAircraft = editAircraft.filter(
      (ac) => ac.name.trim() && ac.applications.some((app) => app.name.trim())
    );
    setAircraftData({ ...aircraftData, [editForm.id]: filteredAircraft });

    // Update selected customer for detail modal
    setSelectedCustomer(editForm);

    setIsEditModalOpen(false);
  };

  const filteredCustomers = customers.filter((customer) => {
    const aircraftList = aircraftData[customer.id] || [];
    const matchesSearch =
      customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aircraftList.some(ac =>
        ac.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ac.applications.some(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    const matchesIndustry = filterIndustry === 'all' || customer.industry === filterIndustry;
    return matchesSearch && matchesIndustry;
  });

  const getSupplierBadge = (supplier: string) => {
    switch (supplier) {
      case 'AutoValve':
        return 'bg-aerospace-100 text-aerospace-700';
      case 'Prospect':
        return 'bg-amber-100 text-amber-700';
      case 'Competitor':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Customers</h1>
          <p className="mt-1 text-slate-500">
            Manage your aerospace industry customers and contacts.
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Customer
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search customers or aircraft..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>

            {/* Industry Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-400" />
              <select
                value={filterIndustry}
                onChange={(e) => setFilterIndustry(e.target.value as IndustryType | 'all')}
                className="input w-auto"
              >
                <option value="all">All Industries</option>
                <option value="airplane">Airplane</option>
                <option value="drone">Drone</option>
                <option value="helicopter">Helicopter</option>
              </select>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Table View"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Manufacturer
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Aircraft
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Application
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Current Supplier
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Buyer Location
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Buyer Name
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Buyer Email
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.flatMap((customer) => {
                  const aircraftList = aircraftData[customer.id] || [];
                  return aircraftList.flatMap((aircraft, acIndex) =>
                    aircraft.applications.map((app, appIndex) => (
                      <tr
                        key={`${customer.id}-${acIndex}-${appIndex}`}
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setIsModalOpen(true);
                        }}
                        className="hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <td className="px-4 py-3">
                          {acIndex === 0 && appIndex === 0 ? (
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-aerospace-400 to-aerospace-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                                {customer.companyName.substring(0, 2).toUpperCase()}
                              </div>
                              <p className="font-semibold text-slate-900 text-sm">{customer.companyName}</p>
                            </div>
                          ) : null}
                        </td>
                        <td className="px-4 py-3">
                          {appIndex === 0 ? (
                            <span className="text-sm font-medium text-slate-800 px-2 py-0.5 bg-slate-100 rounded">
                              {aircraft.name}
                            </span>
                          ) : null}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-slate-700">
                            {app.name}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getSupplierBadge(
                              app.supplier
                            )}`}
                          >
                            {app.supplier}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {acIndex === 0 && appIndex === 0 ? (
                            <span className="text-sm text-slate-600">
                              {customer.address}
                            </span>
                          ) : null}
                        </td>
                        <td className="px-4 py-3">
                          {acIndex === 0 && appIndex === 0 ? (
                            <span className="text-sm text-slate-700 font-medium">
                              {customer.contactName}
                            </span>
                          ) : null}
                        </td>
                        <td className="px-4 py-3">
                          {acIndex === 0 && appIndex === 0 ? (
                            <a
                              href={`mailto:${customer.email}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-sm text-aerospace-600 hover:text-aerospace-700 hover:underline"
                            >
                              {customer.email}
                            </a>
                          ) : null}
                        </td>
                      </tr>
                    ))
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => {
            const IndustryIcon = industryIcons[customer.industry];
            const aircraftList = aircraftData[customer.id] || [];
            return (
              <div
                key={customer.id}
                onClick={() => {
                  setSelectedCustomer(customer);
                  setIsModalOpen(true);
                }}
                className="card hover:shadow-lg hover:border-aerospace-300 transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-aerospace-400 to-aerospace-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-aerospace-500/20">
                      {customer.companyName.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-aerospace-600 transition-colors">
                        {customer.companyName}
                      </h3>
                      <p className="text-sm text-slate-500">{customer.contactName}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-slate-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                  </button>
                </div>

                <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                  {aircraftList.slice(0, 3).map((aircraft, acIndex) => (
                    <div key={acIndex} className="p-2 rounded-lg bg-slate-50">
                      <p className="text-xs font-medium text-slate-800 mb-1">{aircraft.name}</p>
                      <div className="flex flex-wrap gap-1">
                        {aircraft.applications.map((app, appIndex) => (
                          <span
                            key={appIndex}
                            className={`text-xs px-1.5 py-0.5 rounded ${getSupplierBadge(app.supplier)}`}
                            title={`${app.name} - ${app.supplier}`}
                          >
                            {app.name.split(' ')[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                  {aircraftList.length > 3 && (
                    <p className="text-xs text-slate-500 text-center">+{aircraftList.length - 3} more aircraft</p>
                  )}
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{customer.phone}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                      industryColors[customer.industry]
                    }`}
                  >
                    <IndustryIcon className="w-3.5 h-3.5" />
                    {customer.industry.charAt(0).toUpperCase() + customer.industry.slice(1)}
                  </span>
                  <span className="text-xs text-slate-500">
                    {aircraftList.length} aircraft
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900">No customers found</h3>
          <p className="mt-1 text-slate-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Customer Detail Modal */}
      {isModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 z-10">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-aerospace-400 to-aerospace-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {selectedCustomer.companyName.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {selectedCustomer.companyName}
                  </h2>
                  <p className="text-slate-500">{selectedCustomer.contactName}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Industry</p>
                    <p className="mt-1 font-medium text-slate-900 capitalize">
                      {selectedCustomer.industry}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50">
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Status</p>
                    <p className="mt-1 font-medium text-slate-900 capitalize">
                      {selectedCustomer.status}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Aircraft & Applications</p>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {(aircraftData[selectedCustomer.id] || []).map((aircraft, acIndex) => (
                      <div key={acIndex} className="p-3 bg-white rounded-lg border border-slate-200">
                        <p className="font-medium text-slate-900 text-sm mb-2">{aircraft.name}</p>
                        <div className="space-y-1.5">
                          {aircraft.applications.map((app, appIndex) => (
                            <div key={appIndex} className="flex items-center justify-between text-xs">
                              <span className="text-slate-600">{app.name}</span>
                              <span
                                className={`px-2 py-0.5 rounded-full font-medium ${getSupplierBadge(app.supplier)}`}
                              >
                                {app.supplier}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Contact</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-slate-700">{selectedCustomer.email}</p>
                    <p className="text-sm text-slate-700">{selectedCustomer.phone}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Address</p>
                  <p className="mt-1 text-sm text-slate-700">{selectedCustomer.address}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Notes</p>
                  <p className="mt-1 text-sm text-slate-700">{selectedCustomer.notes}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Customer Since</p>
                  <p className="mt-1 text-sm text-slate-700">
                    {new Date(selectedCustomer.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    openEditModal(selectedCustomer);
                  }}
                  className="btn-primary flex-1"
                >
                  Edit Customer
                </button>
                <button className="btn-secondary flex-1">View Opportunities</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {isEditModalOpen && editForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsEditModalOpen(false)}
            />
            <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10">
              <div className="sticky top-0 bg-white border-b border-slate-200 p-6 rounded-t-2xl">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
                <h2 className="text-xl font-bold text-slate-900">Edit Customer</h2>
                <p className="text-sm text-slate-500 mt-1">Update customer information and aircraft details</p>
              </div>

              <div className="p-6 space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={editForm.companyName}
                        onChange={(e) => handleEditFormChange('companyName', e.target.value)}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Contact Name
                      </label>
                      <input
                        type="text"
                        value={editForm.contactName}
                        onChange={(e) => handleEditFormChange('contactName', e.target.value)}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => handleEditFormChange('email', e.target.value)}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => handleEditFormChange('phone', e.target.value)}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Industry
                      </label>
                      <select
                        value={editForm.industry}
                        onChange={(e) => handleEditFormChange('industry', e.target.value)}
                        className="input"
                      >
                        <option value="airplane">Airplane</option>
                        <option value="drone">Drone</option>
                        <option value="helicopter">Helicopter</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Status
                      </label>
                      <select
                        value={editForm.status}
                        onChange={(e) => handleEditFormChange('status', e.target.value)}
                        className="input"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="prospect">Prospect</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) => handleEditFormChange('address', e.target.value)}
                    className="input"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={editForm.notes}
                    onChange={(e) => handleEditFormChange('notes', e.target.value)}
                    rows={3}
                    className="input resize-none"
                  />
                </div>

                {/* Aircraft & Applications */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Aircraft & Applications
                    </h3>
                    <button
                      type="button"
                      onClick={handleAddAircraft}
                      className="flex items-center gap-1.5 text-sm text-aerospace-600 hover:text-aerospace-700 font-medium"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Add Aircraft
                    </button>
                  </div>

                  <div className="space-y-4">
                    {editAircraft.map((aircraft, acIndex) => (
                      <div
                        key={acIndex}
                        className="p-4 border border-slate-200 rounded-xl bg-slate-50"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <input
                            type="text"
                            value={aircraft.name}
                            onChange={(e) => handleAircraftNameChange(acIndex, e.target.value)}
                            placeholder="Aircraft name (e.g., 737 MAX)"
                            className="input flex-1"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveAircraft(acIndex)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove aircraft"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                              Applications
                            </p>
                            <button
                              type="button"
                              onClick={() => handleAddApplication(acIndex)}
                              className="text-xs text-aerospace-600 hover:text-aerospace-700 font-medium"
                            >
                              + Add Application
                            </button>
                          </div>

                          {aircraft.applications.map((app, appIndex) => (
                            <div key={appIndex} className="flex items-center gap-2">
                              <input
                                type="text"
                                value={app.name}
                                onChange={(e) =>
                                  handleApplicationChange(acIndex, appIndex, 'name', e.target.value)
                                }
                                placeholder="Application name"
                                className="input flex-1 text-sm"
                              />
                              <select
                                value={app.supplier}
                                onChange={(e) =>
                                  handleApplicationChange(acIndex, appIndex, 'supplier', e.target.value)
                                }
                                className="input w-32 text-sm"
                              >
                                <option value="AutoValve">AutoValve</option>
                                <option value="Prospect">Prospect</option>
                                <option value="Competitor">Competitor</option>
                              </select>
                              <button
                                type="button"
                                onClick={() => handleRemoveApplication(acIndex, appIndex)}
                                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                                title="Remove application"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {editAircraft.length === 0 && (
                      <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl">
                        <p className="text-slate-500 text-sm">No aircraft added yet</p>
                        <button
                          type="button"
                          onClick={handleAddAircraft}
                          className="mt-2 text-sm text-aerospace-600 hover:text-aerospace-700 font-medium"
                        >
                          Add your first aircraft
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 rounded-b-2xl flex gap-3">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCustomer}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
