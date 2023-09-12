import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import { Request } from 'express';
import { Strategy } from "passport-jwt";
import { IJwtPayload } from "../interfaces";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      refreshSecret: process.env.JWT_REFRESH_SECRET,
      jwtFromRequest: (req) => req.cookies.refreshToken,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  public validate(req: Request, payload: IJwtPayload) {
    return payload;
  }
}
