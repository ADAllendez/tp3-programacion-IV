import { useEffect, useState } from 'react';
import { getConductores, createConductor, deleteConductor } from '../../api/conductores';

export default function ConductoresPage() {
  const [conductores, setConductores] = useState([]);
  const [form, setForm] = useState({ nombre:'', apellido:'', dni:'', licencia:'', vencimiento_licencia:'' });

  const load = async () => {
    const res = await getConductores();
    setConductores(res.data || []);
  };

  useEffect(()=>{ load(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await createConductor(form);
    setForm({ nombre:'', apellido:'', dni:'', licencia:'', vencimiento_licencia:'' });
    load();
  };

  const handleDelete = async id => {
    if(!confirm('Confirmar eliminación')) return;
    await deleteConductor(id);
    load();
  };

  return (
    <div className="app-container pt-24 pb-8">
      <h2 className="text-2xl mb-4">Conductores</h2>

      <div className="p-6 bg-white rounded shadow mb-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="border p-2 rounded" required />
          <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} className="border p-2 rounded" required />
          <input name="dni" placeholder="DNI" value={form.dni} onChange={handleChange} className="border p-2 rounded" required />
          <input name="licencia" placeholder="Licencia" value={form.licencia} onChange={handleChange} className="border p-2 rounded" required />
          <input type="date" name="vencimiento_licencia" value={form.vencimiento_licencia} onChange={handleChange} className="border p-2 rounded" required />
          <button className="bg-green-600 text-white rounded py-2">Agregar</button>
        </form>
      </div>

      <div className="p-6 bg-white rounded shadow">
        <div style={{overflowX: 'auto'}}>
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr><th className="p-2">Nombre</th><th>Apellido</th><th>DNI</th><th>Licencia</th><th>Vence</th><th></th></tr>
            </thead>
            <tbody>
              {conductores.map(c => (
                <tr key={c.id_conductor} className="border-t">
                  <td className="p-2">{c.nombre}</td>
                  <td>{c.apellido}</td>
                  <td>{c.dni}</td>
                  <td>{c.licencia}</td>
                  <td>{c.vencimiento_licencia ? new Date(c.vencimiento_licencia).toLocaleDateString() : ''}</td>
                  <td><button onClick={()=>handleDelete(c.id_conductor)} className="text-red-600">Eliminar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
