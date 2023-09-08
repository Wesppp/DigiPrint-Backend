import { Injectable } from "@nestjs/common";

import * as bcrypt from 'bcryptjs';
import { Twilio } from "twilio";
import * as process from "process";

import { UserService } from "../../user/application";
import { GenerateJwtService } from "./generateJwt.service";
import { CreateUserDto } from "../controllers/dto";
import { IGeneratedJwts } from "../core/interfaces/generatedJwts.interface";

@Injectable()
export class AuthService {
  private twilioClient: Twilio;

  constructor(private readonly userService: UserService,
              private readonly generateJwtService: GenerateJwtService) {
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

  public async sendOpt(phone: string): Promise<{ msg: string }> {
    let msg: string = '';

    await this.twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFICATION_SERVICE_SID)
      .verifications.create({ to: phone, channel: 'sms' })
      .then((verification) => (msg = verification.status));

    return { msg };
  }

  public async verifyOpt(phone: string, code: string): Promise<{ msg: string }> {
    let msg: string = '';

    await this.twilioClient.verify.v2
      .services(process.env.TWILIO_VERIFICATION_SERVICE_SID)
      .verificationChecks.create({ to: phone, code })
      .then((verification) => (msg = verification.status));

    return { msg };
  }
}
