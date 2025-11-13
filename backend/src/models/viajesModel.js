import db from "../config/db.js";

// Obtener todos los viajes (con datos del vehículo y conductor)
export const getAllViajes = async () => {
  const [rows] = await db.query(`
    SELECT 
      v.id_viaje,
      v.fecha_inicio,
      v.fecha_fin,
      v.origen,
      v.destino,
      v.kilometros,
      c.nombre AS nombre_conductor,
      c.apellido AS apellido_conductor,
      ve.marca AS marca_vehiculo,
      ve.modelo AS modelo_vehiculo,
      ve.patente AS patente_vehiculo
    FROM viaje v
    JOIN conductor c ON v.id_conductor = c.id_conductor
    JOIN vehiculo ve ON v.id_vehiculo = ve.id_vehiculo
    ORDER BY v.id_viaje DESC
  `);
  return rows;
};

// Obtener un viaje por ID
export const getViajeById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM viaje WHERE id_viaje = ?",
    [id]
  );
  return rows[0];
};

// Crear un nuevo viaje
export const createViaje = async (viaje) => {
  const {
    id_vehiculo,
    id_conductor,
    fecha_inicio,
    fecha_fin,
    origen,
    destino,
    kilometros,
  } = viaje;

  const [result] = await db.query(
    `INSERT INTO viaje 
    (id_vehiculo, id_conductor, fecha_inicio, fecha_fin, origen, destino, kilometros)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id_vehiculo, id_conductor, fecha_inicio, fecha_fin, origen, destino, kilometros]
  );

  return { id_viaje: result.insertId, ...viaje };
};

// Actualizar un viaje
export const updateViaje = async (id, viaje) => {
  const {
    id_vehiculo,
    id_conductor,
    fecha_inicio,
    fecha_fin,
    origen,
    destino,
    kilometros,
  } = viaje;

  const [result] = await db.query(
    `UPDATE viaje 
     SET id_vehiculo = ?, id_conductor = ?, fecha_inicio = ?, fecha_fin = ?, 
         origen = ?, destino = ?, kilometros = ?
     WHERE id_viaje = ?`,
    [id_vehiculo, id_conductor, fecha_inicio, fecha_fin, origen, destino, kilometros, id]
  );

  return result.affectedRows > 0;
};

// Eliminar un viaje
export const deleteViaje = async (id) => {
  const [result] = await db.query(
    "DELETE FROM viaje WHERE id_viaje = ?",
    [id]
  );
  return result.affectedRows > 0;
};
