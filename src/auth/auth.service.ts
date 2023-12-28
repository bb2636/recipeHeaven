import {
  Injectable,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import * as qs from 'qs';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as jwt from 'jsonwebtoken';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

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
    await this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(authLoginDto: AuthLoginDto): Promise<{ accessToken: string }> {
    const { email } = authLoginDto;
    const user = await this.userRepository.findOneBy({ email });

    if (user && email) {
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }

  async updateUser(id: number, nickname: string): Promise<User> {
    const user = await this.getUserById(id);

    user.nickname = nickname;
    await this.userRepository.save(user);

    return user;
  }

  async getUserById(Id: number): Promise<User> {
    const found = await this.userRepository.findOneBy({ Id });
    console.log(Id);
    if (!found) {
      throw new NotFoundException(`ID가 ${Id}인 유저를 찾을 수 없습니다.`);
    }

    return found;
  }

  async getUserByEmail(email: string): Promise<User> {
    const found = await this.userRepository.findOneBy({ email });

    // if (!found) {
    //   throw new NotFoundException(
    //     `email이 ${email}인 유저를 찾을 수 없습니다.`,
    //   );
    // }

    return found;
  }

  async login(param: { code: string; domain: string }): Promise<any> {
    const { code, domain } = param;
    const kakaoKey = 'f0f5c0502b3bb5ec7080c7b64a6d18ce';
    const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token';

    const newToken = await axios.post(
      kakaoTokenUrl,
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

    console.log('newToken', newToken);

    const accessToken = newToken.data.access_token;
    const refreshToken = newToken.data.refresh_token;

    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    const user = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // console.log('user', user);

    const userData = {
      Id: user.data.id,
      nickname: user.data.kakao_account.profile.nickname,
      email: user.data.kakao_account.email,
      profilePicture: user.data.properties.profile_image,
      // password: user.data.kakao_account.password,
    };

    // console.log(userData);

    const checkUser = await this.getUserByEmail(userData.email);
    // console.log('checkUser', checkUser);

    const signUpUser = await this.userRepository.createUser({
      // Id: userData.Id,
      nickname: userData.nickname,
      email: userData.email,
      profilePicture: userData.profilePicture,
      // password: userData.password,
    });
    // console.log('signUpUser', signUpUser);

    // if (!checkUser) {
    //   await this.signUp(userData);
    // } else if (checkUser !== null) {
    //   // Handle case where userexists but is "soft deleted"
    //   await this.restoreUser(checkUser.Id);
    //   checkUser = await this.findUserByKakaoId(userData.email);
    // }

    const jwtToken = this.generateJWTToken(checkUser);
    console.log('jwtToken', jwtToken);
    return jwtToken;
  }

  // async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
  //   this.userRepository.createUser(authCredentialsDto);
  // }

  private async findUserByKakaoId(Id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { Id } });
  }

  // // Create new user
  // private async createUser(userData: any): Promise<User> {
  //   return await this.userRepository.createUser(userData);
  // }

  // Restore user (soft delete revert)
  private async restoreUser(Id: number): Promise<void> {
    await this.userRepository.update({ Id }, null);
  }

  // Generate JWT token
  private generateJWTToken(user: User): string {
    const payload = { userId: user.Id }; // You can include more data in the payload if needed
    const secretKey = 'Secret1234';
    const options: jwt.SignOptions = { expiresIn: 60 * 60 };

    return jwt.sign(payload, secretKey, options);
  }
}
