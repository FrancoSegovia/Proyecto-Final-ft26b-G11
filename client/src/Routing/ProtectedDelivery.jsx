import { Navigate, Outlet } from "react-router";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = jwtDecode(localStorage.getItem("token"));
  if (token.type.toLowerCase() === "delivery") {
    return [token, true];
  } else return [token, false];
};

export default function ProtectedDelivery() {
  const [token, auth] = useAuth();
  return auth ? (
    <Outlet />
  ) : token.type === "user" ? (
    <Navigate to={"/user/home"} />
  ) : token.type === "admin" ? (
    <Navigate to={"/admin/shops"} />
  ) : (
    <Navigate to={"/owner/home"} />
  );
}
