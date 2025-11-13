import { useEffect, useState } from 'react';
import { getVehiculos, createVehiculo, deleteVehiculo } from '../../api/vehiculos';

export default function VehiculosPage() {
  const [vehiculos, setVehiculos] = useState([]);
  const [form, setForm] = useState({ marca:'', modelo:'', patente:'', anio:'', capacidad_carga:'' });

  const load = async () => {
    const res = await getVehiculos();
    setVehiculos(res.data || []);
  };

  useEffect(()=>{ load(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await createVehiculo(form);
    setForm({ marca:'', modelo:'', patente:'', anio:'', capacidad_carga:'' });
    load();
  };

  const handleDelete = async id => {
    if(!confirm('Confirmar eliminación')) return;
    await deleteVehiculo(id);
    load();
  };

  return (
    <div className="app-container pt-24 pb-8">
      <h2 className="text-2xl mb-4">Vehículos</h2>

      <div className="p-6 bg-white rounded shadow mb-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input name="marca" placeholder="Marca" value={form.marca} onChange={handleChange} className="border p-2 rounded" required />
          <input name="modelo" placeholder="Modelo" value={form.modelo} onChange={handleChange} className="border p-2 rounded" required />
          <input name="patente" placeholder="Patente" value={form.patente} onChange={handleChange} className="border p-2 rounded" required />
          <input name="anio" type="number" placeholder="Año" value={form.anio} onChange={handleChange} className="border p-2 rounded" required />
          <input name="capacidad_carga" type="number" placeholder="Capacidad (kg)" value={form.capacidad_carga} onChange={handleChange} className="border p-2 rounded" required />
          <button className="bg-green-600 text-white rounded py-2">Agregar</button>
        </form>
      </div>

      <div className="p-6 bg-white rounded shadow">
        <div style={{overflowX: 'auto'}}>
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Marca</th><th>Modelo</th><th>Patente</th><th>Año</th><th>Capacidad</th><th></th>
              </tr>
            </thead>
            <tbody>
              {vehiculos.map(v => (
                <tr key={v.id_vehiculo} className="border-t">
                  <td className="p-2">{v.marca}</td>
                  <td>{v.modelo}</td>
                  <td>{v.patente}</td>
                  <td>{v.anio}</td>
                  <td>{v.capacidad_carga}</td>
                  <td><button onClick={()=>handleDelete(v.id_vehiculo)} className="text-red-600">Eliminar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
