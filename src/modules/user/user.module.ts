import { Module } from '@nestjs/common';

import { UserController } from "./controllers";
import { UserService } from './application/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
