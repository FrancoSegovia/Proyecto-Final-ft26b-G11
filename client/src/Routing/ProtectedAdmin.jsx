import { Navigate, Outlet } from "react-router";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = jwtDecode(localStorage.getItem("token"));
  if (token?.type.toLowerCase() === "admin") {
    return [token, true];
  } else return [token, false];
};

export default function ProtectedAdmin(){
    const [token, auth] = useAuth();
     return auth ? (
      <Outlet />
    ) : token.type === "user" ? (
      <Navigate to={"/user/home"} />
    ) : token.type === "owner" ? (
      <Navigate to={"/owner/home"} />
    ) : (
      <Navigate to={"/delivery"} />
    );
}

