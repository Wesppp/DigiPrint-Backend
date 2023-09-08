import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class PhoneDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  phone: string;
}
