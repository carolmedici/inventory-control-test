import { NumericFormat } from 'react-number-format';
import { useState } from 'react';

const ProductRegistration = () => {
  const [value, setValue] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          Product Registration
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Code
            </label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Price
            </label>
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

          <button className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-700 cursor-pointer mt-2">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductRegistration;

