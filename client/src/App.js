import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./roles/landing/views/LandingPage/LandingPage";

import Home from "./roles/user/views/Home/Home.jsx";

import CreateStore from "./roles/user/views/CreateStore/CreateStore.jsx";

import UserSignUp from "./roles/Auth/UserSignUp.jsx";
import UserSignIn from "./roles/Auth/UserSignIn.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { loadUser } from "./redux/actions/index";

import Payment from "./roles/user/views/Payment/Payment";

import Dashboard from "./roles/admin/views/Dashboard";

export default function App() {
  const dispatch = useDispatch();

  //!no usar hasta que esté lista la ruta del back
  // useEffect(()=> {
  //   dispatch(loadUser());
  // },[])

  return (
    <div>
      <Routes>
        <Route exact path="/create" element={<CreateStore />} />
        <Route exact path="/SignUp" element={<UserSignUp />} />
        <Route exact path="/SignIn" element={<UserSignIn />} />

        {/* General Views */}
        <Route exact path="/landing" element={<LandingPage />} />

        {/* User Views */}
        <Route exact path="/user/home" element={<Home />} />

        {/* Admin Views */}
        <Route exact path="/admin/dashboard" element={<Dashboard />} />

        <Route exact path="/pay" element={<Payment />} />
      </Routes>
    </div>
  );
}
