import { useState, useEffect } from 'react';
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
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { opportunityAPI } from '../api/client';
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

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState<OpportunityStage | 'all'>('all');
  const [filterIndustry, setFilterIndustry] = useState<IndustryType | 'all'>('all');
  const [viewMode, setViewMode] = useState<'pipeline' | 'list'>('pipeline');
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [saving, setSaving] = useState(false);

  // Fetch opportunities from API
  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await opportunityAPI.getAll();
      setOpportunities(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load opportunities');
      console.error('Error fetching opportunities:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOpportunity = async (id: string, updates: Partial<Opportunity>) => {
    try {
      setSaving(true);
      const updated = await opportunityAPI.update(id, updates);
      setOpportunities(opps => opps.map(o => o.id === id ? updated : o));
      if (selectedOpp?.id === id) {
        setSelectedOpp(updated);
      }
    } catch (err) {
      console.error('Error updating opportunity:', err);
      alert('Failed to update opportunity');
    } finally {
      setSaving(false);
    }
  };

  const handleStageChange = async (oppId: string, newStage: OpportunityStage) => {
    // Update probability based on stage
    const probabilityMap: Record<OpportunityStage, number> = {
      lead: 10,
      qualified: 25,
      proposal: 50,
      negotiation: 75,
      closed_won: 100,
      closed_lost: 0,
    };
    await handleUpdateOpportunity(oppId, {
      stage: newStage,
      probability: probabilityMap[newStage]
    });
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-aerospace-600" />
        <span className="ml-2 text-slate-600">Loading opportunities...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Failed to Load</h2>
        <p className="text-slate-600 mb-4">{error}</p>
        <button onClick={fetchOpportunities} className="btn-primary">
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
          <h1 className="text-3xl font-bold text-slate-900">Opportunities</h1>
          <p className="mt-1 text-slate-500">
            Track and manage your aerospace valve sales opportunities.
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2">
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
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOpportunities.map((opp) => {
                const config = stageConfig[opp.stage];
                const IndustryIcon = industryIcons[opp.industry];
                return (
                  <tr
                    key={opp.id}
                    onClick={() => setSelectedOpp(opp)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
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
                  <select
                    value={selectedOpp.stage}
                    onChange={(e) => handleStageChange(selectedOpp.id, e.target.value as OpportunityStage)}
                    disabled={saving}
                    className="mt-1 w-full p-2 rounded-lg border border-slate-200 text-sm font-medium"
                  >
                    {stages.map((stage) => (
                      <option key={stage} value={stage}>
                        {stageConfig[stage].label}
                      </option>
                    ))}
                  </select>
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
                <button className="btn-primary flex-1" disabled={saving}>
                  {saving ? 'Saving...' : 'Edit Opportunity'}
                </button>
                <button
                  className="btn-secondary flex-1"
                  onClick={() => setSelectedOpp(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
