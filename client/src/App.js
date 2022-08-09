import { Routes, Route } from "react-router-dom";
import LandingPage from "./roles/landing/views/LandingPage/LandingPage";
import CreateStore from "./roles/user/views/CreateStore/CreateStore.jsx";
import Home from "./roles/user/views/Home.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/create" element={<CreateStore />} />
      </Routes>
    </div>
  );
}

export default App;
