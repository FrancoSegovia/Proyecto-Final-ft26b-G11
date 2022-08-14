import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

import LandingPage from "./roles/landing/views/LandingPage/LandingPage";
import Home from "./roles/user/views/Home/Home.jsx";
import CreateStore from "./roles/user/views/CreateStore/CreateStore.jsx";
import Payment from "./roles/user/views/Payment/Payment";

export default function App() {
  //Utilizar un useEffect para traer los datos del tipo de usuario
  //Mediante un condicional redirigirlo al Routes que le corresponda
  //Dejar la landing y el LogIn/Register para cuando no tenga userStatus

  if (true) {
    return (
      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/create" element={<CreateStore />} />
          <Route exact path="/pay" element={<Payment />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/create" element={<CreateStore />} />
          <Route exact path="/pay" element={<Payment />} />
        </Routes>
      </div>
    );
  }
}