import { DataSource } from 'typeorm';
import 'dotenv/config';
import * as path from 'path';
import { config } from 'dotenv';
import { Posts } from './entities/post.entity';

config({
  path: '../../../.env',
});
export default new DataSource({
  type: 'mysql',
  host: process.env.DB_MYSQL_HOST,
  // port: parseInt(process.env.DB_MYSQL_PORT),
  port: parseInt(process.env.DB_MYSQL_PORT),
  username: process.env.DB_MYSQL_USERNAME,
  password: process.env.DB_MYSQL_PASSWORD,
  database: process.env.DB_MYSQL_DATABASE,
  charset: process.env.DB_MYSQL_CHARSET,
  timezone: process.env.DB_MYSQL_TIMEZONE,
  entities: [path.join(__dirname + '/entities/*.entity{.ts}')],
  migrations: [path.join(__dirname + '/migrations/*{.ts}')],
  migrationsTableName: 'migrations',
  synchronize: true,
});
