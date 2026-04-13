import "./css/App.css";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <Routes>
      <Route path="/Chyess" element={<HomePage />} />
      <Route path="/Chyess/login" element={<Login />} />
      <Route path="/Chyess/register" element={<Register />} />
    </Routes>
  );
};

export default App;
