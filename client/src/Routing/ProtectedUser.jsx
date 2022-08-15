import { Navigate, Outlet } from "react-router";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = jwtDecode(localStorage.getItem("token"));
  if (token.type.toLowerCase() === "user") {
    return [token, true];
  } else return [token, false];
};

export default function ProtectedUser() {
  const [token, auth] = useAuth();
  return auth ? (
    <Outlet />
  ) : token.type === "admin" ? (
    <Navigate to={"/admin/shops"} />
  ) : token.type === "owner" ? (
    <Navigate to={"/owner/create"} />
  ) : (
    <Navigate to={"/delivery"} />
  );
}
