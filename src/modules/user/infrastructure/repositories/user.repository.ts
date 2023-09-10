import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsRelations, FindOptionsWhere, Repository } from "typeorm";

import { UserEntity } from "../entities";
import { CreateUserDto } from "../../../auth/controllers/dto";
import { UserDto } from "../../controllers/dto";

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {
  }

  public async createUser(body: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create({ ...body });

    await this.userRepository.save(newUser);

    return newUser;
  }

  public async updateUser(id: number, user: Partial<UserDto>): Promise<void> {
    await this.userRepository.update({ id }, user);
  }

  public async findUserBy(
    obj: FindOptionsWhere<UserEntity>,
    relations: FindOptionsRelations<UserEntity> = null,
  ): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: obj,
      relations,
    });
  }
}
