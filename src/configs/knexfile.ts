import path from 'path';

export default {
	development: {
		client: 'sqlite3',
		connection: {
			filename: path.resolve(__dirname, '..', 'database', 'database.sqlite'),
		},
		migrations: {
			directory: path.resolve(__dirname, '..', 'database', 'migrations'),
		},
		seeds: {
			directory: path.resolve(__dirname, '..', 'database', 'seeds'),
		},
		useNullAsDefault: true,
	},

	test: {
		client: 'sqlite3',
		connection: {
			filename: path.resolve(__dirname, '..', 'database', 'test.sqlite'),
		},
		migrations: {
			directory: path.resolve(__dirname, '..', 'database', 'migrations'),
		},
		seeds: {
			directory: path.resolve(__dirname, '..', 'database', 'seeds'),
		},
		useNullAsDefault: true,
	},
};
