import api from './api.js';

const INITIAL_MOCK_PRODUCTS = [
  {
    _id: 'prod-1',
    name: 'Teclado Mecánico RGB NovaStrike Pro',
    category: 'periféricos',
    price: 68500,
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    description: 'Switches mecánicos táctiles de alta precisión con retroiluminación RGB configurable tecla por tecla y reposamuñecas ergonómico desmontable.',
    active: true,
  },
  {
    _id: 'prod-2',
    name: 'Mouse Inalámbrico Ultra-Light NovaGrip',
    category: 'periféricos',
    price: 42900,
    stock: 22,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80',
    description: 'Sensor óptico de 26.000 DPI, solo 58 gramos de peso y conectividad dual 2.4GHz y Bluetooth con hasta 70 horas de batería.',
    active: true,
  },
  {
    _id: 'prod-3',
    name: 'Auriculares Wireless NovaAcoustic 7.1',
    category: 'accesorios',
    price: 89000,
    stock: 8,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    description: 'Audio espacial inmersivo 7.1, almohadillas con memory foam respirable, micrófono desmontable con cancelación activa de ruido.',
    active: true,
  },
  {
    _id: 'prod-4',
    name: 'Pad Mouse Gamer XL 900x400 NovaSurface',
    category: 'accesorios',
    price: 18500,
    stock: 35,
    imageUrl: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=600&q=80',
    description: 'Superficie textil micro-tejida para deslizamiento suave y base de caucho antideslizante con bordes cosidos anti-desgaste.',
    active: true,
  },
  {
    _id: 'prod-5',
    name: 'Smart Stream Deck 15 Teclas LCD NovaDeck',
    category: 'gadgets',
    price: 125000,
    stock: 4,
    imageUrl: 'https://images.unsplash.com/photo-1629429408209-1f912961dbd8?auto=format&fit=crop&w=600&q=80',
    description: 'Consola de control para streamers y creadores de contenido con 15 botones táctiles LCD personalizables con macros.',
    active: true,
  },
  {
    _id: 'prod-6',
    name: 'Hub USB-C 8 en 1 NovaConnect Pro',
    category: 'gadgets',
    price: 34900,
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=600&q=80',
    description: 'Cuerpo de aluminio con puertos HDMI 4K@60Hz, 3x USB 3.0, lector SD/MicroSD y Power Delivery de 100W.',
    active: true,
  },
];

function getLocalMockProducts() {
  const stored = localStorage.getItem('novamarket_mock_products');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {}
  }
  localStorage.setItem('novamarket_mock_products', JSON.stringify(INITIAL_MOCK_PRODUCTS));
  return INITIAL_MOCK_PRODUCTS;
}

function saveLocalMockProducts(products) {
  localStorage.setItem('novamarket_mock_products', JSON.stringify(products));
}

function mockProductsForCategory(category) {
  let products = getLocalMockProducts().filter((p) => p.active !== false);
  if (category && category !== 'todos') {
    products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }
  return products;
}

export const productService = {
  async getProducts(category) {
    try {
      const url = category && category !== 'todos' ? `/products?category=${encodeURIComponent(category)}` : '/products';
      const response = await api.get(url);
      if (!Array.isArray(response.data)) {
        console.warn('⚠️ El API no devolvió una lista de productos; usando catálogo local mock');
        return mockProductsForCategory(category);
      }
      return response.data;
    } catch (err) {
      console.warn('⚠️ Usando catálogo local mock para productos');
      return mockProductsForCategory(category);
    }
  },

  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`);
      if (response.data && typeof response.data === 'object' && response.data._id) {
        return response.data;
      }
      console.warn('⚠️ El API no devolvió un producto válido; usando catálogo local mock');
    } catch (err) {
      // cae al fallback local de abajo
    }
    const products = getLocalMockProducts();
    const found = products.find((p) => p._id === id);
    if (found) return found;
    throw new Error('Producto no encontrado');
  },

  async createProduct(productData) {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (err) {
      const products = getLocalMockProducts();
      const newProduct = {
        _id: 'prod-' + Date.now(),
        ...productData,
        active: true,
      };
      products.unshift(newProduct);
      saveLocalMockProducts(products);
      return newProduct;
    }
  },

  async updateProduct(id, productData) {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (err) {
      const products = getLocalMockProducts();
      const index = products.findIndex((p) => p._id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...productData };
        saveLocalMockProducts(products);
        return products[index];
      }
      throw new Error('Producto no encontrado');
    }
  },

  async deleteProduct(id) {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (err) {
      // Soft delete local
      const products = getLocalMockProducts();
      const index = products.findIndex((p) => p._id === id);
      if (index !== -1) {
        products[index].active = false;
        saveLocalMockProducts(products);
        return { message: 'Producto desactivado con éxito' };
      }
      throw new Error('Producto no encontrado');
    }
  },
};

export default productService;
