import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  providers: [AppService],
})
export class AppModule {}
