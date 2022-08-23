import React from "react";
import { Routes, Route } from "react-router-dom";
//////////////////////////////////////////////////////////////////////////
import ProtectedRoutes from "./routing/ProtectedRoutes";
import ProtectedLanding from "./routing/ProtectedLanding";
import ProtectedUser from "./routing/ProtectedUser";
import ProtectedPayment from "./routing/ProtectedPayment";
import ProtectedAdmin from "./routing/ProtectedAdmin";
import ProtectedOwner from "./routing/ProtectedOwner";
import ProtectedDelivery from "./routing/ProtectedDelivery";
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
import LandingPage from "./roles/landing/views/LandingPage/LandingPage";
import UserSignUp from "./roles/Auth/UserSignUp.jsx";
import UserSignIn from "./roles/Auth/UserSignIn.jsx";
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
import Home from "./roles/user/views/Home/Home.jsx";
import Payment from "./roles/user/views/Payment/Payment";
import CreateStore from "./roles/user/views/CreateStore/CreateStore.jsx";
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
import Shops from "./roles/admin/views/Shops";
import Users from "./roles/admin/views/Users";
import Owners from "./roles/admin/views/Owners";
import Clickers from "./roles/admin/views/Clickers";
import Orders from "./roles/admin/views/Orders";
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
import ClickerHome from "./roles/delivery/views/ClickerHome";
import Profile from "./roles/user/views/Profile/Profile";
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
import OwnerHome from "./roles/owner/views/OwnerHome";
import OwnerSettings from "./roles/owner/views/OwnerSettings";

export default function App() {
  return (
    <div>
      <Routes>
        <Route element={<ProtectedLanding />}>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/SignUp" element={<UserSignUp />} />
          <Route exact path="/SignIn" element={<UserSignIn />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<ProtectedUser />}>
            <Route exact path="/user/home" element={<Home />} />
            <Route exact path="/user/profile" element={<Profile />} />
            <Route element={<ProtectedPayment />}>
              <Route exact path="/user/pay" element={<Payment />} />
            </Route>
          </Route>

          <Route element={<ProtectedAdmin />}>
            <Route exact path="/admin/shops" element={<Shops />} />
            <Route exact path="/admin/users" element={<Users />} />
            <Route exact path="/admin/owners" element={<Owners />} />
            <Route exact path="/admin/clickers" element={<Clickers />} />
            <Route exact path="/admin/orders" element={<Orders />} />
          </Route>

          <Route element={<ProtectedOwner />}>
            <Route exact path="/owner/create" element={<CreateStore />} />
            <Route exact path="/owner/home" element={<OwnerHome />} />
            <Route exact path="/owner/settings" element={<OwnerSettings />} />
          </Route>

          <Route element={<ProtectedDelivery />}>
            <Route exact path="/delivery" element={<ClickerHome />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
