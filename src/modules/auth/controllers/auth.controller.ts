import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards
} from "@nestjs/common";

import { Response } from "express";

import { IGeneratedJwts } from "../core/interfaces";
import { AuthService } from "../application";
import { PhoneDto, VerifyOptDto, CreateUserDto, LoginRequestDto } from "./dto";
import { UserGuard } from "../../../core/guards";
import { DigiPrintRequest } from "../../../core/types";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  public async register(
    @Body() registerBody: CreateUserDto,
    @Res() res: Response) {
    const registerResult: IGeneratedJwts = await this.authService.register(registerBody);

    if (!registerResult) {
      throw new HttpException('An error occurred during registration.', HttpStatus.BAD_REQUEST);
    }

    res.cookie('refreshToken', registerResult.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return res.send({ accessToken: registerResult.accessToken });
  }

  @Post('login')
  public async login(
    @Body() loginRequest: LoginRequestDto,
    @Res() res: Response
  ) {
    const loginResult: IGeneratedJwts = await this.authService.login(loginRequest);

    if (!loginResult) {
      throw new HttpException('An error occurred during login.', HttpStatus.BAD_REQUEST);
    }

    res.cookie('refreshToken', loginResult.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return res.send({ accessToken: loginResult.accessToken });
  }

  @Post('sendOpt')
  @UseGuards(UserGuard)
  public async sendOpt(
    @Body() sendOptReq: PhoneDto,
    @Req() req: DigiPrintRequest
  ): Promise<{ msg: string }> {
    return await this.authService.sendOpt(sendOptReq.phoneNumber, req.user);
  }

  @Post('verifyOpt')
  @UseGuards(UserGuard)
  public async verifyOpt(
    @Body() verifyOptReq: VerifyOptDto,
    @Req() req: DigiPrintRequest
  ): Promise<{ msg: string }> {
    const { phoneNumber, opt } = verifyOptReq;

    return await this.authService.verifyOpt(phoneNumber, opt, req.user);
  }

  @Post('resendOpt')
  public async resendOpt(
    @Body() resendOptReq: PhoneDto
  ): Promise<{ msg: string }> {
    return this.authService.resendOpt(resendOptReq.phoneNumber);
  }
}
