import { NumericFormat } from 'react-number-format';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormCard from '../shared/FormCard';
import { productService } from '../services/ProductService';
import toast from 'react-hot-toast';

const ProductRegistration = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  
  useEffect(() => {
    if (isEditMode) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await productService.findById(Number(id));
      const product = response.data;

      setName(product.name);
      setCode(product.code);
      setPrice(product.price);
    } catch {
      toast.error('Product not found');
      navigate('/products');
    }
  };

  const submitForm = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      if (isEditMode) {
        await productService.update(Number(id), {
          name,
          code,
          price,
        });

        toast.success('Product updated successfully!');
      } else {
        await productService.create({
          name,
          code,
          price,
        });

        toast.success('Product created successfully!');
        setName('');
        setCode('');
        setPrice(null);
      }

      navigate('/products');
    } catch (error) {     
      toast.error('Error saving product');
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (name.length < 3) newErrors.name = 'Minimum 3 characters';

    if (!code.trim()) newErrors.code = 'Code is required';

    if (!price || price <= 0) newErrors.price = 'Price must be greater than zero';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <FormCard title={isEditMode ? 'Edit Product' : 'Product Registration'} className="max-w-2xl">
        <form className="space-y-5" onSubmit={submitForm} noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100 ${errors.name ? 'border-red-500' : 'border-gray-300'}`} 
              
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100 ${errors.code ? 'border-red-500' : 'border-gray-300'}`} 
              
            />
            {errors.code && (
              <p className="text-sm text-red-500 mt-1">{errors.code}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Price</label>
            <NumericFormat
              value={price ?? ''}
              prefix="$"
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              onValueChange={(values) =>
                setPrice(values.floatValue ?? null)
              }
              className={`w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100 ${errors.price ? 'border-red-500' : 'border-gray-300'}`} 
              
            />
            {errors.price && (
              <p className="text-sm text-red-500 mt-1">{errors.price}</p>
            )}
          </div>

          <button
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white mt-2 cursor-pointer
              ${loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-700'}
            `}
          >
            {loading
              ? 'Saving...'
              : isEditMode
              ? 'Update Product'
              : 'Save Product'}
          </button>
        </form>
      </FormCard>
    </div>
  );
};

export default ProductRegistration;
