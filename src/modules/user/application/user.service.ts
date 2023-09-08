import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { plainToClass } from "class-transformer";

import { UserRepository } from "../infrastructure/repositories";
import { CreateUserDto } from "../../auth/controllers/dto";

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
}
