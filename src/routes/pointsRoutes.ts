import { celebrate } from 'celebrate';
import express from 'express';
import multer from 'multer';

import multerConfig from '@configs/multerConfig';
import PointsController from '@controllers/PointsController';
import {
  createPointSchema,
  updatePointSchema,
} from '@validators/pointsValidator';

const pointsController = new PointsController();

const routes = express.Router();
const upload = multer(multerConfig);

routes.post(
  '/',
  upload.single('image'),
  celebrate(createPointSchema, { abortEarly: false }),
  pointsController.create
);

routes.get('/', pointsController.index);

routes.get('/:id', pointsController.show);

routes.put(
  '/',
  celebrate(updatePointSchema, { abortEarly: false }),
  pointsController.update
);

routes.delete('/:id', pointsController.delete);

export default routes;
