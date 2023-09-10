import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { plainToClass } from "class-transformer";

import { UserRepository } from "../infrastructure/repositories";
import { CreateUserDto } from "../../auth/controllers/dto";
import { UserDto } from "../controllers/dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {
  }

  public async createUser(createUser: CreateUserDto): Promise<CreateUserDto> {
    const user = await this.userRepository.findUserBy({ email: createUser.email });

    if (user) {
      throw new HttpException(
        'A user with such an email already exists.',
        HttpStatus.FORBIDDEN,
      );
    }

    return plainToClass(
      CreateUserDto,
      await this.userRepository.createUser(createUser),
    );
  }

  public async updateUser(userId: number, updateFields: Partial<UserDto>): Promise<void> {
    const { phoneNumber, email } = updateFields;
    const existingUser= await this.userRepository.findUserBy({ id: userId });

    if (!existingUser) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    // do the email & phoneNumber checks correctly
    if (email && email !== existingUser.email) {
      const existingEmail = await this.userRepository.findUserBy({ email });
      if (existingEmail) {
        throw new HttpException('A user with such an email already exists.', HttpStatus.FORBIDDEN);
      }
    }
    if (phoneNumber && phoneNumber !== existingUser.phoneNumber) {
      const existingPhoneNumber = await this.userRepository.findUserBy({ phoneNumber });
      if (existingPhoneNumber) {
        throw new HttpException('Such a phone number already exists.', HttpStatus.FORBIDDEN);
      }
    }

    await this.userRepository.updateUser(userId, updateFields);
  }
}
