import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre:'', email:'', contrasena:'' });
  const [msg, setMsg] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    setErrors({});
    const res = await registerUser(form);
    if (res.ok) navigate('/');
    else {
      setMsg(res.message || 'Error al registrar');
      if (res.errors && Array.isArray(res.errors)) {
        const map = {};
        res.errors.forEach(err => { const key = err.param || err.path; map[key] = err.msg; });
        setErrors(map);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl mb-4">Registro</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <input name="nombre" required placeholder="Nombre" value={form.nombre} onChange={handleChange} className="border p-2 rounded" />
            {errors.nombre && <p className="mt-1 text-red-600">{errors.nombre}</p>}
          </div>

          <div>
            <input name="email" type="email" required placeholder="Email" value={form.email} onChange={handleChange} className="border p-2 rounded" />
            {errors.email && <p className="mt-1 text-red-600">{errors.email}</p>}
          </div>

          <div>
            <input name="contrasena" type="password" required placeholder="Contraseña" value={form.contrasena} onChange={handleChange} className="border p-2 rounded" />
            {errors.contrasena && <p className="mt-1 text-red-600">{errors.contrasena}</p>}
          </div>

          <button type="submit" className="bg-green-600 text-white py-2 rounded">Registrar</button>
        </form>
        {msg && <p className="mt-2 text-red-600">{msg}</p>}
      </div>
    </div>
  );
}
