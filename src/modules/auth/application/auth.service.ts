import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import * as bcrypt from 'bcryptjs';
import { Twilio } from "twilio";
import * as process from "process";

import { UserService } from "../../user/application";
import { GenerateJwtService } from "./generateJwt.service";
import { CreateUserDto, LoginRequestDto } from "../controllers/dto";
import { IGeneratedJwts } from "../core/interfaces";
import { IJwtPayload } from "../core/interfaces";
import { EPhoneVerificationMsges } from "../core/enums/phoneVerificationMsges.enum";
import { UserRepository } from "../../user/infrastructure/repositories";

@Injectable()
export class AuthService {
  private twilioClient: Twilio;

  constructor(private readonly userService: UserService,
              private readonly generateJwtService: GenerateJwtService,
              private readonly userRepository: UserRepository) {
    this.twilioClient = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  public async register(registerReq: CreateUserDto): Promise<IGeneratedJwts> {
    const hashedPassword = await bcrypt.hash(registerReq.password, 7);
    const user: CreateUserDto = await this.userService.createUser({
      ...registerReq,
      password: hashedPassword,
    });

    return await this.generateJwtService.generateTokens({
      id: user.id,
      email: user.email,
    });
  }

  public async login(loginReq: LoginRequestDto): Promise<IGeneratedJwts> {
    const user = await this.userRepository.findUserBy({ email: loginReq.email });

    if (!user) {
      throw new HttpException('There is no user with this email.', HttpStatus.FORBIDDEN,);
    }

    const passwordEquals = await bcrypt.compare(loginReq.password, user.password);

    if (!passwordEquals) {
      throw new HttpException('Passwords don`t match.', HttpStatus.FORBIDDEN,);
    }

    return await this.generateJwtService.generateTokens({
      id: user.id,
      email: user.email,
    });
  }

  public async sendOpt(phone: string, payload: IJwtPayload): Promise<{ msg: string }> {
    await this.userService.updateUser(payload.id, { phoneNumber: phone });

    return this.resendOpt(phone);
  }

  public async resendOpt(phone: string): Promise<{ msg: string }> {
    let msg: string = '';

    await this.twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFICATION_SERVICE_SID)
      .verifications.create({ to: phone, channel: 'sms' })
      .then((verification) => (msg = verification.status));

    return { msg };
  }

  public async verifyOpt(phone: string, code: string, payload: IJwtPayload): Promise<{ msg: string }> {
    let msg: string = '';

    await this.twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFICATION_SERVICE_SID)
      .verificationChecks.create({ to: phone, code })
      .then((verification) => (msg = verification.status));

    if (msg !== EPhoneVerificationMsges.APPROVED) {
      throw new HttpException(
        'The code was entered incorrectly.',
        HttpStatus.FORBIDDEN,
      );
    }

    await this.userService.updateUser(payload.id, { isPhoneConfirmed: true });

    return { msg };
  }
}
