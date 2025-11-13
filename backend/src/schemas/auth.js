import {body} from 'express-validator';

export const registerValidator = [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('email').isEmail().withMessage('El email no es válido'),
    body('contrasena').isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

export const loginValidator = [
    body('email').isEmail().withMessage('El email no es válido'),
    body('contrasena').notEmpty().withMessage('La contraseña es obligatoria'),
];