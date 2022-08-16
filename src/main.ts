import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import * as path from "path";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const appService = app.get(AppService);

  /**
   * Process file
   */
  const filename = process.env.FILENAME;
  const filepath = path.join(__dirname, "..", "data", filename);
  appService.processFile(filepath);
  
  await app.close();
}
bootstrap();