import express from 'express';
import {
  getViajes,
  createViaje,
  updateViaje,
  deleteViaje,
  getViajesPorConductor,
  getViajesPorVehiculo,
  getKmPorConductor,
  getKmPorVehiculo
} from '../controllers/viajesController.js';

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get('/', verifyToken, getViajes);
router.post('/', verifyToken, createViaje);
router.put('/:id', verifyToken, updateViaje);
router.delete('/:id', verifyToken, deleteViaje);

router.get('/conductor/:id_conductor', verifyToken, getViajesPorConductor);
router.get('/vehiculo/:id_vehiculo', verifyToken, getViajesPorVehiculo);
router.get('/kilometros/conductor/:id_conductor', verifyToken, getKmPorConductor);
router.get('/kilometros/vehiculo/:id_vehiculo', verifyToken, getKmPorVehiculo);

export default router;
