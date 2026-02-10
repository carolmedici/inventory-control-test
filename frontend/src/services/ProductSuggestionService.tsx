import { api } from "./ApiService";

export const productSugestionsService = {
      list() {
        return api.get('/product-suggestions');
      },
}