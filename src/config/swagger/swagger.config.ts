import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export async function addSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('DigiPrint')
    .setDescription('Backend Api for DigiPrint-Frontent')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
