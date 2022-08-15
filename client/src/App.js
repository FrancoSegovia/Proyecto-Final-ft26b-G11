import React from "react";
import { Routes, Route } from "react-router-dom";

import { loadUser } from "./redux/actions/index";
import ProtectedRoutes from "./Routing/ProtectedRoutes";
import ProtectedLanding from "./Routing/ProtectedLanding";
import ProtectedUser from "./Routing/ProtectedUser";
import ProtectedAdmin from "./Routing/ProtectedAdmin";
import ProtectedOwner from "./Routing/ProtectedOwner";
import ProtectedDelivery from "./Routing/ProtectedDelivery";

import LandingPage from "./roles/landing/views/LandingPage/LandingPage";
import UserSignUp from "./roles/Auth/UserSignUp.jsx";
import UserSignIn from "./roles/Auth/UserSignIn.jsx";

import Home from "./roles/user/views/Home/Home.jsx";
import Payment from "./roles/user/views/Payment/Payment";
import CreateStore from "./roles/user/views/CreateStore/CreateStore.jsx";

import Shops from "./roles/admin/views/Shops";
import Users from "./roles/admin/views/Users";
import Owners from "./roles/admin/views/Owners";
import Clickers from "./roles/admin/views/Clickers";
import Orders from "./roles/admin/views/Orders";

import ClickerHome from "./roles/delivery/views/ClickerHome";

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
            <Route exact path="/user/pay" element={<Payment />} />
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
            <Route exact path="/owner/create" element={<CreateStore />} />
          </Route>

          <Route element={<ProtectedDelivery />}>
            <Route exact path="/delivery" element={<ClickerHome />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
