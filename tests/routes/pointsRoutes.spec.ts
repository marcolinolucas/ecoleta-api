import fs from 'fs';
import path from 'path';
import request from 'supertest';

import app from '../../src/app';
import knex from '../../src/database/connection';
import pointItemsMock from '../mock/pointItemsMock';
import pointMock from '../mock/pointMock';

const uploadsPath = path.resolve(__dirname, '..', '..', 'uploads');

beforeEach(async (done) => {
	await knex.migrate.rollback();
	await knex.migrate.latest();

	await knex('points').insert(pointMock);
	await knex('pointItems').insert(pointItemsMock);

	fs.copyFileSync(
		path.resolve(__dirname, '..', 'mock', 'pointImgMock.jpeg'),
		path.resolve(uploadsPath, 'pointImgMock.jpeg')
	);

	done();
});

afterAll(async (done) => {
	await knex.destroy();

	done();
});

describe('Points', () => {
	it('should be able to create a new point', async (done) => {
		const response = await request(app)
			.post('/points')
			.field('name', 'Any Market')
			.field('email', 'contact@market.com')
			.field('whatsapp', '21999999999')
			.field('latitude', -36.851131)
			.field('longitude', -28.846532)
			.field('city', 'São Gonçalo')
			.field('uf', 'RJ')
			.field('items', '1,2,6')
			.attach('image', path.resolve(__dirname, '..', 'mock', 'pointImgMock.jpeg'));

		expect(response).toBeDefined();
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.body.id).toEqual(2);

		await request(app).delete('/points/2');

		done();
	});

	it('should be able to list all points', async (done) => {
		const response = await request(app).get('/points').query({
			city: pointMock.city,
			uf: pointMock.uf,
			items: '1,2',
		});

		expect(response).toBeDefined();
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.body.length).toBe(1);

		done();
	});

	it('should be able to list an specific points', async (done) => {
		const response = await request(app).get('/points/1');

		expect(response).toBeDefined();
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.body.point).toBeDefined();

		done();
	});

	it('should be able to update an specific point', async (done) => {
		const response = await request(app).put('/points/1').send({
			name: 'New name',
			city: 'New city',
		});

		expect(response).toBeDefined();
		expect(response.status).toBe(204);

		const point = await knex('points').where({ id: 1 }).first();

		expect(point).toBeDefined();
		expect(point.name).toEqual('New name');
		expect(point.city).toEqual('New city');
		expect(point.uf).toEqual(pointMock.uf);

		done();
	});

	it('should be able to delete an specific points', async (done) => {
		const response = await request(app).delete('/points/1');

		expect(response).toBeDefined();
		expect(response.status).toBe(204);

		const points = await knex('points').select('*');
		expect(points.length).toBe(0);

		done();
	});
});
