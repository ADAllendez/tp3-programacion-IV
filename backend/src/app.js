
import express from 'express';
import cors from 'cors';
import authRouter from './routers/auth.js';
import vehiculosRouter from './routers/vehiculos.js';
import conductoresRouter from './routers/conductores.js';
import viajes from './routers/viajes.js';
import { verifyToken } from './middlewares/auth.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/vehiculos', verifyToken, vehiculosRouter);
app.use('/api/conductores', verifyToken, conductoresRouter);
app.use('/api/viajes', verifyToken, viajes);

export default app;
