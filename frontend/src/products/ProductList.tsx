import { useEffect, useState } from 'react';
import { productService } from '../services/ProductService';
import type { Product } from './product.types';
import FormCard from '../shared/FormCard';
import { Pencil, Trash2, Plus } from 'lucide-react';
import ConfirmModal from '../shared/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { Layers } from "lucide-react";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();


  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productService.list();
      setProducts(data.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
        if (!selectedProductId) return;

        try {
            await productService.delete(selectedProductId);
            loadProducts();
        } finally {
            setShowConfirm(false);
            setSelectedProductId(null);
        }
    };


  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <FormCard
          title="Products"
          className="w-full max-w-6xl"
          rightAction={
            <button
              onClick={() => navigate("/products/new")}
              className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer" >
              <Plus size={18} />
              Add Product
            </button>
          }
        >
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-5">Name</th>
                <th className="text-left p-5">Code</th>
                <th className="text-left p-5">Price</th>
                <th className="text-center p-5">Actions</th>
                <th className='text-center p-5'>Composition</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-200 transition-colors duration-200">
                  <td className="p-5">{product.name}</td>
                  <td className="p-5">{product.code}</td>
                  <td className="p-5">${product.price}</td>
                  <td className="p-5 text-center space-x-4">
                    <button
                        className="text-blue-500 hover:text-blue-800 transition cursor-pointer"
                        title="Edit product"
                        onClick={() => navigate(`/products/${product.id}/edit`)}
                    >
                        <Pencil size={18} />
                    </button>
                    <button
                        className="text-red-500 hover:text-red-800 transition cursor-pointer"
                        title="Delete product"
                        onClick={() => {
                            setSelectedProductId(product.id);
                            setShowConfirm(true);
                        }}
                    >
                        <Trash2 size={18} />
                    </button>
                    </td>
                      <td className="text-center p-5">
                    <button
                      onClick={() => navigate(`/products/${product.id}/composition`)}
                      className="text-gray-600 hover:text-indigo-600 transition cursor-pointer"
                      title="View composition"
                    >
                      <Layers size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </FormCard>
      <ConfirmModal
        open={showConfirm}
        title="Delete product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onCancel={() => {
            setShowConfirm(false);
            setSelectedProductId(null);
        }}
        onConfirm={handleDelete}
        />

    </div>
  );
};

export default ProductList;
