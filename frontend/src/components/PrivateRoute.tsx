import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "./Sidebar";

const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // @TODO - Add a loading spinner
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? (
    <>
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default PrivateRoute;
