import { DataSource } from 'typeorm';
import 'dotenv/config';
import * as path from 'path';
import { config } from 'dotenv';

config({
  path: '../../../apps/2hon/.env',
});
export default new DataSource({
  type: 'mysql',
  host: 'db',
  // port: parseInt(process.env.DB_MYSQL_PORT),
  port: 3306,
  username: process.env.DB_MYSQL_USERNAME,
  password: process.env.DB_MYSQL_PASSWORD,
  database: process.env.DB_MYSQL_DATABASE,
  charset: process.env.DB_MYSQL_CHARSET,
  timezone: process.env.DB_MYSQL_TIMEZONE,
  entities: [path.join(__dirname + '/entities/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname + '/migrations/*{.ts,.js}')],
  migrationsTableName: 'migrations',
});

console.log(process.env.DB_MYSQL_USERNAME);
