import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { NotFound } from '@aws-sdk/client-s3';
import { ReaderInterface } from '../operator/operator.interface';

@Injectable()
export class AccountOneReader implements ReaderInterface {
  constructor(
    @InjectRepository(User)
    private accountRepository: Repository<User>,
  ) {}

  async read(data: any) {
    const targetAccount = await this.accountRepository.findOne(data);

    if (!targetAccount) {
      throw new NotFoundException({
        status: 404,
        message: '해당 어드민 계정을 조회할 수 없습니다.',
      });
    }
    return targetAccount;
  }
}
