import db from '../config/db.js';

export const vehiculosModel = {
   getAll: async () => {
       const [rows] = await db.query('SELECT * FROM vehiculo');
       return rows;
   },
   getById: async (id) => {
       const [rows] = await db.query('SELECT * FROM vehiculo WHERE id_vehiculo = ?', [id]);
       return rows[0];
   },
   create: async (vehiculo) => {
       const {marca, modelo, anio, patente, capacidad_carga} = vehiculo;
       const [result] = await db.query(
              'INSERT INTO vehiculo (marca, modelo, anio, patente, capacidad_carga) VALUES (?, ?, ?, ?, ?)',
                [marca, modelo, anio, patente, capacidad_carga]
        );
    return {id_vehiculo: result.insertId, ...vehiculo};
    },
    update: async (id, data) => {
        const {marca, modelo, anio, patente, capacidad_carga} = data;
        await db.query(
            'UPDATE vehiculo SET marca = ?, modelo = ?, anio = ?, patente = ?, capacidad_carga = ? WHERE id_vehiculo = ?',
            [marca, modelo, anio, patente, capacidad_carga, id]
        );
        return {id_vehiculo: id, ...data};
    },
    remove: async (id) => {
        await db.query('DELETE FROM vehiculo WHERE id_vehiculo = ?', [id]);
    },
};

export const getAll = vehiculosModel.getAll;
export const getById = vehiculosModel.getById;
export const create = vehiculosModel.create;
export const update = vehiculosModel.update;
export const remove = vehiculosModel.remove;