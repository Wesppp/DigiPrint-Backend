import { Module } from '@nestjs/common';
import { PrintController } from './controllers';

@Module({
  controllers: [PrintController]
})
export class PrintModule {}
