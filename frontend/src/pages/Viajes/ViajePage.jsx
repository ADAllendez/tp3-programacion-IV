import { useEffect, useState } from 'react';
import { getViajes, createViaje, deleteViaje } from '../../api/viajes';
import { getVehiculos } from '../../api/vehiculos';
import { getConductores } from '../../api/conductores';

export default function ViajesPage() {
  const [viajes, setViajes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [conductores, setConductores] = useState([]);
  const [form, setForm] = useState({ id_vehiculo:'', id_conductor:'', fecha_inicio:'', fecha_fin:'', origen:'', destino:'', kilometros:'' });

  const load = async () => {
    const [rVia, rVeh, rCon] = await Promise.all([getViajes(), getVehiculos(), getConductores()]);
    setViajes(rVia.data || []);
    setVehiculos(rVeh.data || []);
    setConductores(rCon.data || []);
  };

  useEffect(()=>{ load(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await createViaje(form);
    setForm({ id_vehiculo:'', id_conductor:'', fecha_inicio:'', fecha_fin:'', origen:'', destino:'', kilometros:'' });
    load();
  };

  const handleDelete = async id => {
    if(!confirm('Confirmar eliminación')) return;
    await deleteViaje(id);
    load();
  };

  return (
    <div className="app-container pt-24 pb-8">
      <h2 className="text-2xl mb-4">Viajes</h2>

      <div className="p-6 bg-white rounded shadow mb-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select name="id_conductor" required value={form.id_conductor} onChange={handleChange} className="border p-2 rounded">
            <option value="">Seleccionar conductor</option>
            {conductores.map(c => <option key={c.id_conductor} value={c.id_conductor}>{c.nombre} {c.apellido}</option>)}
          </select>

          <select name="id_vehiculo" required value={form.id_vehiculo} onChange={handleChange} className="border p-2 rounded">
            <option value="">Seleccionar vehículo</option>
            {vehiculos.map(v => <option key={v.id_vehiculo} value={v.id_vehiculo}>{v.marca} {v.modelo} ({v.patente})</option>)}
          </select>

          <input type="datetime-local" name="fecha_inicio" value={form.fecha_inicio} onChange={handleChange} className="border p-2 rounded" required />
          <input type="datetime-local" name="fecha_fin" value={form.fecha_fin} onChange={handleChange} className="border p-2 rounded" />
          <input name="origen" placeholder="Origen" value={form.origen} onChange={handleChange} className="border p-2 rounded" required />
          <input name="destino" placeholder="Destino" value={form.destino} onChange={handleChange} className="border p-2 rounded" required />
          <input type="number" name="kilometros" placeholder="Kilómetros" value={form.kilometros} onChange={handleChange} className="border p-2 rounded" required />
          <button className="bg-green-600 text-white rounded py-2">Registrar viaje</button>
        </form>
      </div>

      <div className="p-6 bg-white rounded shadow">
        <div style={{overflowX: 'auto'}}>
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr><th>Vehículo</th><th>Conductor</th><th>Origen</th><th>Destino</th><th>Salida</th><th>Llegada</th><th>Km</th><th></th></tr>
            </thead>
            <tbody>
              {viajes.map(v => (
                <tr key={v.id_viaje} className="border-t">
                  <td>{v.marca_vehiculo || v.marca} {v.modelo_vehiculo || v.modelo} ({v.patente_vehiculo || v.patente})</td>
                  <td>{v.nombre_conductor || v.nombre} {v.apellido_conductor || v.apellido}</td>
                  <td>{v.origen}</td>
                  <td>{v.destino}</td>
                  <td>{v.fecha_inicio ? new Date(v.fecha_inicio).toLocaleString() : ''}</td>
                  <td>{v.fecha_fin ? new Date(v.fecha_fin).toLocaleString() : '-'}</td>
                  <td>{v.kilometros}</td>
                  <td><button onClick={()=>handleDelete(v.id_viaje)} className="text-red-600">Eliminar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
