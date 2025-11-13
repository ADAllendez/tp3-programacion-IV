import db from '../config/db.js';

export const vehiculosModel = {
   getAll: async () => {
       const [rows] = await db.query('SELECT * FROM vehiculos');
       return rows;
   },
   getById: async (id) => {
       const [rows] = await db.query('SELECT * FROM vehiculos WHERE id = ?', [id]);
       return rows[0];
   },
   create: async (vehiculo) => {
       const {marca, modelo, anio, patente, capacidad_carga} = vehiculo;
       const [result] = await db.query(
              'INSERT INTO vehiculos (marca, modelo, anio, patente, capacidad_carga) VALUES (?, ?, ?, ?, ?)',
                [marca, modelo, anio, patente, capacidad_carga]
        );
    return {id: result.insertId, ...vehiculo};
    },
    update: async (id, data) => {
        const {marca, modelo, anio, patente, capacidad_carga} = data;
        await db.query(
            'UPDATE vehiculos SET marca = ?, modelo = ?, anio = ?, patente = ?, capacidad_carga = ? WHERE id = ?',
            [marca, modelo, anio, patente, capacidad_carga, id]
        );
        return {id, ...data};
    },
    remove: async (id) => {
        await db.query('DELETE FROM vehiculos WHERE id = ?', [id]);
    },
};