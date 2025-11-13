import express from 'express';
import {
    obtenerConductores,
    obtenerConductorId,
    crearConductor,
    actualizarConductor,
    eliminarConductor

}from '../controllers/conductoresController.js';

const router = express.Router();

router.get('/', obtenerConductores);
router.get('/:id', obtenerConductorId);
router.post('/', crearConductor);
router.put('/:id', actualizarConductor);
router.delete('/:id', eliminarConductor);

export default router;