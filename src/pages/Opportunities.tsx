import { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  Calendar,
  DollarSign,
  TrendingUp,
  Plane,
  Rocket,
  Compass,
  X,
  Pencil,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import { opportunities as initialOpportunities, customers, products } from '../data/mockData';
import type { Opportunity, OpportunityStage, IndustryType } from '../types';

const stageConfig: Record<
  OpportunityStage,
  { label: string; color: string; bgColor: string; borderColor: string }
> = {
  lead: {
    label: 'Lead',
    color: 'text-slate-700',
    bgColor: 'bg-slate-100',
    borderColor: 'border-slate-300',
  },
  qualified: {
    label: 'Qualified',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-300',
  },
  proposal: {
    label: 'Proposal',
    color: 'text-amber-700',
    bgColor: 'bg-amber-100',
    borderColor: 'border-amber-300',
  },
  negotiation: {
    label: 'Negotiation',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
    borderColor: 'border-purple-300',
  },
  closed_won: {
    label: 'Won',
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-100',
    borderColor: 'border-emerald-300',
  },
  closed_lost: {
    label: 'Lost',
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-300',
  },
};

const industryIcons = {
  airplane: Plane,
  drone: Rocket,
  helicopter: Compass,
};

const stages: OpportunityStage[] = [
  'lead',
  'qualified',
  'proposal',
  'negotiation',
  'closed_won',
  'closed_lost',
];

interface OpportunityFormData {
  title: string;
  customerId: string;
  stage: OpportunityStage;
  value: string;
  probability: string;
  expectedCloseDate: string;
  notes: string;
  industry: IndustryType;
  products: { productId: string; quantity: string; price: string }[];
}

const emptyFormData: OpportunityFormData = {
  title: '',
  customerId: '',
  stage: 'lead',
  value: '',
  probability: '25',
  expectedCloseDate: '',
  notes: '',
  industry: 'airplane',
  products: [{ productId: '', quantity: '1', price: '' }],
};

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState<OpportunityStage | 'all'>('all');
  const [filterIndustry, setFilterIndustry] = useState<IndustryType | 'all'>('all');
  const [viewMode, setViewMode] = useState<'pipeline' | 'list'>('pipeline');
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingOpp, setEditingOpp] = useState<Opportunity | null>(null);
  const [formData, setFormData] = useState<OpportunityFormData>(emptyFormData);
  const [deleteConfirm, setDeleteConfirm] = useState<Opportunity | null>(null);

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = filterStage === 'all' || opp.stage === filterStage;
    const matchesIndustry = filterIndustry === 'all' || opp.industry === filterIndustry;
    return matchesSearch && matchesStage && matchesIndustry;
  });

  const getOpportunitiesByStage = (stage: OpportunityStage) => {
    return filteredOpportunities.filter((opp) => opp.stage === stage);
  };

  const calculatePipelineValue = () => {
    return filteredOpportunities
      .filter((opp) => !['closed_won', 'closed_lost'].includes(opp.stage))
      .reduce((sum, opp) => sum + opp.value * (opp.probability / 100), 0);
  };

  const openCreateForm = () => {
    setEditingOpp(null);
    setFormData(emptyFormData);
    setShowForm(true);
    setSelectedOpp(null);
  };

  const openEditForm = (opp: Opportunity) => {
    setEditingOpp(opp);
    setFormData({
      title: opp.title,
      customerId: opp.customerId,
      stage: opp.stage,
      value: opp.value.toString(),
      probability: opp.probability.toString(),
      expectedCloseDate: opp.expectedCloseDate,
      notes: opp.notes,
      industry: opp.industry,
      products: opp.products.map((p) => ({
        productId: p.productId,
        quantity: p.quantity.toString(),
        price: p.price.toString(),
      })),
    });
    setShowForm(true);
    setSelectedOpp(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customer = customers.find((c) => c.id === formData.customerId);
    const opportunityProducts = formData.products
      .filter((p) => p.productId)
      .map((p) => {
        const product = products.find((prod) => prod.id === p.productId);
        return {
          productId: p.productId,
          productName: product?.name || '',
          quantity: parseInt(p.quantity) || 1,
          price: parseFloat(p.price) || product?.price || 0,
        };
      });

    const calculatedValue = opportunityProducts.reduce(
      (sum, p) => sum + p.quantity * p.price,
      0
    );

    if (editingOpp) {
      // Update existing opportunity
      setOpportunities((prev) =>
        prev.map((opp) =>
          opp.id === editingOpp.id
            ? {
                ...opp,
                title: formData.title,
                customerId: formData.customerId,
                customerName: customer?.companyName || '',
                products: opportunityProducts,
                stage: formData.stage,
                value: parseFloat(formData.value) || calculatedValue,
                probability: parseInt(formData.probability) || 0,
                expectedCloseDate: formData.expectedCloseDate,
                notes: formData.notes,
                industry: formData.industry,
              }
            : opp
        )
      );
    } else {
      // Create new opportunity
      const newOpp: Opportunity = {
        id: Date.now().toString(),
        title: formData.title,
        customerId: formData.customerId,
        customerName: customer?.companyName || '',
        products: opportunityProducts,
        stage: formData.stage,
        value: parseFloat(formData.value) || calculatedValue,
        probability: parseInt(formData.probability) || 0,
        expectedCloseDate: formData.expectedCloseDate,
        createdAt: new Date().toISOString().split('T')[0],
        notes: formData.notes,
        industry: formData.industry,
      };
      setOpportunities((prev) => [...prev, newOpp]);
    }

    setShowForm(false);
    setEditingOpp(null);
    setFormData(emptyFormData);
  };

  const handleDelete = (opp: Opportunity) => {
    setOpportunities((prev) => prev.filter((o) => o.id !== opp.id));
    setDeleteConfirm(null);
    setSelectedOpp(null);
  };

  const addProductRow = () => {
    setFormData((prev) => ({
      ...prev,
      products: [...prev.products, { productId: '', quantity: '1', price: '' }],
    }));
  };

  const removeProductRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  const updateProductRow = (
    index: number,
    field: 'productId' | 'quantity' | 'price',
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.map((p, i) => {
        if (i !== index) return p;
        if (field === 'productId') {
          const product = products.find((prod) => prod.id === value);
          return { ...p, productId: value, price: product?.price.toString() || '' };
        }
        return { ...p, [field]: value };
      }),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Opportunities</h1>
          <p className="mt-1 text-slate-500">
            Track and manage your aerospace valve sales opportunities.
          </p>
        </div>
        <button onClick={openCreateForm} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Opportunity
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-gradient-to-br from-aerospace-500 to-aerospace-600 text-white">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white/20">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-aerospace-100">Weighted Pipeline</p>
              <p className="text-2xl font-bold">
                ${(calculatePipelineValue() / 1000000).toFixed(2)}M
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-100">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Won This Month</p>
              <p className="text-2xl font-bold text-slate-900">
                $
                {(
                  opportunities
                    .filter((o) => o.stage === 'closed_won')
                    .reduce((s, o) => s + o.value, 0) / 1000000
                ).toFixed(2)}
                M
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-100">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500">Closing This Month</p>
              <p className="text-2xl font-bold text-slate-900">
                {filteredOpportunities.filter((o) => !o.stage.startsWith('closed')).length}
              </p>
            </div>
          </div>
        </div>
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
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-400" />
              <select
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value as OpportunityStage | 'all')}
                className="input w-auto"
              >
                <option value="all">All Stages</option>
                {stages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stageConfig[stage].label}
                  </option>
                ))}
              </select>
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
              onClick={() => setViewMode('pipeline')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'pipeline'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pipeline
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Pipeline View */}
      {viewMode === 'pipeline' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stages.map((stage) => {
            const stageOpps = getOpportunitiesByStage(stage);
            const stageTotal = stageOpps.reduce((sum, opp) => sum + opp.value, 0);
            const config = stageConfig[stage];

            return (
              <div key={stage} className="flex flex-col">
                {/* Column Header */}
                <div
                  className={`p-3 rounded-t-xl border-t-4 ${config.borderColor} bg-white shadow-sm`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${config.color}`}>
                      {config.label}
                    </span>
                    <span
                      className={`w-6 h-6 rounded-full ${config.bgColor} ${config.color} text-xs font-bold flex items-center justify-center`}
                    >
                      {stageOpps.length}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    ${(stageTotal / 1000).toFixed(0)}K
                  </p>
                </div>

                {/* Cards */}
                <div className="flex-1 space-y-3 p-3 bg-slate-100 rounded-b-xl min-h-[400px]">
                  {stageOpps.map((opp) => {
                    const IndustryIcon = industryIcons[opp.industry];
                    return (
                      <div
                        key={opp.id}
                        onClick={() => setSelectedOpp(opp)}
                        className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-slate-200 hover:border-aerospace-300"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              opp.industry === 'airplane'
                                ? 'bg-blue-100'
                                : opp.industry === 'drone'
                                ? 'bg-purple-100'
                                : 'bg-emerald-100'
                            }`}
                          >
                            <IndustryIcon
                              className={`w-4 h-4 ${
                                opp.industry === 'airplane'
                                  ? 'text-blue-600'
                                  : opp.industry === 'drone'
                                  ? 'text-purple-600'
                                  : 'text-emerald-600'
                              }`}
                            />
                          </div>
                          <span className="text-sm font-bold text-slate-900">
                            ${(opp.value / 1000).toFixed(0)}K
                          </span>
                        </div>
                        <h4 className="font-medium text-slate-900 text-sm line-clamp-2">
                          {opp.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">{opp.customerName}</p>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs text-slate-400">
                            {opp.probability}% prob.
                          </span>
                          <span className="text-xs text-slate-400">
                            {new Date(opp.expectedCloseDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="card overflow-hidden p-0">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Opportunity
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Probability
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Close Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOpportunities.map((opp) => {
                const config = stageConfig[opp.stage];
                const IndustryIcon = industryIcons[opp.industry];
                return (
                  <tr
                    key={opp.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => setSelectedOpp(opp)}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            opp.industry === 'airplane'
                              ? 'bg-blue-100'
                              : opp.industry === 'drone'
                              ? 'bg-purple-100'
                              : 'bg-emerald-100'
                          }`}
                        >
                          <IndustryIcon
                            className={`w-5 h-5 ${
                              opp.industry === 'airplane'
                                ? 'text-blue-600'
                                : opp.industry === 'drone'
                                ? 'text-purple-600'
                                : 'text-emerald-600'
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{opp.title}</p>
                          <p className="text-sm text-slate-500 capitalize">{opp.industry}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{opp.customerName}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      ${(opp.value / 1000).toFixed(0)}K
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.color}`}
                      >
                        {config.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden w-16">
                          <div
                            className={`h-full rounded-full ${
                              opp.probability >= 70
                                ? 'bg-emerald-500'
                                : opp.probability >= 40
                                ? 'bg-amber-500'
                                : 'bg-slate-400'
                            }`}
                            style={{ width: `${opp.probability}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-600">{opp.probability}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(opp.expectedCloseDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditForm(opp);
                          }}
                          className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-aerospace-600 transition-colors"
                          title="Edit opportunity"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirm(opp);
                          }}
                          className="p-2 hover:bg-red-50 rounded-lg text-slate-500 hover:text-red-600 transition-colors"
                          title="Delete opportunity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Opportunity Detail Modal */}
      {selectedOpp && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedOpp(null)}
            />
            <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 z-10 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setSelectedOpp(null)}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>

              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedOpp.industry === 'airplane'
                      ? 'bg-blue-100'
                      : selectedOpp.industry === 'drone'
                      ? 'bg-purple-100'
                      : 'bg-emerald-100'
                  }`}
                >
                  {(() => {
                    const Icon = industryIcons[selectedOpp.industry];
                    return (
                      <Icon
                        className={`w-6 h-6 ${
                          selectedOpp.industry === 'airplane'
                            ? 'text-blue-600'
                            : selectedOpp.industry === 'drone'
                            ? 'text-purple-600'
                            : 'text-emerald-600'
                        }`}
                      />
                    );
                  })()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{selectedOpp.title}</h2>
                  <p className="text-slate-500">{selectedOpp.customerName}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Value</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    ${selectedOpp.value.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Probability</p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {selectedOpp.probability}%
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Stage</p>
                  <span
                    className={`mt-1 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      stageConfig[selectedOpp.stage].bgColor
                    } ${stageConfig[selectedOpp.stage].color}`}
                  >
                    {stageConfig[selectedOpp.stage].label}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Expected Close</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {new Date(selectedOpp.expectedCloseDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
                  Products
                </h3>
                <div className="space-y-2">
                  {selectedOpp.products.map((product, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-50"
                    >
                      <div>
                        <p className="font-medium text-slate-900">{product.productName}</p>
                        <p className="text-sm text-slate-500">Qty: {product.quantity}</p>
                      </div>
                      <p className="font-semibold text-slate-900">
                        ${(product.quantity * product.price).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-slate-50">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Notes</p>
                <p className="mt-1 text-slate-700">{selectedOpp.notes}</p>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => openEditForm(selectedOpp)}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  <Pencil className="w-4 h-4" />
                  Edit Opportunity
                </button>
                <button
                  onClick={() => setDeleteConfirm(selectedOpp)}
                  className="btn-secondary flex-1 flex items-center justify-center gap-2 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowForm(false)}
            />
            <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 z-10 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>

              <h2 className="text-xl font-bold text-slate-900 mb-6">
                {editingOpp ? 'Edit Opportunity' : 'New Opportunity'}
              </h2>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="input"
                    placeholder="e.g., Boeing 787 Fuel System Upgrade"
                  />
                </div>

                {/* Customer and Industry */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Customer *
                    </label>
                    <select
                      required
                      value={formData.customerId}
                      onChange={(e) => {
                        const customer = customers.find((c) => c.id === e.target.value);
                        setFormData({
                          ...formData,
                          customerId: e.target.value,
                          industry: customer?.industry || formData.industry,
                        });
                      }}
                      className="input"
                    >
                      <option value="">Select customer...</option>
                      {customers.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.companyName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Industry *
                    </label>
                    <select
                      required
                      value={formData.industry}
                      onChange={(e) =>
                        setFormData({ ...formData, industry: e.target.value as IndustryType })
                      }
                      className="input"
                    >
                      <option value="airplane">Airplane</option>
                      <option value="drone">Drone</option>
                      <option value="helicopter">Helicopter</option>
                    </select>
                  </div>
                </div>

                {/* Stage and Probability */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Stage *
                    </label>
                    <select
                      required
                      value={formData.stage}
                      onChange={(e) =>
                        setFormData({ ...formData, stage: e.target.value as OpportunityStage })
                      }
                      className="input"
                    >
                      {stages.map((stage) => (
                        <option key={stage} value={stage}>
                          {stageConfig[stage].label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Probability (%) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      max="100"
                      value={formData.probability}
                      onChange={(e) => setFormData({ ...formData, probability: e.target.value })}
                      className="input"
                    />
                  </div>
                </div>

                {/* Value and Close Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Value ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      className="input"
                      placeholder="Auto-calculated from products"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Expected Close Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.expectedCloseDate}
                      onChange={(e) =>
                        setFormData({ ...formData, expectedCloseDate: e.target.value })
                      }
                      className="input"
                    />
                  </div>
                </div>

                {/* Products */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-slate-700">Products</label>
                    <button
                      type="button"
                      onClick={addProductRow}
                      className="text-sm text-aerospace-600 hover:text-aerospace-700 font-medium"
                    >
                      + Add Product
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.products.map((product, idx) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <select
                          value={product.productId}
                          onChange={(e) => updateProductRow(idx, 'productId', e.target.value)}
                          className="input flex-1"
                        >
                          <option value="">Select product...</option>
                          {products.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name} - ${p.price.toLocaleString()}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          min="1"
                          value={product.quantity}
                          onChange={(e) => updateProductRow(idx, 'quantity', e.target.value)}
                          className="input w-20"
                          placeholder="Qty"
                        />
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={product.price}
                          onChange={(e) => updateProductRow(idx, 'price', e.target.value)}
                          className="input w-28"
                          placeholder="Price"
                        />
                        {formData.products.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeProductRow(idx)}
                            className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="input min-h-[80px]"
                    placeholder="Additional notes about this opportunity..."
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button type="submit" className="btn-primary flex-1">
                    {editingOpp ? 'Update Opportunity' : 'Create Opportunity'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setDeleteConfirm(null)}
            />
            <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Delete Opportunity</h2>
                  <p className="text-slate-500 text-sm">This action cannot be undone.</p>
                </div>
              </div>

              <p className="text-slate-600 mb-6">
                Are you sure you want to delete <strong>"{deleteConfirm.title}"</strong>? This
                will permanently remove this opportunity and all associated data.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Delete Opportunity
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
