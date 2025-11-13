import db from '../config/db.js';

// ✅ Obtener todos los viajes
export const getViajes = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT v.id_viaje, v.fecha_inicio, v.fecha_fin, v.origen, v.destino, v.kilometros,
             c.nombre AS nombre_conductor, c.apellido AS apellido_conductor,
             ve.marca AS marca_vehiculo, ve.modelo AS modelo_vehiculo, ve.patente AS patente_vehiculo
      FROM viaje v
      JOIN conductor c ON v.id_conductor = c.id_conductor
      JOIN vehiculo ve ON v.id_vehiculo = ve.id_vehiculo
      ORDER BY v.fecha_inicio DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener viajes:', error);
    res.status(500).json({ message: 'Error al obtener viajes' });
  }
};

// ✅ Crear un viaje
export const createViaje = async (req, res) => {
  try {
    const { id_vehiculo, id_conductor, fecha_inicio, fecha_fin, origen, destino, kilometros } = req.body;

    if (!id_vehiculo || !id_conductor || !fecha_inicio || !origen || !destino || !kilometros) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    const [result] = await db.query(
      `INSERT INTO viaje (id_vehiculo, id_conductor, fecha_inicio, fecha_fin, origen, destino, kilometros)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id_vehiculo, id_conductor, fecha_inicio, fecha_fin, origen, destino, kilometros]
    );

    res.status(201).json({ id_viaje: result.insertId, ...req.body });
  } catch (error) {
    console.error('Error al crear viaje:', error);
    res.status(500).json({ message: 'Error al crear viaje' });
  }
};

// ✅ Actualizar viaje
export const updateViaje = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_vehiculo, id_conductor, fecha_inicio, fecha_fin, origen, destino, kilometros } = req.body;

    const [result] = await db.query(
      `UPDATE viaje 
       SET id_vehiculo = ?, id_conductor = ?, fecha_inicio = ?, fecha_fin = ?, origen = ?, destino = ?, kilometros = ?
       WHERE id_viaje = ?`,
      [id_vehiculo, id_conductor, fecha_inicio, fecha_fin, origen, destino, kilometros, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Viaje no encontrado' });

    res.json({ message: 'Viaje actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar viaje:', error);
    res.status(500).json({ message: 'Error al actualizar viaje' });
  }
};

// ✅ Eliminar viaje
export const deleteViaje = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(`DELETE FROM viaje WHERE id_viaje = ?`, [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Viaje no encontrado' });

    res.json({ message: 'Viaje eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar viaje:', error);
    res.status(500).json({ message: 'Error al eliminar viaje' });
  }
};

// ✅ Obtener viajes por conductor
export const getViajesPorConductor = async (req, res) => {
  try {
    const { id_conductor } = req.params;
    const [rows] = await db.query(`
      SELECT v.id_viaje, v.fecha_inicio, v.fecha_fin, v.origen, v.destino, v.kilometros,
             ve.marca, ve.modelo, ve.patente
      FROM viaje v
      JOIN vehiculo ve ON v.id_vehiculo = ve.id_vehiculo
      WHERE v.id_conductor = ?
      ORDER BY v.fecha_inicio DESC
    `, [id_conductor]);

    res.json(rows);
  } catch (error) {
    console.error('Error al obtener viajes por conductor:', error);
    res.status(500).json({ message: 'Error al obtener viajes por conductor' });
  }
};

// ✅ Obtener viajes por vehículo
export const getViajesPorVehiculo = async (req, res) => {
  try {
    const { id_vehiculo } = req.params;
    const [rows] = await db.query(`
      SELECT v.id_viaje, v.fecha_inicio, v.fecha_fin, v.origen, v.destino, v.kilometros,
             c.nombre AS nombre_conductor, c.apellido AS apellido_conductor
      FROM viaje v
      JOIN conductor c ON v.id_conductor = c.id_conductor
      WHERE v.id_vehiculo = ?
      ORDER BY v.fecha_inicio DESC
    `, [id_vehiculo]);

    res.json(rows);
  } catch (error) {
    console.error('Error al obtener viajes por vehículo:', error);
    res.status(500).json({ message: 'Error al obtener viajes por vehículo' });
  }
};

// ✅ Total de kilómetros por conductor
export const getKmPorConductor = async (req, res) => {
  try {
    const { id_conductor } = req.params;
    const [rows] = await db.query(`
      SELECT c.id_conductor, c.nombre, c.apellido,
             COALESCE(SUM(v.kilometros), 0) AS total_kilometros
      FROM conductor c
      LEFT JOIN viaje v ON c.id_conductor = v.id_conductor
      WHERE c.id_conductor = ?
      GROUP BY c.id_conductor
    `, [id_conductor]);

    if (rows.length === 0) return res.status(404).json({ message: 'Conductor no encontrado' });

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al calcular kilómetros por conductor:', error);
    res.status(500).json({ message: 'Error al calcular kilómetros por conductor' });
  }
};

// ✅ Total de kilómetros por vehículo
export const getKmPorVehiculo = async (req, res) => {
  try {
    const { id_vehiculo } = req.params;
    const [rows] = await db.query(`
      SELECT ve.id_vehiculo, ve.marca, ve.modelo, ve.patente,
             COALESCE(SUM(v.kilometros), 0) AS total_kilometros
      FROM vehiculo ve
      LEFT JOIN viaje v ON ve.id_vehiculo = v.id_vehiculo
      WHERE ve.id_vehiculo = ?
      GROUP BY ve.id_vehiculo
    `, [id_vehiculo]);

    if (rows.length === 0) return res.status(404).json({ message: 'Vehículo no encontrado' });

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al calcular kilómetros por vehículo:', error);
    res.status(500).json({ message: 'Error al calcular kilómetros por vehículo' });
  }
};
