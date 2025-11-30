import { useState } from 'react';
import {
  User,
  Building,
  Bell,
  Shield,
  Palette,
  Database,
  Globe,
  Mail,
  Save,
  Check,
} from 'lucide-react';

const tabs = [
  { id: 'profile', name: 'Profile', icon: User },
  { id: 'company', name: 'Company', icon: Building },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'appearance', name: 'Appearance', icon: Palette },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="mt-1 text-slate-500">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-aerospace-50 text-aerospace-700 font-medium'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <tab.icon
                  className={`w-5 h-5 ${
                    activeTab === tab.id ? 'text-aerospace-600' : 'text-slate-400'
                  }`}
                />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Profile Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-aerospace-400 to-aerospace-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    JD
                  </div>
                  <div>
                    <button className="btn-secondary text-sm">Change Photo</button>
                    <p className="mt-2 text-xs text-slate-500">
                      JPG, GIF or PNG. Max size of 800K
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      First Name
                    </label>
                    <input type="text" defaultValue="John" className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Last Name
                    </label>
                    <input type="text" defaultValue="Doe" className="input" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input type="email" defaultValue="john.doe@aerovalve.com" className="input" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input type="tel" defaultValue="+1 (555) 123-4567" className="input" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Job Title
                  </label>
                  <input type="text" defaultValue="Sales Manager" className="input" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                  <textarea
                    rows={3}
                    defaultValue="Experienced aerospace sales professional with 10+ years in the industry."
                    className="input resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Company Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Company Name
                  </label>
                  <input type="text" defaultValue="AeroValve Inc." className="input" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Industry
                    </label>
                    <select className="input">
                      <option>Aerospace Manufacturing</option>
                      <option>Defense Contractor</option>
                      <option>Aviation Parts Supplier</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Company Size
                    </label>
                    <select className="input">
                      <option>1-50 employees</option>
                      <option>51-200 employees</option>
                      <option>201-500 employees</option>
                      <option>500+ employees</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    defaultValue="1234 Aerospace Blvd, Suite 100"
                    className="input"
                  />
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                    <input type="text" defaultValue="Seattle" className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
                    <input type="text" defaultValue="WA" className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      ZIP Code
                    </label>
                    <input type="text" defaultValue="98101" className="input" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Website</label>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-slate-400" />
                    <input type="url" defaultValue="https://aerovalve.com" className="input" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">
                Notification Preferences
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between py-4 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-blue-100">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Email Notifications</p>
                      <p className="text-sm text-slate-500">Receive email updates about your account</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-aerospace-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aerospace-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-4 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-emerald-100">
                      <Database className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Deal Updates</p>
                      <p className="text-sm text-slate-500">Get notified when deals are updated</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-aerospace-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aerospace-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-4 border-b border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-amber-100">
                      <Bell className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Task Reminders</p>
                      <p className="text-sm text-slate-500">Receive reminders for upcoming tasks</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-aerospace-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aerospace-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-purple-100">
                      <User className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">New Customer Alerts</p>
                      <p className="text-sm text-slate-500">Get alerted when new customers are added</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-aerospace-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-aerospace-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="card">
                <h2 className="text-lg font-semibold text-slate-900 mb-6">Change Password</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Current Password
                    </label>
                    <input type="password" placeholder="••••••••" className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      New Password
                    </label>
                    <input type="password" placeholder="••••••••" className="input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Confirm New Password
                    </label>
                    <input type="password" placeholder="••••••••" className="input" />
                  </div>
                  <button className="btn-secondary">Update Password</button>
                </div>
              </div>

              <div className="card">
                <h2 className="text-lg font-semibold text-slate-900 mb-6">
                  Two-Factor Authentication
                </h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-700">
                      Add an extra layer of security to your account
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Currently disabled
                    </p>
                  </div>
                  <button className="btn-primary">Enable 2FA</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Appearance Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-4">
                    Theme
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <button className="p-4 rounded-xl border-2 border-aerospace-500 bg-white flex flex-col items-center gap-2">
                      <div className="w-full h-12 rounded-lg bg-gradient-to-br from-slate-100 to-white border border-slate-200"></div>
                      <span className="text-sm font-medium text-slate-900">Light</span>
                    </button>
                    <button className="p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 flex flex-col items-center gap-2">
                      <div className="w-full h-12 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700"></div>
                      <span className="text-sm font-medium text-slate-600">Dark</span>
                    </button>
                    <button className="p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 flex flex-col items-center gap-2">
                      <div className="w-full h-12 rounded-lg bg-gradient-to-r from-white to-slate-800 border border-slate-300"></div>
                      <span className="text-sm font-medium text-slate-600">System</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-4">
                    Accent Color
                  </label>
                  <div className="flex gap-3">
                    <button className="w-10 h-10 rounded-full bg-aerospace-500 ring-2 ring-offset-2 ring-aerospace-500"></button>
                    <button className="w-10 h-10 rounded-full bg-emerald-500 hover:ring-2 hover:ring-offset-2 hover:ring-emerald-500"></button>
                    <button className="w-10 h-10 rounded-full bg-purple-500 hover:ring-2 hover:ring-offset-2 hover:ring-purple-500"></button>
                    <button className="w-10 h-10 rounded-full bg-amber-500 hover:ring-2 hover:ring-offset-2 hover:ring-amber-500"></button>
                    <button className="w-10 h-10 rounded-full bg-rose-500 hover:ring-2 hover:ring-offset-2 hover:ring-rose-500"></button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Sidebar Width
                  </label>
                  <select className="input w-auto">
                    <option>Normal</option>
                    <option>Compact</option>
                    <option>Wide</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-6 flex items-center justify-end gap-4">
            {saved && (
              <span className="flex items-center gap-2 text-emerald-600">
                <Check className="w-5 h-5" />
                Settings saved!
              </span>
            )}
            <button onClick={handleSave} className="btn-primary flex items-center gap-2">
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
