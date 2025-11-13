
import { useEffect, useState } from "react";
import { getVehiculos as gv } from "./api/vehiculos";
import { getConductores as gc } from "./api/conductores";
import { getViajes as gvia } from "./api/viajes";
import api from "./api/axiosConfig";


export default function Home() {
  const [totales, setTotales] = useState({ vehiculos:0, conductores:0, viajes:0, kmTotal:0 });

  useEffect(() => {
    const carga = async () => {
      try {
        const [rVeh, rCon, rVia] = await Promise.all([gv(), gc(), gvia()]);
        const vehiculos = rVeh.data?.length || 0;
        const conductores = rCon.data?.length || 0;
        const viajes = rVia.data?.length || 0;
        const kmTotal = (rVia.data || []).reduce((s, v) => s + Number(v.kilometros || 0), 0);
        setTotales({ vehiculos, conductores, viajes, kmTotal });
      } catch (err) {
        console.error(err);
      }
    };
    carga();
  }, []);

  return (
    <div className="app-container pt-24 pb-8">
      <h2 className="text-2xl mb-6">Dashboard</h2>

      <div className="flex" style={{gap: '1rem', flexWrap: 'wrap'}}>
        <div className="p-4 bg-white rounded shadow" style={{flex: '1 1 220px'}}>
          <div className="text-sm text-gray-500">Vehículos</div>
          <div className="text-2xl font-bold">{totales.vehiculos}</div>
        </div>
        <div className="p-4 bg-white rounded shadow" style={{flex: '1 1 220px'}}>
          <div className="text-sm text-gray-500">Conductores</div>
          <div className="text-2xl font-bold">{totales.conductores}</div>
        </div>
        <div className="p-4 bg-white rounded shadow" style={{flex: '1 1 220px'}}>
          <div className="text-sm text-gray-500">Viajes</div>
          <div className="text-2xl font-bold">{totales.viajes}</div>
        </div>
        <div className="p-4 bg-white rounded shadow" style={{flex: '1 1 220px'}}>
          <div className="text-sm text-gray-500">Km Totales</div>
          <div className="text-2xl font-bold">{totales.kmTotal}</div>
        </div>
      </div>
    </div>
  );
}
