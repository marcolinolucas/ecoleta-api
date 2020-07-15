import { errors } from 'celebrate';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import path from 'path';

import itemsRoutes from '@routes/itemsRoutes';
import pointsRoutes from '@routes/pointsRoutes';

const app = express();

app.use(cors());
app.use(logger(':method :url :status - :response-time ms'));
app.use(express.json());

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use('/points', pointsRoutes);
app.use('/items', itemsRoutes);

app.use(errors());

app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

app.use(
  (err: IErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).send(err.message);
    return next();
  }
);

app.listen(3333);
