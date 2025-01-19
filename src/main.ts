import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { SwaggerConfigPort } from './app/domain/ports/swagger-config.port';
import { AppConfigPort } from './app/domain/ports/app-config.port';
import { AxiosErrorInterceptor } from './app/infrastructure/interceptors/axios.error.interceptor';
import { ErrorInterceptor } from './app/infrastructure/interceptors/error.interceptor';
import { MainModule } from './main.module';
import { MicroserviceTokenGetterPort } from './shared/microservice-guard/domain/microservice-token.getter.port';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  const appConfig = app.get(AppConfigPort);
  const swaggerConfig = app.get(SwaggerConfigPort);

  app.setGlobalPrefix(appConfig.globalPrefix);
  app.enableCors(appConfig.cors);

  // interceptors

  app.useGlobalInterceptors(
    app.get(AxiosErrorInterceptor),
    app.get(ClassSerializerInterceptor),
    app.get(ErrorInterceptor),
  );

  // swagger

  const config = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    // .addBearerAuth()
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'userToken',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'microserviceToken',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerConfig.path, app, document);

  // run

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

  // extra logs

  const microserviceTokenGetter = app.get(MicroserviceTokenGetterPort);
  const microserviceToken = await microserviceTokenGetter.get();

  Logger.warn(`🔐 microservice token : ${microserviceToken}`);
}
bootstrap();
