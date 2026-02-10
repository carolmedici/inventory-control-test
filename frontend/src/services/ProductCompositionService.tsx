import { api } from './ApiService';

export const productCompositionService = {
  listByProduct(productId: number) {
    return api.get(`/product-composition/product/${productId}`);
  },

  create(payload: {
    productId: number;
    rawMaterialId: number;
    requiredQuantity: number;
  }) {
    return api.post('/product-composition', payload);
  },

  delete(id: number) {
    return api.delete(`/product-composition/${id}`);
  },

   list() {
    return api.get('/raw-materials');
  },
};
