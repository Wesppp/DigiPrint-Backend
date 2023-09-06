import {
  IsDate,
  IsNotEmpty,
  IsNumber, IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength
} from "class-validator";

export class CreateUserDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsPhoneNumber()
  @MaxLength(20)
  phoneNumber: string;

  @IsString()
  @MaxLength(100)
  firstname: string;

  @IsString()
  @MaxLength(100)
  lastname: string;

  @IsString()
  @MaxLength(15)
  gender: string;

  @IsDate()
  birthDate: Date;
}
