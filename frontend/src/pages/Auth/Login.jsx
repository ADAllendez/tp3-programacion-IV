import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../api/auth';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', contrasena: '' });
  const [msg, setMsg] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    setErrors({});
    const res = await loginUser(form);
    if (res.ok && res.token) {
      localStorage.setItem('token', res.token);
      navigate('/home');
    } else {
      setMsg(res.message || 'Credenciales inválidas');
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
        <h2 className="text-2xl mb-4">Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <input name="email" type="email" required placeholder="Email" value={form.email} onChange={handleChange}
                   className="border p-2 rounded" />
            {errors.email && <p className="mt-1 text-red-600">{errors.email}</p>}
          </div>

          <div>
            <input name="contrasena" type="password" required placeholder="Contraseña" value={form.contrasena} onChange={handleChange}
                   className="border p-2 rounded" />
            {errors.contrasena && <p className="mt-1 text-red-600">{errors.contrasena}</p>}
          </div>

          <button type="submit" className="bg-blue-600 text-white py-2 rounded">Ingresar</button>
        </form>
        <p className="mt-3 text-sm">¿No tienes cuenta? <Link to="/register" className="text-blue-600">Regístrate</Link></p>
        {msg && <p className="mt-2 text-red-600">{msg}</p>}
      </div>
    </div>
  );
}
