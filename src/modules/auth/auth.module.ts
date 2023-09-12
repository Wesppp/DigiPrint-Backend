import { Module } from '@nestjs/common';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import * as process from "process";

import { AuthService } from "./application";
import { AuthController } from "./controllers";
import { JwtTokensService } from "./application";
import { UserModule } from "../user";
import { AccessTokenStrategy } from "./core/strategies";

@Module({
  providers: [
    AuthService,
    JwtTokensService,
    AccessTokenStrategy,
  ],
  controllers: [AuthController],
  imports: [
    PassportModule.register({}),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET
    }),
    UserModule,
    PassportModule,
  ],
})
export class AuthModule {}
