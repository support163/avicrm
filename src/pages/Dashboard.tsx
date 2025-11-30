import {
  DollarSign,
  Users,
  TrendingUp,
  Target,
  Plane,
  Rocket,
  Compass,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { dashboardStats, opportunities, customers } from '../data/mockData';

const stats = [
  {
    name: 'Total Revenue',
    value: `$${(dashboardStats.totalRevenue / 1000000).toFixed(2)}M`,
    change: '+12.5%',
    changeType: 'positive',
    icon: DollarSign,
    color: 'bg-emerald-500',
  },
  {
    name: 'Active Customers',
    value: dashboardStats.activeCustomers.toString(),
    change: '+2',
    changeType: 'positive',
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    name: 'Open Opportunities',
    value: dashboardStats.openOpportunities.toString(),
    change: '-1',
    changeType: 'neutral',
    icon: Target,
    color: 'bg-amber-500',
  },
  {
    name: 'Pipeline Value',
    value: `$${(dashboardStats.pipelineValue / 1000000).toFixed(1)}M`,
    change: '+24.3%',
    changeType: 'positive',
    icon: TrendingUp,
    color: 'bg-purple-500',
  },
];

const industryData = [
  {
    name: 'Airplane',
    icon: Plane,
    value: dashboardStats.industryBreakdown.airplane,
    color: 'bg-blue-500',
    textColor: 'text-blue-600',
    bgLight: 'bg-blue-50',
  },
  {
    name: 'Drone',
    icon: Rocket,
    value: dashboardStats.industryBreakdown.drone,
    color: 'bg-purple-500',
    textColor: 'text-purple-600',
    bgLight: 'bg-purple-50',
  },
  {
    name: 'Helicopter',
    icon: Compass,
    value: dashboardStats.industryBreakdown.helicopter,
    color: 'bg-emerald-500',
    textColor: 'text-emerald-600',
    bgLight: 'bg-emerald-50',
  },
];

const stageColors: Record<string, string> = {
  lead: 'bg-slate-100 text-slate-700',
  qualified: 'bg-blue-100 text-blue-700',
  proposal: 'bg-amber-100 text-amber-700',
  negotiation: 'bg-purple-100 text-purple-700',
  closed_won: 'bg-emerald-100 text-emerald-700',
  closed_lost: 'bg-red-100 text-red-700',
};

const stageLabels: Record<string, string> = {
  lead: 'Lead',
  qualified: 'Qualified',
  proposal: 'Proposal',
  negotiation: 'Negotiation',
  closed_won: 'Won',
  closed_lost: 'Lost',
};

export default function Dashboard() {
  const recentOpportunities = opportunities.slice(0, 5);
  const totalIndustryValue = Object.values(dashboardStats.industryBreakdown).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-slate-500">
          Welcome back! Here's an overview of your aerospace valve sales.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.color} shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              {stat.changeType === 'positive' ? (
                <span className="flex items-center text-sm text-emerald-600 font-medium">
                  <ArrowUpRight className="w-4 h-4" />
                  {stat.change}
                </span>
              ) : stat.changeType === 'negative' ? (
                <span className="flex items-center text-sm text-red-600 font-medium">
                  <ArrowDownRight className="w-4 h-4" />
                  {stat.change}
                </span>
              ) : (
                <span className="text-sm text-slate-500 font-medium">{stat.change}</span>
              )}
              <span className="text-sm text-slate-400">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Industry Breakdown */}
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">
            Pipeline by Industry
          </h2>
          <div className="space-y-4">
            {industryData.map((industry) => {
              const percentage = (industry.value / totalIndustryValue) * 100;
              return (
                <div key={industry.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${industry.bgLight}`}>
                        <industry.icon className={`w-4 h-4 ${industry.textColor}`} />
                      </div>
                      <span className="font-medium text-slate-700">{industry.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">
                      ${(industry.value / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${industry.color} rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Conversion Rate */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Conversion Rate</span>
              <span className="text-2xl font-bold text-aerospace-600">
                {dashboardStats.conversionRate.toFixed(1)}%
              </span>
            </div>
            <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-aerospace-500 to-aerospace-600 rounded-full"
                style={{ width: `${dashboardStats.conversionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Recent Opportunities */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Opportunities
            </h2>
            <a
              href="/opportunities"
              className="text-sm text-aerospace-600 hover:text-aerospace-700 font-medium"
            >
              View all →
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="pb-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Opportunity
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="pb-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Stage
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOpportunities.map((opp) => (
                  <tr key={opp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4">
                      <p className="font-medium text-slate-900">{opp.title}</p>
                      <p className="text-sm text-slate-500 capitalize">{opp.industry}</p>
                    </td>
                    <td className="py-4 text-slate-600">{opp.customerName}</td>
                    <td className="py-4 font-semibold text-slate-900">
                      ${(opp.value / 1000).toFixed(0)}K
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          stageColors[opp.stage]
                        }`}
                      >
                        {stageLabels[opp.stage]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Customers */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Top Customers
          </h2>
          <a
            href="/customers"
            className="text-sm text-aerospace-600 hover:text-aerospace-700 font-medium"
          >
            View all →
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {customers.slice(0, 4).map((customer) => (
            <div
              key={customer.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-aerospace-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-aerospace-400 to-aerospace-600 flex items-center justify-center text-white font-semibold text-sm">
                  {customer.companyName.substring(0, 2).toUpperCase()}
                </div>
                <span
                  className={`badge ${
                    customer.industry === 'airplane'
                      ? 'badge-airplane'
                      : customer.industry === 'drone'
                      ? 'badge-drone'
                      : 'badge-helicopter'
                  }`}
                >
                  {customer.industry}
                </span>
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">{customer.companyName}</h3>
              <p className="text-sm text-slate-500">{customer.contactName}</p>
              <p className="mt-2 text-xs text-slate-400">{customer.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
