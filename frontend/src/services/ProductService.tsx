import { api } from './ApiService';
import type { ProductDTO } from '../products/ProductDTO';

export const productService = {
  create(payload: ProductDTO) {
    return api.post('/products', payload);
  },

  list() {
    return api.get('/products');
  },

  delete(id: number) {
    return api.delete(`/products/${id}`);
  },

  update(id: number, payload: ProductDTO) {
    return api.put(`/products/${id}`, payload);
  },

  findById: (id: number) =>
    api.get(`/products/${id}`),
};
