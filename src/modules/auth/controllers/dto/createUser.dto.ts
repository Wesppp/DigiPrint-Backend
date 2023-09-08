import {
  IsDate,
  IsNotEmpty,
  IsNumber, IsOptional,
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
