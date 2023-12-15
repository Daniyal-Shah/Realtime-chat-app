import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // To Enable CORS
  app.enableCors();

  // Start Server
  await app.listen(3001);
}
bootstrap();
