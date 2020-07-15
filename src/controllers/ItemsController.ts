import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import knex from '../database/connection';

const uploadsPath = path.resolve(__dirname, '..', '..', 'uploads');

class ItemsController {
	async index(_req: Request, res: Response) {
		const items = await knex('items').select('*');

		const serializedItems = items.map((item) => ({
			id: item.id,
			title: item.title,
			imageUrl: `http://192.168.1.18:3333/uploads/${item.image}`,
		}));

		return res.json(serializedItems);
	}

	async show(req: Request, res: Response) {
		const { id } = req.params;

		const item = await knex('items').where({ id }).first();

		if (!item) return res.status(400).json({ message: 'Item not found.' });

		return res.json(item);
	}

	async create(req: Request, res: Response) {
		const { title } = req.body;

		const item = await knex('items').where({ title }).first();
		if (item) return res.status(404).json({ message: 'Item already exist' });

		const itemId = await knex('items')
			.insert({
				title,
				image: `${title}.svg`,
			})
			.then((response) => response[0]);

		return res.json({ id: itemId });
	}

	async update(req: Request, res: Response) {
		const { title } = req.body;
		const { id } = req.params;

		const item = await knex('items').where({ id }).first();
		if (!item) return res.status(400).json({ message: 'Item not found.' });

		if (req.file) fs.unlinkSync(path.resolve(uploadsPath, item.image));

		if (title) {
			await knex('items')
				.where({ id })
				.update({
					title,
					image: `${title}.svg`,
				});
		} else {
			fs.renameSync(
				path.resolve(uploadsPath, `item_${id}.svg`),
				path.resolve(uploadsPath, item.image)
			);
		}

		return res.status(204).send();
	}

	async delete(req: Request, res: Response) {
		const { id } = req.params;

		const item = await knex('items').where({ id }).first();
		if (!item) return res.status(400).json({ message: 'Item not found.' });

		await knex('items').where({ id }).del();

		fs.unlinkSync(path.resolve(uploadsPath, item.image));

		return res.status(204).send();
	}
}

export default ItemsController;
