import express from 'express';
import { vehiculosController } from '../controllers/vehiculosController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', verifyToken, vehiculosController.getAll);
router.get('/:id', verifyToken, vehiculosController.getById);
router.post('/', verifyToken, vehiculosController.create);
router.put('/:id', verifyToken, vehiculosController.update);
router.delete('/:id', verifyToken, vehiculosController.remove);

export default router;
