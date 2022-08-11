import { Routes, Route } from "react-router-dom";
import LandingPage from "./roles/landing/views/LandingPage/LandingPage";
import Home from "./roles/user/views/Home/Home.jsx";
import CreateStore from "./roles/user/views/CreateStore/CreateStore.jsx";
import Payment from "./roles/user/views/Payment/Payment"

function App() {
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

export default App;
