import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'PUT', 'PATCH', 'DELETE', 'GET']
  })

  // app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT || 4200;

  await app.listen(PORT);
}
bootstrap();
