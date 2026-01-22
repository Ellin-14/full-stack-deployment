import { Bell, UserCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
      <div className="p-2">
        <h1 className="text-2xl font-semibold mb-0">
          Policy Catalog
        </h1>
      </div>

      
      <div className="flex items-center gap-6">
        <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
        <UserCircle className="w-7 h-7 text-gray-600 cursor-pointer" />
      </div>
    </header>
  );
};

export default Header;
