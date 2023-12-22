import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { Category } from 'src/category/category.entity';
// import { Board } from 'src/boards/board.entity';
import { Recipe } from 'src/recipe/recipe.entity';

// export const typeORMConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: 'qkseltqnfdl1',
//   database: 'board_app',
//   entities: [Board, User],
//   synchronize: true,
// };

function ormConfig(): TypeOrmModuleOptions {
  const commonConf = {
    SYNCRONIZE: true,
    ENTITIES: [__dirname + '/domain=/*{.ts,.js}'],
    MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
    MIGRATIONS_RUN: true,
  };

  return {
    type: 'mysql',
    database: 'recipeheaven',
    host: 'recipeheaven.cj4yc4iiculk.ap-northeast-2.rds.amazonaws.com',
    port: Number(3306),
    username: 'admin',
    password: 'qkseltqnfdl1',
    logging: true,
    synchronize: commonConf.SYNCRONIZE,
    entities: [Recipe, User, Category],
    migrations: commonConf.MIGRATIONS,
    migrationsRun: commonConf.MIGRATIONS_RUN,
  };
}

export { ormConfig };
