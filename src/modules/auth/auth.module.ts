import { Module } from '@nestjs/common';
import { PassportModule } from "@nestjs/passport";

import { AuthService } from './application/auth.service';
import { AuthController } from './controllers/auth.controller';
import { GenerateJwtService } from "./application/generateJwt.service";
import { UserModule } from "../user";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [AuthService, GenerateJwtService],
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({}),
  ],
})
export class AuthModule {}
