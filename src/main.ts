import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { AppModule } from './app.module';

config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:8080',
      'https://newsroom.timos.design',
      'https://portfolio.timos.design',
      'https://timos.design'
    ],
  });
  await app.listen(3000);
}
bootstrap();
