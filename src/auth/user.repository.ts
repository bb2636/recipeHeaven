import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export class UserRepository extends Repository<User> {
  constructor(@InjectRepository(User) private dataSource: DataSource) {
    super(User, dataSource.manager);
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    console.log('엔터');
    const { email, nickname, profilePicture } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(email, salt);

    const user = this.create({
      email,
      nickname,
      // password: hashedPassword,
      profilePicture,
    });

    console.log('user1', user);
    try {
      console.log('user22', user);

      return await this.save(user);
    } catch (error) {
      console.log('user333', user);

      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Duplicate error');
      } else {
        throw new InternalServerErrorException();
      } // 유효성 검사 중 문제 발생 -> 500에러 처리방법
    }
  }
}
