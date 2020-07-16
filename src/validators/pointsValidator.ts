import { Segments, Joi } from 'celebrate';

const createPointSchema = {
	[Segments.BODY]: Joi.object()
		.keys({
			name: Joi.string().required(),
			email: Joi.string().required().email(),
			whatsapp: Joi.string().required().max(11),
			latitude: Joi.number().required(),
			longitude: Joi.number().required(),
			city: Joi.string().required(),
			uf: Joi.string().required().max(2),
			items: Joi.string()
				.required()
				.regex(/^\d+(,\d+)*$/),
		})
		.required(),
};

const updatePointSchema = {
	[Segments.BODY]: Joi.object()
		.keys({
			name: Joi.string(),
			email: Joi.string().email(),
			whatsapp: Joi.string().max(11),
			latitude: Joi.number(),
			longitude: Joi.number(),
			city: Joi.string(),
			uf: Joi.string().max(2),
			items: Joi.string().regex(/^\d+(,\d+)*$/),
		})
		.required(),
};

export { createPointSchema, updatePointSchema };
