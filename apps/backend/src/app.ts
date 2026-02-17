import cors from 'cors';
import express from 'express';
import { healthRouter } from './routes/health.routes.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRouter);

app.get('/', (_req, res) => {
  res.json({
    name: 'YouTube Game Platform API',
    stage: 1,
    status: 'ok'
  });
});
