import {
  FaHome,
  FaFileAlt,
  FaBalanceScale,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  FileText,
  Lightbulb,
  GitCompare,
  LogOut,
  Settings,
  Calculator,
} from "lucide-react";

export function SidebarMenu() {
  const navigate = useNavigate();

  const underDevelopment = () => {
    alert("🚧 This feature is under development");
  };

  return (
    <nav className="bg-blue-500 text-white w-64 min-h-screen p-7 font-bold text-lg">
      <div className="text-2xl mb-8 leading-snug">Insurance CRC Assistant</div>

      <div
        className="flex items-center gap-3 cursor-pointer mb-6 text-base"
        onClick={() => navigate("/")}
      >
        <FaHome className="text-xl" /> Home
      </div>

      <div
        className="flex items-center gap-3 cursor-pointer mb-6 text-base"
        onClick={() => navigate("/")}
      >
        <FaFileAlt className="text-xl" /> Policies
      </div>

      <div
        className="flex items-center gap-3 cursor-pointer mb-6 text-base"
        onClick={() => navigate("/premium-calculator")}
      >
        <Calculator size={18} /> Premium Calculator
      </div>

      <div
        className="flex items-center gap-3 cursor-pointer mb-6 text-base"
        onClick={() => navigate("/#")}
      >
        <FaBalanceScale className="text-xl" /> Compare
      </div>
      <div
        className="flex items-center gap-3 cursor-pointer mb-6 text-base"
        onClick={underDevelopment}
      >
        <FaStar className="text-xl" /> Saved
      </div>
      <div
        className="flex items-center gap-3 cursor-pointer mb-6 text-base"
        onClick={underDevelopment}
      >
        <FaUser className="text-xl" /> Profile
      </div>
    </nav>
  );
}

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    { name: "Home", path: "/", icon: <Home size={18} /> }, // ✅ fixed
    { name: "My Claims", path: "/claims", icon: <FileText size={18} /> },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },

    {
      name: "Recommendations",
      path: "/recommendations",
      icon: <Lightbulb size={18} />,
    },

    {
      name: "Plans",
      path: "/#",
      icon: <GitCompare size={18} />,
    },
    {
      name: "Premium Calculator",
      path: "/premium-calculator",
      icon: <Calculator size={18} />,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-blue-500 text-white flex flex-col">
      <div className="h-16 flex items-center px-6 font-bold text-lg border-b border-blue-400">
        <span className="bg-white text-blue-500 px-2 py-1 rounded mr-2">
          Insurance CRC
        </span>
      </div>


      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition
               ${isActive ? "bg-blue-700" : "hover:bg-blue-600 text-blue-100"}`
            }
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-blue-400 space-y-2">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          <Settings size={18} />
          <span className="text-sm">Settings</span>
        </NavLink>

        <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-600">
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
