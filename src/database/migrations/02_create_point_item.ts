import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('pointItems', (table) => {
    table.increments('id').primary();
    table.string('pointId').references('id').inTable('points').notNullable();
    table.string('itemId').references('id').inTable('items').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('pointItems');
}
