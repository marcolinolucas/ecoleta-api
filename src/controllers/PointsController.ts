// index, show, create, update, delete
import { Request, Response } from 'express';

import knex from '../database/connection';

class PointsController {
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItem = String(items)
      .split(',')
      .map((item) => Number(item.trim()));

    const points = await knex('points')
      .join('pointItems', 'points.id', '=', 'pointItems.pointId')
      .whereIn('pointItems.itemId', parsedItem)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    const serializedPoints = points.map((point) => {
      return {
        ...point,
        imageUrl: `http://192.168.1.18:3333/uploads/${point.image}`,
      };
    });

    return res.json(serializedPoints);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex('points').where('id', id).first();

    if (!point) return res.status(400).json({ message: 'Point not found.' });

    const serializedPoints = {
      ...point,
      imageUrl: `http://192.168.1.18:3333/uploads/${point.image}`,
    };

    const items = await knex('items')
      .join('pointItems', 'items.id', '=', 'pointItems.itemId')
      .where('pointItems.pointId', id)
      .select('items.title');

    return res.json({
      point: serializedPoints,
      items,
    });
  }

  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    const trx = await knex.transaction();

    const point = {
      image: req.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const pointId = await trx('points')
      .insert(point)
      .then((response) => response[0]);

    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((itemId: number) => {
        return {
          itemId,
          pointId,
        };
      });

    await trx('pointItems').insert(pointItems);

    await trx.commit();

    return res.json({
      id: pointId,
      ...point,
    });
  }
}

export default PointsController;
