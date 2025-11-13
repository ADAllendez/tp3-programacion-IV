import { useState } from "react";
import { registerUser } from "../api/auth";
import "../App.css";

export default function Register() {
    // usar 'contrasena' porque el backend espera ese nombre de campo
    const [form, setForm] = useState({ nombre: "", email: "", contrasena: "" });
    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!form.nombre || !form.nombre.trim()) errs.nombre = "El nombre es obligatorio";
    // Validación sencilla: comprobar que contiene '@' y '.'
    if (!form.email || !form.email.includes('@') || !form.email.includes('.')) errs.email = "El email no es válido";
        if (!form.contrasena || form.contrasena.length < 6) errs.contrasena = "La contraseña debe tener al menos 6 caracteres";
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

        const res = await registerUser(form);

        if (!res.ok) {
            setMsg(res.message || "Error al registrarse");
        } else {
            setMsg('Registro exitoso');
        }
    };


    return (
        <div className="form-container">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit} noValidate>
                <input
                    name="nombre"
                    placeholder="Nombre"
                    onChange={handleChange}
                    value={form.nombre}
                    aria-invalid={!!errors.nombre}
                />
                {errors.nombre && <small style={{ color: 'red' }}>{errors.nombre}</small>}

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={form.email}
                    aria-invalid={!!errors.email}
                />
                {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>}

                <input
                    name="contrasena"
                    type="password"
                    placeholder="Contraseña"
                    onChange={handleChange}
                    value={form.contrasena}
                    aria-invalid={!!errors.contrasena}
                />
                {errors.contrasena && <small style={{ color: 'red' }}>{errors.contrasena}</small>}

                <button type="submit">Registrarse</button>
            </form>
            <p>{msg}</p>
        </div>
    );
}
