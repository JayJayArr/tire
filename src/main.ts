import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const logger = Logger;
  // logger.log('Environment: ', process.env);

  const app = await NestFactory.create(AppModule, {
    logger: process.env.Development === 'true' ? ['log'] : ['debug', 'verbose'],
  });
  app.setGlobalPrefix('/api/v1');
  app.enableCors();
  app.use(helmet());
  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 3000);
  logger.debug(process.env.DEVELOPMENT, 'DEVELOPMENT ENVIRONMENT');
  logger.debug(await app.getUrl(), 'Application running on');
}
bootstrap();
