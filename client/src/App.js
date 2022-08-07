import { Routes, Route } from "react-router-dom";
import CreateStore from "./roles/user/views/CreateStore/CreateStore.jsx";
import Home from './roles/user/views/Home.jsx';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/create" element={<CreateStore/>} />
      </Routes>
    </div>
  );
}

export default App;
