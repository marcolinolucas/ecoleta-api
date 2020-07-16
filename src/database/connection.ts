import knex from 'knex';

import knexConfigs from '@configs/knexfile';

const config = process.env.NODE_ENV === 'test' ? knexConfigs.test : knexConfigs.development;
const connection = knex(config);

export default connection;
