import { Link, useNavigate } from 'react-router-dom';

export default function TopNav() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow z-40">
      <div className="app-container flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-block bg-gradient-to-r from-indigo-500 to-pink-500 p-2 rounded text-white text-lg">🚚</span>
            <h1 className="text-xl font-semibold">Transporte App</h1>
          </div>

          {token && (
            <nav className="ml-6 flex gap-4">
              <Link to="/home" className="text-sm px-3 py-2 rounded hover:bg-gray-100">Home</Link>
              <Link to="/vehiculos" className="text-sm px-3 py-2 rounded hover:bg-gray-100">Vehículos</Link>
              <Link to="/conductores" className="text-sm px-3 py-2 rounded hover:bg-gray-100">Conductores</Link>
              <Link to="/viajes" className="text-sm px-3 py-2 rounded hover:bg-gray-100">Viajes</Link>
            </nav>
          )}
        </div>

        <div>
          {!token ? (
            <div className="flex gap-2 items-center">
              <Link to="/" className="text-sm px-3 py-2 rounded border">Login</Link>
              <Link to="/register" className="text-sm px-3 py-2 bg-blue-600 text-white rounded">Registro</Link>
            </div>
          ) : (
            <button onClick={logout} className="text-sm px-3 py-2 rounded border">Cerrar sesión</button>
          )}
        </div>
      </div>
    </header>
  );
}
