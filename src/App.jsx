import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PatientDashboard from "./pages/PatitentView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />
        {/* <Route path="/caretaker" element={<CaretakerDashboard />} /> */} 
      </Routes>
    </BrowserRouter>
  );
}
