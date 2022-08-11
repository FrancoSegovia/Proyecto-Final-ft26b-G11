import { Routes, Route } from "react-router-dom";

import LandingPage from "./roles/landing/views/LandingPage/LandingPage";

import Home from "./roles/user/views/Home/Home.jsx";

import CreateStore from "./roles/user/views/CreateStore/CreateStore.jsx";
import Payment from "./roles/user/views/Payment/Payment"

import Dashboard from "./roles/admin/views/Dashboard";


function App() {
  return (
    <div>
      <Routes>
                    {/* General Views */}
        <Route exact path="/landing" element={<LandingPage />} />

                    {/* User Views */}
        <Route exact path="/user/home" element={<Home />} />

        <Route exact path="/create" element={<CreateStore />} />


                    {/* Admin Views */}
        <Route exact path="/admin/dashboard" element={<Dashboard />} /> 
        
        
        <Route exact path="/pay" element={<Payment />} />

      </Routes>
    </div>
  );
}

export default App;
