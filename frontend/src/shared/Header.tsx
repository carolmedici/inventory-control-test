import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-gray-600 text-white px-6 py-4 flex items-center justify-between">
      <h1 className="text-3xl font-bold">Inventory Control</h1>

      <nav className="flex gap-8 text-md">
        {/* HOME */}
        <div className="relative group">
          <button className="cursor-pointer hover:text-blue-400 py-2">
            <Link to="/">
              Home
           </Link>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
