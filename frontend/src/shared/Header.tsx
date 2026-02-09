import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-gray-600 text-white px-6 py-4 flex items-center justify-between">
      <h1 className="text-3xl font-bold">Inventory Control</h1>

      <nav className="flex gap-8 text-md">
        {/* PRODUCTS */}
        <div className="relative group">
          <button className="cursor-pointer hover:text-blue-400 py-2">
            Products
          </button>

          <div className="absolute left-0 top-full z-50 hidden group-hover:block bg-white text-gray-700 rounded-md shadow-lg min-w-[160px]">
            <Link
              to="/products"
              className="block px-4 py-2 hover:bg-gray-100 hover:rounded-md"
            >
              List
            </Link>

            <Link
              to="/products/new"
              className="block px-4 py-2 hover:bg-gray-100 hover:rounded-md"
            >
              Register
            </Link>
          </div>
        </div>

        {/* RAW MATERIALS */}
        <div className="relative group">
          <button className="cursor-pointer hover:text-blue-400 py-2">
            Raw Materials
          </button>

          <div className="absolute left-0 top-full z-50 hidden group-hover:block bg-white text-gray-700 rounded-md shadow-lg min-w-[160px]">
            <Link
              to="/raw-materials"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              List
            </Link>

            <Link
              to="/raw-materials/new"
              className="block px-4 py-2 hover:bg-gray-100"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
