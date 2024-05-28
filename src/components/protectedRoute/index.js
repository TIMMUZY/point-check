
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from 'react'
import UserContext from "../context/UserContext";
function ProtectedRoute ({ redirectPath = "/checkAuth"}) {
  const { user } = useContext(UserContext)
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />
};

export default ProtectedRoute