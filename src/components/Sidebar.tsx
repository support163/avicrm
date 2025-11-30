import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Package,
  TrendingUp,
  Settings,
  Plane,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Opportunities', href: '/opportunities', icon: TrendingUp },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-aerospace-900 to-aerospace-950 text-white">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-aerospace-700/50">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-aerospace-500 shadow-lg shadow-aerospace-500/30">
          <Plane className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight">AeroValve</h1>
          <p className="text-xs text-aerospace-300">CRM System</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-6 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-aerospace-500/20 text-white shadow-sm'
                  : 'text-aerospace-200 hover:bg-aerospace-800/50 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? 'text-aerospace-300' : 'text-aerospace-400'
                  }`}
                />
                <span className="font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-aerospace-400" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-aerospace-700/50">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-aerospace-400 to-aerospace-600 flex items-center justify-center text-sm font-semibold shadow-lg">
            AV
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">AeroValve Inc.</p>
            <p className="text-xs text-aerospace-400 truncate">Enterprise License</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
