import FormCard from "../shared/FormCard";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { ProductSuggestion } from "./ProductSuggestionDTO";
import {Eye } from 'lucide-react';
import { productSugestionsService } from "../services/ProductSuggestionService";

const ProductSuggestions = () => {

    const [productsSuggestion, setProductsSuggestion] = useState<ProductSuggestion[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

     useEffect(() => {
        loadProducts();
    }, []);

     const loadProducts = async () => {
        try {
          const data = await productSugestionsService.list();
          setProductsSuggestion(data.data);
        } finally {
          setLoading(false);
        }
      };


    return ( 
        <div className="min-h-screen bg-gray-100 py-10">
      <FormCard title="Product Sugestions" className="w-full max-w-6xl" >
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-5">Product</th>
                <th className="text-left p-5">Unit Price</th>
                <th className="text-center p-5">Maximum Possible Quantity</th>
                <th className="text-center p-5">Total Value Produced</th>                
              </tr>
            </thead>
            <tbody>
              {productsSuggestion.map((product) => (
                <tr key={product.productId} className="border-b hover:bg-gray-200 transition-colors duration-200">
                  <td className="p-5">{product.productName}</td>                 
                  <td className="p-5">${product.productPrice}</td>
                  <td className="p-5 text-center">{product.maxQuantity}</td>
                  <td className="p-5 text-center">${product.totalValue}</td>
                  <td className="p-5 text-center space-x-4">
                    <button
                        className="text-blue-500 hover:text-blue-800 transition cursor-pointer"
                        title="View product"
                        onClick={() => navigate(`/products/${product.productId}/edit`)}
                    >
                        <Eye size={18} />
                    </button>                    
                   </td>                      
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </FormCard>     

    </div>
     );
}
 
export default ProductSuggestions;