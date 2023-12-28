// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { UserRepository } from './user.repository';
// import { User } from './user.entity';
// import { InjectRepository } from '@nestjs/typeorm';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     @InjectRepository(UserRepository) private userReposiroty: UserRepository,
//   ) {
//     super({
//       secretOrKey: 'Secret1234',
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     });
//   }

//   async validate(payload) {
//     const { email } = payload;
//     const user: User = await this.userReposiroty.findOneBy({ email });

//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
// }
