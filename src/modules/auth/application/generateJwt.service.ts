import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";

import { IJwtPayload } from "../core/interfaces";
import { IGeneratedJwts } from "../core/interfaces";
import { TokenGenerationException } from "../core/custom-errors";

@Injectable()
export class GenerateJwtService {
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
}
