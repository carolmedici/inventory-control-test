import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productCompositionService } from "../services/ProductCompositionService";
import { rawMaterialService } from "../services/RawMaterialService";
import FormCard from "../shared/FormCard";
import { Trash2 } from 'lucide-react';
import ConfirmModal from '../shared/ConfirmModal';

const ProductComposition = () => {

    const { productId } = useParams<{ productId: string }>();

    const [compositions, setCompositions] = useState<any[]>([]);
    const [rawMaterials, setRawMaterials] = useState<any[]>([]);
    const [rawMaterialId, setRawMaterialId] = useState<number | null>(null);
    const [requiredQuantity, setRequiredQuantity] = useState<number | null>(null);

    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedRawMaterialId, setSelectedRawMaterialId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCompositions();
        loadRawMaterials();
        }, []);

        const loadCompositions = async () => {
        const res = await productCompositionService.listByProduct(Number(productId));
        setCompositions(res.data);
        };

        const loadRawMaterials = async () => {
            try {
                const res = await rawMaterialService.list();
                setRawMaterials(res.data);
            } finally {
                setLoading(false);
            }
        };

        const handleAdd = async () => {
            if (!rawMaterialId || !requiredQuantity) return;

            await productCompositionService.create({
                productId: Number(productId),
                rawMaterialId,
                requiredQuantity,
            });

            setRawMaterialId(null);
            setRequiredQuantity(null);
            loadCompositions();
        };  
    
        const handleDelete = async () => {
            if (!selectedRawMaterialId) return;
        
            try {
                await productCompositionService.delete(selectedRawMaterialId);
                loadRawMaterials();
            } finally {
                setShowConfirm(false);
                setSelectedRawMaterialId(null);
            }
        };     
        
        const isFormValid = 
            rawMaterialId !== null && requiredQuantity != null && requiredQuantity > 0;

    return ( 
        <div className="min-h-screen bg-gray-100 py-10">
        <FormCard title="Product Composition" className="w-full max-w-6xl">
  
            <div className="flex gap-3 mb-5">
                <select
                className="border p-2 rounded"
                value={rawMaterialId ?? ''}
                onChange={(e) => setRawMaterialId(Number(e.target.value))}
                >
                <option value="">Raw Material</option>
                {rawMaterials.map(rm => (
                    <option key={rm.id} value={rm.id}>
                    {rm.name}
                    </option>
                ))}
                </select>

                <input
                type="number"
                placeholder="Quantity"
                value={requiredQuantity ?? ''}
                onChange={(e) => setRequiredQuantity(Number(e.target.value))}
                className="border p-2 rounded w-32"
                />

                <button disabled={!isFormValid || loading} onClick={handleAdd} className={`text-white px-4 py-2 rounded ${!isFormValid || loading ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-800 cursor-pointer'} `}>
                    Add
                </button>
            </div>

            <table className="w-full border-collapse ">
                <thead>
                <tr  className="border-b">
                    <th  className="text-left p-5">Raw Material</th>
                    <th  className="text-left p-5">Required Qty</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {compositions.map(c => (
                    <tr key={c.id} className="border-b hover:bg-gray-200 transition-colors duration-200">
                    <td className="p-5">{c.rawMaterial.name}</td>
                    <td className="p-5">{c.requiredQuantity}</td>
                    <td>
                        <button
                        className="text-red-500 hover:text-red-800 transition cursor-pointer"
                        title="Delete product"
                        onClick={() => {
                            setSelectedRawMaterialId(c.id);
                            setShowConfirm(true);
                        }}
                    >
                        <Trash2 size={18} />
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </FormCard>
            <ConfirmModal
                open={showConfirm}
                title="Delete raw material"
                message="Are you sure you want to delete this raw material? This action cannot be undone."
                onCancel={() => {
                    setShowConfirm(false);
                    setSelectedRawMaterialId(null);
                }}
                onConfirm={handleDelete}
            />
        </div>
    );
}
 
export default ProductComposition;