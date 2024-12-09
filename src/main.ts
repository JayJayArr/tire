import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = Logger;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
  logger.debug(process.env.DEVELOPMENT, 'DEVELOPMENT ENVIRONMENT');
  logger.debug(await app.getUrl(), 'Application running on');
}
bootstrap();
