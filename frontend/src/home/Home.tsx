import { Package, FlaskConical, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-5xl mx-auto">     
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome 
        </h2>
        <p className="text-gray-600 mb-10">
          Take control of your inventory with clarity and speed.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Products */}
          <button
            onClick={() => navigate("/products")}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-8 text-left group cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-4">
              <Package
                size={36}
                className="text-indigo-600 group-hover:scale-110 transition"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Products
              </h3>
            </div>
            <p className="text-gray-600">
              Manage finished products and their compositions.
            </p>
          </button>

          {/* Raw Materials */}
          <button
            onClick={() => navigate("/raw-materials")}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-8 text-left group cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-4">
              <FlaskConical
                size={36}
                className="text-emerald-600 group-hover:scale-110 transition"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Raw Materials
              </h3>
            </div>
            <p className="text-gray-600">
              Control stock and register raw materials.
            </p>
          </button>

          {/* Suggested Products */}
          <button
            onClick={() => navigate("/product-suggestions")}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-8 text-left group cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-4">
              <Lightbulb
                size={36}
                className="text-amber-500 group-hover:scale-110 transition"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Suggested Products
              </h3>
            </div>
            <p className="text-gray-600">
              View suggested products based on composition.
            </p>
          </button>

        </div>
      </div>
    </div>
  );
};

export default Home;
