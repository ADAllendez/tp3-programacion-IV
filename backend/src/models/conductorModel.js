import db from '../config/db.js';

export const getAllConductores = async () => {
    const [rows] = await db.query('SELECT * FROM conductores');
    return rows;
};

export const getConductorById = async (id) => {
    const [rows] = await db.query('SELECT * FROM conductores WHERE id = ?', [id]);
    return rows[0];
};

export const createConductor = async (conductor) => {
    const {nombre, apellido , dni, licencia, vencimiento_licencia} = conductor;
    const [result] = await db.query(
        'INSERT INTO conductores (nombre, apellido , dni, licencia, vencimiento_licencia) VALUES (?, ?, ?, ?, ?)',
        [nombre, apellido , dni, licencia, vencimiento_licencia]
    );
    return {id: result.insertId, ...conductor};
};

export const updateConductor = async (id, conductor) => {
    const {nombre, apellido , dni, licencia, vencimiento_licencia} = conductor;
    await db.query(
        'UPDATE conductores SET nombre = ?, apellido = ?, dni = ?, licencia = ?, vencimiento_licencia = ? WHERE id = ?',
        [nombre, apellido , dni, licencia, vencimiento_licencia, id]
    );
    return {id, ...conductor};
}

export const deleteConductor = async (id) => {
    await db.query('DELETE FROM conductores WHERE id = ?', [id]);
    return { message: "Conductor eliminado" };
};