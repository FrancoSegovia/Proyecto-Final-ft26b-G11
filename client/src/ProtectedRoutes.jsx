import { Navigate, Outlet } from "react-router";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  if (jwtDecode(localStorage.getItem("token")) !== undefined) {
    console.log(jwtDecode(localStorage.getItem("token")));
    return true;
  } else return false;
};

export default function ProtectedRoutes() {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to={"/"} />;
}
