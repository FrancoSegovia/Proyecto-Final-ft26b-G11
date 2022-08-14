import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import LandingPage from "./roles/landing/views/LandingPage/LandingPage";
import Home from "./roles/user/views/Home/Home.jsx";
import Payment from "./roles/user/views/Payment/Payment";
import CreateStore from "./roles/user/views/CreateStore/CreateStore.jsx";
import UserSignUp from "./roles/Auth/UserSignUp.jsx";
import UserSignIn from "./roles/Auth/UserSignIn.jsx";
import { loadUser } from "./redux/actions/index";
import UserSignUp from "./roles/Auth/UserSignUp.jsx";
import UserSignIn from "./roles/Auth/UserSignIn.jsx";
import Shops from "./roles/admin/views/Shops";
import Users from "./roles/admin/views/Users";
import Owners from "./roles/admin/views/Owners";
import Clickers from "./roles/admin/views/Clickers";
import Orders from "./roles/admin/views/Orders";
import ClickerHome from "./roles/delivery/views/ClickerHome"


export default function App() {
  const dispatch = useDispatch();

  return (
    <div>
      <Routes>
        <Route exact path="/create" element={<CreateStore />} />
        <Route exact path="/owner/create" element={<CreateStore />} />
        <Route exact path="/SignUp" element={<UserSignUp />} />
        <Route exact path="/SignIn" element={<UserSignIn />} />

        {/* General Views */}
        <Route exact path="/landing" element={<LandingPage />} />

        {/* User Views */}
        <Route exact path="/user/home" element={<Home />} />

        {/* Admin Views */}
        <Route exact path="/admin/dashboard" element={<Dashboard />} />

                    {/* Admin Views */}
        <Route exact path="/admin/shops" element={<Shops />} /> 
        <Route exact path="/admin/users" element={<Users />} /> 
        <Route exact path="/admin/owners" element={<Owners />} /> 
        <Route exact path="/admin/clickers" element={<Clickers />} />
        <Route exact path="/admin/orders" element={<Orders />} />  

                    {/* Delivery Views */}
        <Route exact path="/delivery/home" element={<ClickerHome />} />  

        <Route exact path="/pay" element={<Payment />} />
      </Routes>
    </div>
  );
}

