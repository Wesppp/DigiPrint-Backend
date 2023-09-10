import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrintModule } from './modules/print/print.module';
import { TypeormService } from "./config";
import { configuration } from './config';
import { AuthModule } from "./modules/auth";
import { UserModule } from "./modules/user";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configuration }),
    TypeOrmModule.forRootAsync({ useClass: TypeormService }),
    PrintModule,
    AuthModule,
    UserModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    TypeormService,
  ],
})
export class AppModule {
}
