import { useState, useEffect } from 'react';
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
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { customerAPI, aircraftAPI, type AircraftEntry } from '../api/client';
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

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerAircraft, setCustomerAircraft] = useState<Record<string, AircraftEntry[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState<IndustryType | 'all'>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Fetch data from API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [customersData, aircraftData] = await Promise.all([
        customerAPI.getAll(),
        aircraftAPI.getAll()
      ]);
      setCustomers(customersData);
      setCustomerAircraft(aircraftData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const aircraftList = customerAircraft[customer.id] || [];
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-aerospace-600" />
        <span className="ml-2 text-slate-600">Loading customers...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Failed to Load</h2>
        <p className="text-slate-600 mb-4">{error}</p>
        <button onClick={fetchData} className="btn-primary">
          Retry
        </button>
      </div>
    );
  }

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
                  const aircraftList = customerAircraft[customer.id] || [];
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
            const aircraftList = customerAircraft[customer.id] || [];
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
                    {(customerAircraft[selectedCustomer.id] || []).map((aircraft, acIndex) => (
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
                <button className="btn-primary flex-1">Edit Customer</button>
                <button className="btn-secondary flex-1">View Opportunities</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
