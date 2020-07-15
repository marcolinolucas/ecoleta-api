import { Request } from 'express';
import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(req, file, callback) {
      const { title } = req.body;
      const { id } = req.params;

      const fileName = `${title || `item_${id}`}.svg`;

      callback(null, fileName);
    },
  }),
  limits: { fileSize: 2 * 1000 * 1000 },
  fileFilter(req: Request, file: any, callback: any) {
    if (!req.body.title && !req.params.id) {
      callback(new Error('Title is required'), false);
    } else if (['image/svg+xml'].includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Image uploaded is not a svg'), false);
    }
  },
  onError(err: any, callback: any) {
    console.log('error', err);
    callback(err);
  },
};
