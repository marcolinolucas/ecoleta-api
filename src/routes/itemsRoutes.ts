import { celebrate } from 'celebrate';
import express from 'express';
import multer from 'multer';

import itemMulterConfig from '@configs/itemsMulterConfig';
import ItemsController from '@controllers/ItemsController';
import { createItemSchema } from '@validators/itemsValidator';

const upload = multer(itemMulterConfig);

const routes = express.Router();

const itemsController = new ItemsController();

routes.get('/', itemsController.index);

routes.get('/:id', itemsController.show);

routes.post(
	'/',
	upload.single('image'),
	celebrate(createItemSchema, { abortEarly: false }),
	itemsController.create
);

routes.put('/:id', upload.single('image'), itemsController.update);

routes.delete('/:id', itemsController.delete);

export default routes;
