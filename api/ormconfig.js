const postgres = {
  name: 'default',
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  seeds: ['./src/shared/infra/typeorm/seeds/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
};

const mongo = {
  name: 'mongo',
  type: 'mongodb',
  host: process.env.MONGODB_HOST,
  port: process.env.MONGODB_PORT,
  username: process.env.MONGODB_USERNAME,
  password: process.env.MONGODB_PASSWORD,
  database: process.env.MONGODB_DATABASE,
  useUnifiedTopology: true,
  entities: ['./src/modules/**/infra/typeorm/schemas/*.ts'],
};

module.exports = [
  {
    ...mongo,
    ...(process.env.NODE_ENV === 'production'
      ? {
          entities: ['./dist/modules/**/infra/typeorm/schemas/*.js'],
        }
      : {}),
  },
  {
    ...postgres,
    ...(process.env.NODE_ENV === 'production'
      ? {
          entities: ['./dist/modules/**/infra/typeorm/entities/*.js'],
          migrations: ['./dist/shared/infra/typeorm/migrations/*.js'],
          seeds: ['./dist/shared/infra/typeorm/seeds/*.js'],
          // cli: {
          //   migrationsDir: './dist/shared/infra/typeorm/migrations',
          // },
        }
      : {}),
  },
];
