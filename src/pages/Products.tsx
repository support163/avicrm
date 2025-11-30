import { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  Package,
  Check,
  X,
  Plane,
  Rocket,
  Compass,
  ChevronRight,
} from 'lucide-react';
import { products as initialProducts } from '../data/mockData';
import type { Product, IndustryType } from '../types';

const industryIcons = {
  airplane: Plane,
  drone: Rocket,
  helicopter: Compass,
};

const categoryColors: Record<string, string> = {
  'Check Valves': 'bg-blue-100 text-blue-700',
  'Relief Valves': 'bg-amber-100 text-amber-700',
  'Servo Valves': 'bg-purple-100 text-purple-700',
  'Shutoff Valves': 'bg-red-100 text-red-700',
  'Proportional Valves': 'bg-emerald-100 text-emerald-700',
  'Pressure Regulators': 'bg-cyan-100 text-cyan-700',
  'Flow Control Valves': 'bg-indigo-100 text-indigo-700',
  'Selector Valves': 'bg-pink-100 text-pink-700',
};

export default function Products() {
  const [products] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterIndustry, setFilterIndustry] = useState<IndustryType | 'all'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesIndustry =
      filterIndustry === 'all' || product.industries.includes(filterIndustry);
    return matchesSearch && matchesCategory && matchesIndustry;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Products</h1>
          <p className="mt-1 text-slate-500">
            Aerospace valve catalog for aviation, drone, and helicopter industries.
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search products by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="input w-auto"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

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

      <div className="flex gap-6">
        {/* Product List */}
        <div className="flex-1 space-y-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className={`card hover:shadow-lg transition-all duration-200 cursor-pointer group ${
                selectedProduct?.id === product.id
                  ? 'ring-2 ring-aerospace-500 border-aerospace-300'
                  : ''
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Product Image Placeholder */}
                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center flex-shrink-0">
                  <Package className="w-10 h-10 text-slate-400" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900 group-hover:text-aerospace-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-slate-500 mt-0.5">SKU: {product.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-slate-900">
                        ${product.price.toLocaleString()}
                      </p>
                      {product.inStock ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                          <Check className="w-3.5 h-3.5" />
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-red-600 font-medium">
                          <X className="w-3.5 h-3.5" />
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          categoryColors[product.category] || 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1">
                        {product.industries.map((ind) => {
                          const Icon = industryIcons[ind];
                          return (
                            <span
                              key={ind}
                              className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center"
                              title={ind}
                            >
                              <Icon className="w-3.5 h-3.5 text-slate-500" />
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-aerospace-500 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 card">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">No products found</h3>
              <p className="mt-1 text-slate-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>

        {/* Product Detail Sidebar */}
        {selectedProduct && (
          <div className="hidden lg:block w-96 flex-shrink-0">
            <div className="card sticky top-8">
              <div className="w-full h-48 rounded-xl bg-gradient-to-br from-aerospace-100 to-aerospace-200 flex items-center justify-center mb-6">
                <Package className="w-20 h-20 text-aerospace-400" />
              </div>

              <div className="space-y-4">
                <div>
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium mb-2 ${
                      categoryColors[selectedProduct.category] || 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {selectedProduct.category}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">{selectedProduct.name}</h2>
                  <p className="text-sm text-slate-500">SKU: {selectedProduct.sku}</p>
                </div>

                <p className="text-slate-600">{selectedProduct.description}</p>

                <div className="flex items-center justify-between py-4 border-y border-slate-200">
                  <span className="text-2xl font-bold text-slate-900">
                    ${selectedProduct.price.toLocaleString()}
                  </span>
                  {selectedProduct.inStock ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                      <Check className="w-4 h-4" />
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                      <X className="w-4 h-4" />
                      Out of Stock
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
                    Specifications
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Pressure Rating</span>
                      <span className="text-sm font-medium text-slate-900">
                        {selectedProduct.specifications.pressureRating}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Material</span>
                      <span className="text-sm font-medium text-slate-900">
                        {selectedProduct.specifications.material}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-sm text-slate-500">Connection</span>
                      <span className="text-sm font-medium text-slate-900">
                        {selectedProduct.specifications.connectionType}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-slate-500">Temperature</span>
                      <span className="text-sm font-medium text-slate-900">
                        {selectedProduct.specifications.temperature}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
                    Suitable Industries
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.industries.map((ind) => {
                      const Icon = industryIcons[ind];
                      return (
                        <span
                          key={ind}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                            ind === 'airplane'
                              ? 'bg-blue-100 text-blue-700'
                              : ind === 'drone'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {ind.charAt(0).toUpperCase() + ind.slice(1)}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <button className="btn-primary w-full mt-4">Add to Quote</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
