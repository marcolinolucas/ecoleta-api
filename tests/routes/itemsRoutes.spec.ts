import fs from 'fs';
import path from 'path';
import request from 'supertest';

import app from '../../src/app';
import knex from '../../src/database/connection';
import itemMock from '../mock/itemMock';

const uploadsPath = path.resolve(__dirname, '..', '..', 'uploads');

beforeEach(async (done) => {
	await knex.migrate.rollback();
	await knex.migrate.latest();

	await knex('items').insert(itemMock);
	fs.copyFileSync(
		path.resolve(__dirname, '..', 'mock', 'itemMock.svg'),
		path.resolve(uploadsPath, 'itemMock.svg')
	);

	done();
});

afterAll(async (done) => {
	await knex.destroy();

	fs.unlinkSync(path.resolve(uploadsPath, 'itemExample.svg'));
	fs.unlinkSync(path.resolve(uploadsPath, 'itemMock2.svg'));

	done();
});

describe('Items', () => {
	it('should be able to create a new item', async (done) => {
		const response = await request(app)
			.post('/items')
			.field('title', 'itemExample')
			.attach('image', path.resolve(__dirname, '..', 'mock', 'itemMock.svg'));

		expect(response).toBeDefined();
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.body.id).toEqual(2);

		done();
	});

	it('should be able to list all items', async (done) => {
		const response = await request(app).get('/items');

		expect(response).toBeDefined();
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.body.length).toBe(1);

		done();
	});

	it('should be able to list an specific items', async (done) => {
		const response = await request(app).get('/items/1');

		expect(response).toBeDefined();
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
		expect(response.body.title).toEqual(itemMock.title);
		expect(response.body.image).toEqual(itemMock.image);

		done();
	});

	it('should be able to update title of an specific item', async (done) => {
		const response = await request(app).put('/items/1').field('title', 'ChangeText');

		expect(response).toBeDefined();
		expect(response.status).toBe(204);

		const item = await knex('items').where({ id: 1 }).first();

		expect(item).toBeDefined();
		expect(item.title).toEqual('ChangeText');

		done();
	});

	it('should be able to update image of an specific item', async (done) => {
		const response = await request(app)
			.put('/items/1')
			.attach('image', path.resolve(__dirname, '..', 'mock', 'itemMock2.svg'));

		expect(response).toBeDefined();
		expect(response.status).toBe(204);

		const item = await knex('items').where({ id: 1 }).first();

		expect(item).toBeDefined();
		expect(item.title).toEqual('itemMock');

		done();
	});

	it('should be able to update image and title of an specific item', async (done) => {
		const response = await request(app)
			.put('/items/1')
			.field('title', 'itemMock2')
			.attach('image', path.resolve(__dirname, '..', 'mock', 'itemMock2.svg'));

		expect(response).toBeDefined();
		expect(response.status).toBe(204);

		const item = await knex('items').where({ id: 1 }).first();

		expect(item).toBeDefined();
		expect(item.title).toEqual('itemMock2');
		expect(item.image).toEqual('itemMock2.svg');

		done();
	});

	it('should be able to delete an specific items', async (done) => {
		const response = await request(app).delete('/items/1');

		expect(response).toBeDefined();
		expect(response.status).toBe(204);

		const items = await knex('items').select('*');
		expect(items.length).toBe(0);

		done();
	});
});
