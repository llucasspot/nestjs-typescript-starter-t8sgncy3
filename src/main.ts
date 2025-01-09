import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { SwaggerConfigPort } from './app/domain/ports/swagger-config.port';
import { AppConfigPort } from './app/domain/ports/app-config.port';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  const appConfig = app.get(AppConfigPort);
  const swaggerConfig = app.get(SwaggerConfigPort);

  app.setGlobalPrefix(appConfig.globalPrefix);

  const config = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerConfig.path, app, document);

  await app.listen(appConfig.port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${appConfig.port}/${appConfig.globalPrefix}`,
  );
  Logger.log(
    `🚀 Swagger UI is running on: http://localhost:${appConfig.port}/${swaggerConfig.path}`,
  );
  Logger.log(
    `🚀 Swagger JSON is available at: http://localhost:${appConfig.port}/${swaggerConfig.path}-json`,
  );
}
bootstrap();
