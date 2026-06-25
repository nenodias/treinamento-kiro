import express from 'express';
import cors from 'cors';
import { healthRouter } from './routes/health';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/health', healthRouter);

// TODO: Endpoint de produtos será criado via Spec Driven na demo

export default app;
