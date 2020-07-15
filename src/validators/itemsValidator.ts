import { Segments, Joi } from 'celebrate';

const createItemSchema = {
  [Segments.BODY]: Joi.object()
    .keys({
      title: Joi.string().required(),
    })
    .required(),
};

export { createItemSchema };
