import { HttpException, HttpStatus } from "@nestjs/common";

export class TokenGenerationException extends HttpException {
  constructor() {
    super('User Token Generation error.', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
