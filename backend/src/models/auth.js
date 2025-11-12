export const createUser = async (pool, {nombre, email, contrasenaHash}) => {
    const [result] = await pool.query(
        'INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)',
        [nombre, email, contrasenaHash]
    );
    return result.insertId;
};

export const findUserByEmail = async (pool, email) => {
    const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
    );
    return rows[0];
};