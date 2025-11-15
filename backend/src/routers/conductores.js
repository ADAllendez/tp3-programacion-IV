import express from 'express';
import {
    obtenerConductores,
    obtenerConductorId,
    crearConductor,
    actualizarConductor,
    eliminarConductor
} from '../controllers/conductoresController.js';

import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, obtenerConductores);
router.get('/:id', verifyToken, obtenerConductorId);
router.post('/', verifyToken, crearConductor);
router.put('/:id', verifyToken, actualizarConductor);
router.delete('/:id', verifyToken, eliminarConductor);

export default router;
