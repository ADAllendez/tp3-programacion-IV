import db from '../config/db.js';

export const getAllConductores = async () => {
    const [rows] = await db.query('SELECT * FROM conductor');
    return rows;
};

export const getConductorById = async (id) => {
    const [rows] = await db.query('SELECT * FROM conductor WHERE id_conductor = ?', [id]);
    return rows[0];
};

export const createConductor = async (conductor) => {
    const {nombre, apellido, dni, licencia, vencimiento_licencia} = conductor;
    const [result] = await db.query(
        'INSERT INTO conductor (nombre, apellido, dni, licencia, vencimiento_licencia) VALUES (?, ?, ?, ?, ?)',
        [nombre, apellido, dni, licencia, vencimiento_licencia]
    );
    return {id_conductor: result.insertId, ...conductor};
};

export const updateConductor = async (id, conductor) => {
    const {nombre, apellido, dni, licencia, vencimiento_licencia} = conductor;
    await db.query(
        'UPDATE conductor SET nombre = ?, apellido = ?, dni = ?, licencia = ?, vencimiento_licencia = ? WHERE id_conductor = ?',
        [nombre, apellido, dni, licencia, vencimiento_licencia, id]
    );
    return {id_conductor: id, ...conductor};
}

export const deleteConductor = async (id) => {
    await db.query('DELETE FROM conductor WHERE id_conductor = ?', [id]);
    return { message: "Conductor eliminado" };
};