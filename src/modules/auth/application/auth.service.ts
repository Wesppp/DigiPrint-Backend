import { Injectable } from "@nestjs/common";

import * as bcrypt from 'bcryptjs';

import { UserService } from "../../user/application";
import { GenerateJwtService } from "./generateJwt.service";
import { CreateUserDto } from "../controllers/dto";
import { IGeneratedJwts } from "../core/interfaces/generatedJwts.interface";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
              private readonly generateJwtService: GenerateJwtService) {
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
}
