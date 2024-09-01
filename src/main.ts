import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { MyLogger } from 'libs/core/helpers/logger.helper';
import { HttpExceptionFilter } from 'libs/core/filters/http.exception.filter';
import { json, urlencoded } from 'body-parser';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { ParamsValidationPipe } from '@libs/core/pipes/param.validation.pipe';
import { CustomValidationPipe } from '@libs/core/pipes/custom.validation.pipe';

const logger = new MyLogger('app:mkoong');
async function bootstrap() {
  logger.log('Creating mkoong Application Instance');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger: ['log', 'debug', 'error', 'verbose', 'warn'],
  });
  const configService: ConfigService = app.get(ConfigService);

  app.setGlobalPrefix('');
  app.enableVersioning({ type: VersioningType.URI });

  logger.log('Setting Swagger Documentation');

  const config = new DocumentBuilder()
    .setTitle('MBTI 커뮤니티 엠쿵')
    .setDescription('엠쿵 개발 스웨거 ')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  // app.useGlobalPipes(new ParamsValidationPipe());
  app.useGlobalPipes(
    new CustomValidationPipe({
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 값이 넘어오면 request 자체 block
      transform: true, // 클라이언트에서 값을 받자마자 타입을 정의한대로 자동 형변환
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const port = configService.get<number>('SERVER_PORT');
  await app.listen(port);

  console.log('Test');
  logger.log(`Mkoong Server is running on Port test ${port}`);
  logger.log(
    path
      .join(__dirname, '../libs/core/databases/entities/*.entity{.ts,.js}')
      .toString(),
  );
}
bootstrap();
