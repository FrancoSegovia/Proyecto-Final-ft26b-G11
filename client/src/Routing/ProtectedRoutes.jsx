import { Navigate, Outlet } from "react-router";

const useAuth = () => {
  if (localStorage.getItem("token") !== null) {
    return true;
  } else return false;
};

export default function ProtectedRoutes() {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to={"/"} />;
}
