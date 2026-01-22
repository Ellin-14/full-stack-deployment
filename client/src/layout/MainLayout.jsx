import Sidebar from "../layout/Sidebar";
import Header from "../components/Header";

const MainLayout = ({ children }) => {
  return (
    <div className="flex">
      
      
      <Sidebar />

      
      <div className="flex-1 bg-gray-50 min-h-screen">
        <Header />
        <main className="p-8">{children}</main>
      </div>

    </div>
  );
};

export default MainLayout;
