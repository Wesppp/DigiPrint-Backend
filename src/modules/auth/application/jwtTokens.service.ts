import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";

import * as process from "process";

import { IJwtPayload } from "../core/interfaces";
import { IGeneratedJwts } from "../core/interfaces";
import { TokenGenerationException } from "../core/custom-errors";
import { IGeneratedJWTAccess } from "../core/interfaces/generatedJWTAccess.interface";

@Injectable()
export class JwtTokensService {
  constructor(private readonly jwtService: JwtService) {
  }

  public async generateTokens({ id, email }: IJwtPayload): Promise<IGeneratedJwts> {
    try {
      const payload: IJwtPayload = { id, email };
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      });
      const refreshToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '1y',
      });

      return { accessToken, refreshToken };
    } catch (err) {
      throw new TokenGenerationException();
    }
  }

  public async generateAccessTokenByRefresh({ id, email }: IJwtPayload): Promise<IGeneratedJWTAccess> {
    try {
      const payload: IJwtPayload = { id, email };
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      });

      return { accessToken };
    } catch (err) {
      throw new TokenGenerationException();
    }
  }
}
