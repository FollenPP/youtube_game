import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import { errorHandler } from './middleware/error.middleware.js';
import { authRouter } from './modules/auth/auth.routes.js';
import { healthRouter } from './routes/health.routes.js';

export const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL
  })
);
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/auth', authRouter);

app.get('/', (_req, res) => {
  res.json({
    name: 'YouTube Game Platform API',
    stage: 2,
    status: 'ok'
  });
});

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

app.use(errorHandler);
