import { PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class GlobalEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;
}
