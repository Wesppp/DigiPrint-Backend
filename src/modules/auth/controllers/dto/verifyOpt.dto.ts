import { IsNotEmpty, IsString, MaxLength } from "class-validator";

import { PhoneDto } from "./phone.dto";

export class VerifyOptDto extends PhoneDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(6)
  opt: string;
}
