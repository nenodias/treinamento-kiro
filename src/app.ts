import express from 'express';
import cors from 'cors';
import { healthRouter } from './routes/health';
import { productsRouter } from './routes/products';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/health', healthRouter);
app.use('/products', productsRouter);

export default app;
