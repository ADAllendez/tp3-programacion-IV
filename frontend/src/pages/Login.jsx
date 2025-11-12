import { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.js";
import "../App.css";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(form);
    if (res.ok && res.token) {
      localStorage.setItem("token", res.token);
      navigate("/home");
    } else {
      setMsg(`❌ ${res.message || "Credenciales inválidas"}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p style={{margin: "10px"}}> 
        No tienes cuenta? {" "}
        <Link to="/register" style={{color: "blue", textDecoration: "none"}}>
            Regístrate aquí
        </Link>
      </p>
    </div>
  );
}