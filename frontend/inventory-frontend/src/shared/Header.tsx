const Header = () => {
    return ( 
    <>
        <header className="w-full bg-gray-600 text-white px-6 py-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Inventory Control</h1>

            <nav className="flex gap-8 text-md">
                <div className="relative group">
                <span className="cursor-pointer hover:text-blue-400">
                    Products
                </span>

                <div className="absolute hidden group-hover:block bg-white text-gray-700 mt-2 rounded-md shadow-lg min-w-[150px]">
                    <a className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    List
                    </a>
                    <a className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Register
                    </a>
                </div>
                </div>

                <div className="relative group">
                <span className="cursor-pointer hover:text-blue-400">
                    Raw Materials
                </span>

                <div className="absolute hidden group-hover:block bg-white text-gray-700 mt-2 rounded-md shadow-lg min-w-[150px]">
                    <a className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    List
                    </a>
                    <a className="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Register
                    </a>
                </div>
                </div>
            </nav>
        </header>
    </> 
    );
}
 
export default Header;