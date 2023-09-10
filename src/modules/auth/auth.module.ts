import { Module } from '@nestjs/common';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import * as process from "process";

import { AuthService } from "./application";
import { AuthController } from "./controllers";
import { GenerateJwtService } from "./application";
import { UserModule } from "../user";
import { AccessTokenStrategy } from "./core/strategies";

@Module({
  providers: [
    AuthService,
    GenerateJwtService,
    AccessTokenStrategy,
  ],
  controllers: [AuthController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt-access' }),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET
    }),
    UserModule,
    PassportModule,
  ],
})
export class AuthModule {}
