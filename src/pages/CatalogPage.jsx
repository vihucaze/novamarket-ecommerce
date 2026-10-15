import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, PackageOpen, RotateCcw } from 'lucide-react';
import productService from '../services/productService';
import ProductCard from '../components/catalog/ProductCard';

const CATEGORIES = [
  { id: 'todos', label: 'Todos los Productos' },
  { id: 'periféricos', label: 'Periféricos' },
  { id: 'accesorios', label: 'Accesorios' },
  { id: 'gadgets', label: 'Gadgets' },
];

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const catParam = searchParams.get('cat') || 'todos';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(catParam);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const current = searchParams.get('cat') || 'todos';
    setSelectedCategory(current);
  }, [searchParams]);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const data = await productService.getProducts(selectedCategory === 'todos' ? null : selectedCategory);
        setProducts(data);
      } catch (err) {
        console.error('Error al cargar productos:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [selectedCategory]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'todos') {
      searchParams.delete('cat');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ cat: catId });
    }
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const term = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term)
    );
  }, [products, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-base-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Catálogo de Productos</h1>
          <p className="text-sm text-base-content/70 mt-1">
            Explorá el inventario disponible de componentes y periféricos
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered input-sm sm:input-md w-full pl-10 pr-4"
          />
          <Search className="w-4 h-4 text-base-content/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-base-content/50 hover:text-base-content"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-base-content/60 mr-1 hidden sm:inline" />
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory.toLowerCase() === cat.id.toLowerCase();
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`btn btn-sm rounded-full transition-all whitespace-nowrap ${
                isActive
                  ? 'btn-primary shadow-sm shadow-primary/20'
                  : 'btn-ghost bg-base-200 hover:bg-base-300 text-base-content/80'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card bg-base-100 border border-base-200 h-96 p-4 space-y-4 animate-pulse">
              <div className="w-full h-48 bg-base-200 rounded-xl" />
              <div className="h-4 bg-base-200 rounded w-3/4" />
              <div className="h-3 bg-base-200 rounded w-1/2" />
              <div className="h-8 bg-base-200 rounded mt-auto" />
            </div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="card bg-base-100 border border-base-200 text-center py-16 px-4 max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <PackageOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-base-content">
            ¡Ups! Parece que nos quedamos sin estos gadgets
          </h3>
          <p className="text-sm text-base-content/70 mt-2 max-w-sm mx-auto">
            No encontramos productos con esos filtros. ¿Por qué no mirás nuestras otras categorías mientras reponemos stock?
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => {
                handleCategoryChange('todos');
                setSearchQuery('');
              }}
              className="btn btn-primary btn-sm gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Ver Todo el Catálogo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CatalogPage;
