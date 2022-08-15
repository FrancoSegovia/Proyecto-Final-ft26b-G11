import { Navigate, Outlet } from "react-router";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (token === undefined || token === null) {
    return [token, true];
  } else return [jwtDecode(token), false];
};

export default function ProtectedLanding() {
  const [token, auth] = useAuth();
  return auth ? (
    <Outlet />
  ) : token.type === "user" ? (
    <Navigate to={"/user/home"} />
  ) : token.type === "admin" ? (
    <Navigate to={"/admin/shops"} />
  ) : token.type === "owner" ? (
    <Navigate to={"/owner/create"} />
  ) : (
    <Navigate to={"/delivery"} />
  );
}
