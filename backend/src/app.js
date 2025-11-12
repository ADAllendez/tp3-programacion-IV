import express from 'express';
import cors from 'cors';
import auuthRouter from './routers/auth.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', auuthRouter);

export default app;