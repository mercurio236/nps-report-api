import { NestFactory } from '@nestjs/core';
import { EnvService } from './env/env.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const envService = app.get(EnvService);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const port = envService.get('PORT');

  await app.listen(port);
}
bootstrap();
