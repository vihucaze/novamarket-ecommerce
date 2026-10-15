import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Package, ShoppingBag, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import productService from '../services/productService';
import orderService from '../services/orderService';
import { formatCurrency } from '../utils/formatters';

const CATEGORIES = ['periféricos', 'accesorios', 'gadgets'];

export function AdminPage() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'periféricos',
    price: '',
    stock: '',
    imageUrl: '',
    description: '',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodsData, ordersData] = await Promise.all([
        productService.getProducts(),
        orderService.getAllOrders(),
      ]);
      setProducts(prodsData);
      setOrders(ordersData);
    } catch (err) {
      console.error('Error cargando datos de admin:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'periféricos',
      price: '',
      stock: '',
      imageUrl: '',
      description: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      stock: prod.stock,
      imageUrl: prod.imageUrl || '',
      description: prod.description || '',
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
        description: formData.description,
      };

      if (editingProduct) {
        await productService.updateProduct(editingProduct._id, payload);
      } else {
        await productService.createProduct(payload);
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      alert('Error guardando producto: ' + err.message);
    }
  };

  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`¿Estás seguro de desactivar (Soft Delete) el producto "${name}"?`)) {
      try {
        await productService.deleteProduct(id);
        loadData();
      } catch (err) {
        alert('Error eliminando producto: ' + err.message);
      }
    }
  };

  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      loadData();
    } catch (err) {
      alert('Error actualizando orden: ' + err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-base-200 pb-6">
        <div>
          <span className="badge badge-secondary font-bold text-xs uppercase px-3 py-1 mb-2">
            Panel de Control
          </span>
          <h1 className="text-3xl font-black tracking-tight">Administración NovaMarket</h1>
          <p className="text-xs text-base-content/70 mt-1">
            Gestión en tiempo real de catálogo de productos y pedidos recibidos
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={loadData} className="btn btn-ghost btn-sm gap-2">
            <RefreshCw className="w-4 h-4" /> Refrescar
          </button>
          {activeTab === 'products' && (
            <button onClick={handleOpenCreate} className="btn btn-primary btn-sm gap-2 shadow-md">
              <Plus className="w-4 h-4" /> Nuevo Producto
            </button>
          )}
        </div>
      </div>

      <div className="tabs tabs-boxed bg-base-200 p-1 w-fit rounded-xl">
        <button
          onClick={() => setActiveTab('products')}
          className={`tab gap-2 text-xs font-bold rounded-lg ${
            activeTab === 'products' ? 'tab-active bg-primary text-white' : ''
          }`}
        >
          <Package className="w-4 h-4" /> Productos ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`tab gap-2 text-xs font-bold rounded-lg ${
            activeTab === 'orders' ? 'tab-active bg-primary text-white' : ''
          }`}
        >
          <ShoppingBag className="w-4 h-4" /> Pedidos ({orders.length})
        </button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : activeTab === 'products' ? (
        <div className="card bg-base-100 border border-base-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-xs">
              <thead className="bg-base-200/60 uppercase text-[10px] text-base-content/70">
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Estado</th>
                  <th className="text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-base-content/60">
                      No hay productos registrados en el sistema.
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p._id} className="hover">
                      <td className="font-bold flex items-center gap-3 py-3">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-base-200 shrink-0"
                          onError={(e) => (e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=100&q=80')}
                        />
                        <div className="max-w-xs truncate">
                          <span className="block font-semibold">{p.name}</span>
                          <span className="text-[10px] text-base-content/50 font-normal">
                            ID: {p._id}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-sm badge-ghost uppercase text-[10px] font-bold">
                          {p.category}
                        </span>
                      </td>
                      <td className="font-extrabold text-primary">{formatCurrency(p.price)}</td>
                      <td>
                        {p.stock <= 0 ? (
                          <span className="badge badge-error badge-sm text-white">0 (Agotado)</span>
                        ) : p.stock <= 5 ? (
                          <span className="badge badge-warning badge-sm text-white font-bold">
                            {p.stock} (Bajo)
                          </span>
                        ) : (
                          <span className="font-semibold">{p.stock}</span>
                        )}
                      </td>
                      <td>
                        {p.active !== false ? (
                          <span className="badge badge-success badge-sm text-white font-medium">Activo</span>
                        ) : (
                          <span className="badge badge-error badge-sm text-white font-medium">Inactivo</span>
                        )}
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="btn btn-ghost btn-xs text-primary"
                            title="Editar producto"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p._id, p.name)}
                            className="btn btn-ghost btn-xs text-error"
                            title="Desactivar producto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card bg-base-100 border border-base-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-xs">
              <thead className="bg-base-200/60 uppercase text-[10px] text-base-content/70">
                <tr>
                  <th>N° Orden</th>
                  <th>Fecha</th>
                  <th>Cliente / Entrega</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th className="text-right">Cambiar Estado</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-8 text-base-content/60">
                      No hay pedidos registrados hasta el momento.
                    </td>
                  </tr>
                ) : (
                  orders.map((o) => (
                    <tr key={o._id} className="hover">
                      <td className="font-mono font-bold text-primary">{o._id}</td>
                      <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="font-semibold">
                          {o.shippingAddress?.fullName || 'Cliente General'}
                        </div>
                        <div className="text-[10px] text-base-content/60">
                          {o.shippingAddress?.city || 'Ciudad'}, {o.shippingAddress?.phone}
                        </div>
                      </td>
                      <td className="font-black text-primary">{formatCurrency(o.totalAmount)}</td>
                      <td>
                        <span
                          className={`badge badge-sm font-bold uppercase text-[10px] ${
                            o.status === 'confirmed'
                              ? 'badge-success text-white'
                              : o.status === 'cancelled'
                              ? 'badge-error text-white'
                              : 'badge-warning text-white'
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="text-right">
                        <select
                          value={o.status}
                          onChange={(e) => handleOrderStatusChange(o._id, e.target.value)}
                          className="select select-bordered select-xs"
                        >
                          <option value="pending">Pendiente</option>
                          <option value="confirmed">Confirmado</option>
                          <option value="cancelled">Cancelado</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-lg rounded-2xl">
            <h3 className="font-extrabold text-lg mb-4">
              {editingProduct ? 'Editar Producto' : 'Crear Nuevo Producto'}
            </h3>
            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="form-control">
                <label className="label py-1 font-bold">Nombre del Producto</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Teclado Mecánico RGB"
                  className="input input-bordered input-sm w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-control">
                  <label className="label py-1 font-bold">Categoría</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="select select-bordered select-sm w-full capitalize"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label py-1 font-bold">Precio ($)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="45000"
                    className="input input-bordered input-sm w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-control">
                  <label className="label py-1 font-bold">Stock Disponible</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="10"
                    className="input input-bordered input-sm w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label py-1 font-bold">URL de la Imagen</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://..."
                    className="input input-bordered input-sm w-full"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label py-1 font-bold">Descripción</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detalles técnicos y características principales..."
                  className="textarea textarea-bordered textarea-sm w-full"
                />
              </div>

              <div className="modal-action pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-ghost btn-sm"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}></div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
