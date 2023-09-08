import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class LoginRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  password: string;
}
