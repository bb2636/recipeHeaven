import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Response,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthCredentialsDto } from './dto/auth-credential.dto';
// import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login/kakao')
  async login(@Body() body: any, @Response() res): Promise<any> {
    try {
      const { code, domain } = body;

      if (!code || !domain) {
        throw new BadRequestException('카카오 정보가 없습니다.');
      }
      const kakao = await this.authService.kakaoLogin({ code, domain });

      if (!kakao.id) {
        throw new BadRequestException('카카오 정보가 없습니다.');
      }

      res.send({
        user: kakao,
        message: 'success',
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
