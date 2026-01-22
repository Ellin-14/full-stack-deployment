import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import NotificationBell from "../components/notifications/NotificationBell";

const Navbar = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const handler = () => {
      setRefreshKey(Date.now());
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center w-full max-w-md bg-gray-100 rounded-lg px-3 py-2">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search policies, claims, recommendations..."
          className="bg-transparent outline-none ml-2 w-full text-sm"
        />
      </div>

      <div className="flex items-center gap-6">
        {/* 🔔 PASS REFRESH KEY */}
        <NotificationBell refreshKey={refreshKey} />

        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
            alt="User"
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-700">User Name</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
