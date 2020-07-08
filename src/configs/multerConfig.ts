import crypto from 'crypto';
import { Request } from 'express';
import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(req, file, callback) {
      const hash = crypto.randomBytes(6).toString('hex');
      const fileName = `${hash}-${file.originalname}`;

      callback(null, fileName);
    },
  }),
  limits: { fileSize: 2 * 1000 * 1000 },
  fileFilter(req: Request, file: any, callback: any) {
    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(
        new Error('Image uploaded is not of type jpg/jpeg or png'),
        false
      );
    }
  },
  onError(err: any, callback: any) {
    console.log('error', err);
    callback(err);
  },
};
