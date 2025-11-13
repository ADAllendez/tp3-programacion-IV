import { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.js";
import "../App.css";

export default function Login() {
  // el backend espera el campo 'contrasena'
  const [form, setForm] = useState({
    email: "",
    contrasena: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    // Validación sencilla sin regex: comprobar que el email contiene '@' y '.'
    if (!form.email || !form.email.includes('@') || !form.email.includes('.')) errs.email = "Email no válido";
    if (!form.contrasena || !form.contrasena.trim()) errs.contrasena = "La contraseña es obligatoria";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

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
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          aria-invalid={!!errors.email}
        />
        {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}

        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          onChange={handleChange}
          value={form.contrasena}
          aria-invalid={!!errors.contrasena}
        />
        {errors.contrasena && <small style={{ color: 'red' }}>{errors.contrasena}</small>}

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