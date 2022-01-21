import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { CookieAuthGuard } from "./auth/auth.guard";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: true,
    credentials: true, // gerek olmayada bilir
  });
  app.use(cookieParser());
  app.useGlobalGuards(new CookieAuthGuard());

  await app.listen(8081);
}

bootstrap();
