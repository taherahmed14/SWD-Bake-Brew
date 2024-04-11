import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'PUT', 'PATCH', 'DELETE', 'GET']
  })

  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT || 4200;

  await app.listen(PORT);
}
bootstrap();
