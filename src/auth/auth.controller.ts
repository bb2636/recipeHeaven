import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Response,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user-decorator';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
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

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Get('/:id')
  getBoardById(@Param('userId') userId: number): Promise<User> {
    return this.authService.getUserById(userId);
  }

  @Patch('/:userId/status')
  updateBoardStatus(
    @Param('userId', ParseIntPipe) userId: number,
    @Body('nickname') nickname: string,
  ) {
    return this.authService.updateUser(userId, nickname);
  }

  @Post('/authTest')
  @UseGuards(AuthGuard())
  authTest(@GetUser() user: User) {
    console.log('user', user);
  }
}
