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
    <Navigate to={"/admin/users"} />
  ) : token.type === "owner" ? (
    <Navigate to={"/owner/home"} />
  ) : (
    <Navigate to={"/delivery"} />
  );
}
