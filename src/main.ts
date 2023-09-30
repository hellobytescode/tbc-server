import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();
  app.enableCors({
    origin: '*',
  });
  app.setGlobalPrefix('api/v1');

  // Swagger Initialization
  const config = new DocumentBuilder()
    .setTitle('The BytesCode API')
    .setDescription('The BytesCode API for student and admin portal.')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('The BytesCode ')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(5000);
  Logger.log(
    `✅ Services running at PORT ${configService.get<string>('PORT')}`,
  );
}
bootstrap();
