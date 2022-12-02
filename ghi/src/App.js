import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import AccountForm from "./Components/AccountForm";
import Register from "./Components/Register";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AccountForm" element={<AccountForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;