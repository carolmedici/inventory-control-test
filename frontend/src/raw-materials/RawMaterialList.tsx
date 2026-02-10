import { useEffect, useState } from 'react';
import FormCard from '../shared/FormCard';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import ConfirmModal from '../shared/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import type { RawMaterial } from './rawMaterial.types';
import { rawMaterialService } from '../services/RawMaterialService';

const RawMaterialList = () => {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRawMaterialId, setSelectedRawMaterialId] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadRawMaterials();
  }, []);

  const loadRawMaterials = async () => {
    try {
      const data = await rawMaterialService.list();
      setRawMaterials(data.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
        if (!selectedRawMaterialId) return;

        try {
            await rawMaterialService.delete(selectedRawMaterialId);
            loadRawMaterials();
        } finally {
            setShowConfirm(false);
            setSelectedRawMaterialId(null);
        }
    };


  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <FormCard
          title="Raw Materials"
          className="w-full max-w-6xl"
          rightAction={
            <button
              onClick={() => navigate("/raw-materials/new")}
              className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer" >
              <Plus size={18} />
              Add Raw Material
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
                <th className="text-left p-5">Quantity</th>
                <th className="text-center p-5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rawMaterials.map((rawMaterial) => (
                <tr key={rawMaterial.id} className="border-b hover:bg-gray-200 transition-colors duration-200">
                  <td className="p-5">{rawMaterial.name}</td>
                  <td className="p-5">{rawMaterial.code}</td>
                  <td className="p-5">{rawMaterial.stockQuantity}</td>
                  <td className="p-5 text-center space-x-4">
                    <button
                        className="text-blue-500 hover:text-blue-800 transition cursor-pointer"
                        title="Edit raw material"
                        onClick={() => navigate(`/raw-materials/${rawMaterial.id}/edit`)}
                    >
                        <Pencil size={18} />
                    </button>
                    <button
                        className="text-red-500 hover:text-red-800 transition cursor-pointer"
                        title="Delete raw material"
                        onClick={() => {
                            setSelectedRawMaterialId(rawMaterial.id);
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
        )}
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
};

export default RawMaterialList;
