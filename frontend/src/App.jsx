import { Routes, Route, Navigate } from "react-router-dom";
import TopNav from "./components/TopNav";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./Home";
import VehiculosPage from "./pages/Vehiculos/VehiculosPage";
import ConductoresPage from "./pages/Conductores/ConductorPage";
import ViajesPage from "./pages/Viajes/ViajePage";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="app-container pt-24 pb-8">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="/vehiculos" element={<ProtectedRoute><VehiculosPage/></ProtectedRoute>} />
          <Route path="/conductores" element={<ProtectedRoute><ConductoresPage/></ProtectedRoute>} />
          <Route path="/viajes" element={<ProtectedRoute><ViajesPage/></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}
