import express from 'express';
import  {vehiculosController}  from '../controllers/vehiculosController.js';

const router = express.Router();


router.get('/', vehiculosController.getAll);
router.get('/:id', vehiculosController.getById);
router.post('/', vehiculosController.create);
router.put('/:id', vehiculosController.update);
router.delete('/:id', vehiculosController.remove);

export default router;