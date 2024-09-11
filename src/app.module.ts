import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import helmet from 'helmet';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from 'libs/core/filters/http.exception.filter';
import { PassportModule } from './passport/passport.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        SERVER_PORT: Joi.number().required(), // 서버 포트
        // Mysql DB 설정
        DB_MYSQL_HOST: Joi.string().required(), // Mysql DB Host 경로
        DB_MYSQL_PORT: Joi.number().max(60000).required(), // Mysql DB Port 번호
        DB_MYSQL_DATABASE: Joi.string().required(), // Mysql DB 이름
        DB_MYSQL_USERNAME: Joi.string().required(), // Mysql DB 사용자 이름
        DB_MYSQL_PASSWORD: Joi.string().required(), // Mysql DB 비밀번호
        DB_MYSQL_CHARSET: Joi.string().required(), // Mysql DB 문자셋
        DB_MYSQL_TIMEZONE: Joi.string().required(), // Mysql DB 타임존
      }),
    }),
    // TypeOrmModule.forRootAsync({
    //   imports:[ConfigModule],
    //   inject: [ConfigService],

    //   useFactory : databaseProviders

    // })
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_MYSQL_HOST'),
        port: configService.get<number>('DB_MYSQL_PORT'),
        username: configService.get<string>('DB_MYSQL_USERNAME'),
        password: configService.get<string>('DB_MYSQL_PASSWORD'),
        database: configService.get<string>('DB_MYSQL_DATABASE'),
        charset: configService.get<string>('DB_MYSQL_CHARSET'),
        timezone: configService.get<string>('DB_MYSQL_TIMEZONE'),
        entities: [__dirname + '../libs/core/databases/entities/*.entity{.ts}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    PassportModule,
    PostsModule,
    UsersModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: HttpExceptionFilter },
    {
      provide: APP_FILTER,
      useValue: new HttpExceptionFilter(),
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet()).forRoutes('*');
  }
}
