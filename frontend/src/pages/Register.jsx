import { useState } from "react";
import { registerUser } from "../api/auth";
import "../App.css";

export default function Register() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser(form);
    if (res.ok) {
      setMsg("✅ Registro exitoso. Ya puedes iniciar sesión.");
    } else {
      setMsg(`❌ Error: ${res.message || "No se pudo registrar"}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
