import { Body, Controller, Post } from "@nestjs/common";

import { CreateUserDto } from "./dto";
import { IGeneratedJwts } from "../core/interfaces/generatedJwts.interface";
import { AuthService } from "../application";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  public async register(@Body() registerReq: CreateUserDto): Promise<IGeneratedJwts> {
    return await this.authService.register(registerReq);
  }
}
