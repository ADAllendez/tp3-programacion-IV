import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db';
import { createUser, findUserByEmail } from '../models/auth.js';

export const resgister = async (req, res) => {
    const { nombre, email, contrasena } = req.body;

    try {
    const userExists = await findUserByEmail(pool, email);
    if (userExists) return res.status(400).json({ message: 'El email ya está registrado' });

    const contrasenaHash = await bcrypt.hash(contrasena, 10);
    const userId = await createUser(pool, { nombre, email, contrasenaHash });

    res.status(201).json({ message: 'Usuario registrado con éxito', id: userId });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar usuario', error: err.message });
  }
};


export const login = async (req, res) => {
    const { email, contrasena } = req.body; 
    try {
        const user = await findUserByEmail(pool, email);
        if (!user) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas' });
        }
        const isMatch = await bycrypt.compare(contrasena, user.contrasena);
        if (!isMatch) {
            return res.status(400).json({ mensaje: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { userId: user.id, nombre: user.nombre },
            process.env.JWT_SECRET,
            { expiresIn: '4h' }
        );

        res.json({ mensaje: 'Login exitoso', token });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
}
