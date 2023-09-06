import { Column, Entity } from "typeorm";
import { IsEmail } from "class-validator";

import { GlobalEntity } from "@app/postgresql";

@Entity('users')
export class UserEntity extends GlobalEntity {
  @IsEmail()
  @Column({ length: 50 })
  email: string;

  @Column({ length: 60 })
  password: string;

  @Column({ length: 16, nullable: true })
  phoneNumber: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  gender: string;

  @Column({ type: 'date' })
  birthDate: Date;
}
