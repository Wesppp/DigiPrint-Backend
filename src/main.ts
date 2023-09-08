import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';

import { addSwagger } from './config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  addSwagger(app);
  app.use(cookieParser());
  await app.listen(process.env.DIGIPRINT_PORT);
  logger.log(`Server is running on ${await app.getUrl()}`, 'bootstrap');
}

bootstrap();
