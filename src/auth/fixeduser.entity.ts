import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { InternalServerErrorException } from '@nestjs/common';

@Entity({ name: 'accounts' })
export class Account extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        throw new InternalServerErrorException({
          status: 500,
          message: '비밀번호 해쉬화 실패',
        });
      }
    }
  }
}
