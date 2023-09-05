import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { addSwagger } from './config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  addSwagger(app);
  await app.listen(process.env.DIGIPRINT_PORT);
  logger.log(`Server is running on ${await app.getUrl()}`, 'bootstrap');
}

bootstrap();
