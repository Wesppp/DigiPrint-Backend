import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrintModule } from './modules/print/print.module';
import { TypeormService } from './config/typeorm/typeorm.service';
import { configuration } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration }),
    TypeOrmModule.forRootAsync({ useClass: TypeormService }),
    PrintModule,
  ],
  controllers: [AppController],
  providers: [AppService, TypeormService],
})
export class AppModule {
}
