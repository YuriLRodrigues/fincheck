import 'dotenv/config';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { Request } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: '*',
  });
  morgan.token(
    'remote-addr',
    (req: Request) =>
      req.headers['x-forwarded-for'] || req.connection.remoteAddress,
  );
  app.use(morgan('combined'));

  await app.listen(3344);
}

bootstrap();
