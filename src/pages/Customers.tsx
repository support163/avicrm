import { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  Mail,
  Phone,
  MapPin,
  MoreVertical,
  Plane,
  Rocket,
  Compass,
  X,
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

const statusColors = {
  active: 'bg-emerald-100 text-emerald-700',
  inactive: 'bg-slate-100 text-slate-600',
  prospect: 'bg-amber-100 text-amber-700',
};

export default function Customers() {
  const [customers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState<IndustryType | 'all'>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = filterIndustry === 'all' || customer.industry === filterIndustry;
    return matchesSearch && matchesIndustry;
  });

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
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search customers..."
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
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => {
          const IndustryIcon = industryIcons[customer.industry];
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

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="truncate">{customer.address}</span>
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
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    statusColors[customer.status]
                  }`}
                >
                  {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

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
