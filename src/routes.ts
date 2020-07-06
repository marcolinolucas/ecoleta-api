import { celebrate } from 'celebrate';
import express from 'express';
import multer from 'multer';

import multerConfig from '@configs/multerConfig';
import ItemsController from '@controllers/ItemsController';
import PointsController from '@controllers/PointsController';
import { createPointSchema } from '@validators/pointsValidator';

const routes = express.Router();
const upload = multer(multerConfig);

const itemsController = new ItemsController();
const pointsController = new PointsController();

routes.get('/items', itemsController.index);

routes.post(
  '/points',
  upload.single('image'),
  celebrate(createPointSchema, { abortEarly: false }),
  pointsController.create
);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;
