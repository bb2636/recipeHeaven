import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'abc', //sql password 기입
  database: 'board_app',
  entities: [], //유효성 검사 항목
  synchronize: true,
};
