import { Injectable } from '@nestjs/common';
import { JwtService } from "@nestjs/jwt";

import { IJwtPayload } from "../core/interfaces/jwtPayload.interface";
import { IGeneratedJwts } from "../core/interfaces/generatedJwts.interface";
import { TokenGenerationException } from "../core/custom-errors/customErrors.error";

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
        expiresIn: '2d',
      });

      return { accessToken, refreshToken, id, email };
    } catch (err) {
      throw new TokenGenerationException();
    }
  }
}
