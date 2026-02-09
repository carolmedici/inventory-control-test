import { api } from './ApiService';
import type { RawMaterialDTO } from '../raw-materials/RawMaterialDTO';

export const rawMaterialService = {
  create(payload: RawMaterialDTO) {
    return api.post('/raw-materials', payload);
  },

  list() {
    return api.get('/raw-materials');
  },

  delete(id: number) {
    return api.delete(`/raw-materials/${id}`);
  },

  update(id: number, payload: RawMaterialDTO) {
    return api.put(`/raw-materials/${id}`, payload);
  },

  findById: (id: number) =>
    api.get(`/raw-materials/${id}`),
};
