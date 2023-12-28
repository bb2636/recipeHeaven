import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment-timezone';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { UpdaterInterface } from '../operator/operator.interface';

@Injectable()
export class AccountLastestUpdater implements UpdaterInterface {
  constructor(
    @InjectRepository(User)
    private accountRepository: Repository<User>,
  ) {}

  async update(ip: any, email: string) {
    const targetAccount = await this.accountRepository.findOneBy({ email });

    if (!targetAccount) {
      throw new NotFoundException({
        status: 404,
        message: '업데이트할 계정을 찾지 못했습니다.',
      });
    }

    return true;
  }
}
