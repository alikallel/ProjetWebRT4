import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import {ValidationPipe} from "@nestjs/common";
import helmet from 'helmet';
import { RemovePasswordInterceptor } from './exclude-password.interceptor';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
    app.useGlobalInterceptors(new RemovePasswordInterceptor());

  /*app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  */
  app.use('/uploads', express.static('uploads'));
  app.use(helmet());


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
