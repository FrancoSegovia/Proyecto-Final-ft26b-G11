import { Navigate, Outlet } from "react-router";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = jwtDecode(localStorage.getItem("token"));
  if (token.type.toLowerCase() === "owner") {
    return [token, true];
  } else return [token, false];
};

export default function ProtectedOwner() {
  const [token, auth] = useAuth();
  return auth ? (
    <Outlet />
  ) : token.type === "user" ? (
    <Navigate to={"/user/home"} />
  ) : token.type === "admin" ? (
    <Navigate to={"/admin/shops"} />
  ) : (
    <Navigate to={"/delivery"} />
  );
}
