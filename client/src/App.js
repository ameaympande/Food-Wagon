import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
