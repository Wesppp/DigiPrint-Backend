import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserController } from "./controllers";
import { UserService } from "./application";
import { UserRepository } from "./infrastructure/repositories";
import { UserEntity } from "./infrastructure/entities";

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ]
})
export class UserModule {}
