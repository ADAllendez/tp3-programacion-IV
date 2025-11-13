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

const router = express.Router();

router.get('/', getViajes);
router.post('/', createViaje);
router.put('/:id', updateViaje);
router.delete('/:id', deleteViaje);

// 🔍 Consultas adicionales
router.get('/conductor/:id_conductor', getViajesPorConductor);
router.get('/vehiculo/:id_vehiculo', getViajesPorVehiculo);
router.get('/kilometros/conductor/:id_conductor', getKmPorConductor);
router.get('/kilometros/vehiculo/:id_vehiculo', getKmPorVehiculo);

export default router;
