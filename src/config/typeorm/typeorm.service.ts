import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { TypeormConfig } from './typeorm-config.type';
import { UserEntity } from "../../modules/user/infrastructure/entities";

@Injectable()
export class TypeormService {
  constructor(private readonly configService: ConfigService<TypeormConfig>) {
  }

  public createTypeOrmOptions(
    connectionName?: string,
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const { host, db, password, port, username, synchronize, logging } =
      this.configService.get('typeorm');
    return {
      database: db,
      host,
      password,
      port,
      type: 'postgres',
      username,
      entities: [
        UserEntity
      ],
      synchronize,
      logging,
    };
  }
}
