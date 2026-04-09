import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import UserDashboard from "./UserDashboard";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth)
  if(!user) {
    return <Navigate to="/login" replace />
  }
  
  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <div>Admin Dashboard</div>;

      case 'user':
        return <UserDashboard />;  
    
      default:
        return <Navigate to="/login" replace />;
    }
  }
  return (
    <div className="flex h-screen bg-gray-50">
      {/* side bar */}
      <header className="flex flex-col w-60 min-h-screen bg-white border-r border-gray-100 px-4 py-6">
        { renderDashboard() }
      </header>

      {/* main section */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;