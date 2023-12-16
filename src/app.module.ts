import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ormConfig } from './orm.config';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useFactory: ormConfig }), UserModule],
})
export class AppModule {}
