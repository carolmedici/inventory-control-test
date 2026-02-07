import { NumericFormat } from 'react-number-format';
import { useState } from 'react';
import FormCard from '../shared/FormCard';

const ProductRegistration = () => {
  const [value, setValue] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
       <FormCard title="Product Registration">

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600"> Name </label>
            <input type="text" className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600"> Code </label>
            <input type="text" className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600"> Price </label>
            <NumericFormat
              value={value}
              prefix="$"
              thousandSeparator="."
              decimalSeparator=","
              decimalScale={2}
              fixedDecimalScale
              onValueChange={(values) =>
                setValue(values.floatValue ?? null)
              }
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <button className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-700 cursor-pointer mt-2"> Save  </button>
        </form>
      </FormCard>
    </div>
  );
};

export default ProductRegistration;

