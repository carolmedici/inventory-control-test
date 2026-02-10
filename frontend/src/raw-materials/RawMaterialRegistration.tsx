import { NumericFormat } from 'react-number-format';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormCard from '../shared/FormCard';
import toast from 'react-hot-toast';
import { rawMaterialService } from '../services/RawMaterialService';

const RawMaterialRegistration = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const rawMaterialId = id ? Number(id) : null;
    const isEditMode = rawMaterialId !== null && !Number.isNaN(rawMaterialId);


    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [stockQuantity, setStockQuantity] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!isEditMode || rawMaterialId === null) return;

        loadRawMaterial(rawMaterialId);
        }, [rawMaterialId]);


    const loadRawMaterial = async (rawMaterialId: number) => {
        try {
            const response = await rawMaterialService.findById(rawMaterialId);
            const rawMaterial = response.data;

            setName(rawMaterial.name);
            setCode(rawMaterial.code);
            setStockQuantity(rawMaterial.stockQuantity);
        } catch {
            toast.error('Raw material not found');
            navigate('/raw-materials');
        }
    };


    const submitForm = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);

        try {
        if (isEditMode) {
            await rawMaterialService.update(Number(id), {
            name,
            code,
            stockQuantity,
            });

            toast.success('Raw material updated successfully!');
        } else {
            await rawMaterialService.create({
            name,
            code,
            stockQuantity,
            });

            toast.success('Raw material created successfully!');
            setName('');
            setCode('');
            setStockQuantity(null);
        }

      navigate('/raw-materials');
    } catch (error) {     
      toast.error('Error saving raw material');
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Name is required';
    if (name.length < 3) newErrors.name = 'Minimum 3 characters';

    if (!code.trim()) newErrors.code = 'Code is required';

    if (!stockQuantity|| stockQuantity <= 0) newErrors.stockQuantity = 'Quantity must be greater than zero';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <FormCard title={isEditMode ? 'Edit Raw Material' : 'Raw Material Registration'} className="max-w-2xl">
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
            <label className="block text-sm font-medium text-gray-600">Quantity</label>
            <NumericFormat
              value={stockQuantity ?? ''}  
              onValueChange={(values) =>
                setStockQuantity(values.floatValue ?? null)
              }
              className={`w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100 ${errors.stockQuantity ? 'border-red-500' : 'border-gray-300'}`} 
              
            />
            {errors.stockQuantity && (
              <p className="text-sm text-red-500 mt-1">{errors.stockQuantity}</p>
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
              ? 'Update Raw Material'
              : 'Save'}
          </button>
        </form>
      </FormCard>
    </div>
  );
};

 
export default RawMaterialRegistration;