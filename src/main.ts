import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import * as fs from 'fs-sync';
import { AppModule } from './app.module';
import { getEnv } from './config';

async function bootstrap() {
  if (getEnv('IS_LOCAL')) {
    const app = await NestFactory.create(AppModule);
    this.configureCors(app);
    await app.listen(3000);
  } else {
    const certificate = fs.read(getEnv('pathToCert'));
    const privateKey = fs.read(getEnv('pathToKey'));
    const credentials = { key: privateKey, cert: certificate };
    const app = await NestFactory.create(AppModule, {
      httpsOptions: credentials,
    });
    this.configureCors(app);
    await app.listen(3000);
  }
}

function configureCors(app: INestApplication): void {
  const whitelist = [
    'https://accounts.timos.design',
    'https://newsroom.timos.design',
    'https://timos.design',
    'https://portfolio.timos.design',
    'https://icons.timos.design',
    'https://components.timos.design',
    'http://localhost:8080',
    'http://localhost:3000',
  ];
  const corsOptions = {
    origin(origin: string, callback: Function) {
      if (whitelist.includes(origin) || origin === undefined) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
  app.use(cors(corsOptions));
}

bootstrap();
