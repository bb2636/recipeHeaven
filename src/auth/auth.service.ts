import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import * as qs from 'qs';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async kakaoLogin(param: { code: string; domain: string }): Promise<any> {
    const { code, domain } = param;
    const kakaoKey = 'f0f5c0502b3bb5ec7080c7b64a6d18ce';
    const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token';
    // const kakaoUserInfoUrl = 'https://kapi.kakao.com/v2/user/me';

    const body = {
      grant_type: 'authorization_code',
      client_id: kakaoKey,
      redirect_uri: `http://localhost:5173/oauth`,
      code,
    };
    // const headers = {
    //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    // };

    console.log(body);

    try {
      const response = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: kakaoKey,
          redirect_uri: `http://localhost:5173/oauth`,
          code,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      );

      console.log(response);

      if (response.status === 200) {
        console.log(`kakaoToken : ${JSON.stringify(response.data)}`);

        const headerUserInfo = {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          Authorization: 'Bearer' + response.data.accessToken,
        };
        console.log(`url : ${kakaoTokenUrl}`);
        console.log(`headers : ${JSON.stringify(headerUserInfo)}`);

        const kakaoUserInfo = await axios.get(
          'https://kapi.kakao.com/v2/user/me',
          {
            headers: {
              Authorization: `Bearer ${response.data.access_token}`,
            },
          },
        );

        console.log(`responseUserInfo.status : ${kakaoUserInfo.status}`);
        if (kakaoUserInfo.status === 200) {
          console.log(`kakaoUserInfo : ${JSON.stringify(kakaoUserInfo.data)}`);
          return kakaoUserInfo.data;
        } else {
          throw new UnauthorizedException();
        }
      } else {
        throw new UnauthorizedException();
      }
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    this.userRepository.createUser(authCredentialsDto);
  }

  async updateUser(id: number, nickname: string): Promise<User> {
    const user = await this.getUserById(id);

    user.nickname = nickname;
    await this.userRepository.save(user);

    return user;
  }

  async getUserById(Id: number): Promise<User> {
    const found = await this.userRepository.findOneBy({ Id });

    if (!found) {
      throw new NotFoundException(`ID가 ${Id}인 유저를 찾을 수 없습니다.`);
    }

    return found;
  }
}
