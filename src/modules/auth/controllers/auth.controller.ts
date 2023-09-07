import { Body, Controller, Post } from "@nestjs/common";

import { IGeneratedJwts } from "../core/interfaces/generatedJwts.interface";
import { AuthService } from "../application";
import { PhoneDto, VerifyOptDto, CreateUserDto } from "./dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  public async register(@Body() registerReq: CreateUserDto): Promise<IGeneratedJwts> {
    return await this.authService.register(registerReq);
  }

  @Post('sendOpt')
  public async sendOpt(
    @Body() sendOptReq: PhoneDto
  ): Promise<{ msg: string }> {
    return await this.authService.sendOpt(sendOptReq.phone);
  }

  @Post('verifyOpt')
  public async verifyopt(
    @Body() verifyOptReq: VerifyOptDto
  ): Promise<{ msg: string }> {
    const { phone, opt } = verifyOptReq;

    return await this.authService.verifyOpt(phone, opt);
  }
}
