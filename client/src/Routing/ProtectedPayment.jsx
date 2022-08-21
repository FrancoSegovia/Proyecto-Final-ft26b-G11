import { Navigate, Outlet } from "react-router";

const useAuth = () => {
  if (
    localStorage.getItem("cart") === null ||
    !JSON.parse(localStorage.getItem("cart")).length
  ) {
    return false;
  } else return true;
};

export default function ProtectedPayment() {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to={"/user/home"} />;
}
