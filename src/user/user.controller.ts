import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './user.service';
import { AuthCredentialsDto } from './dto/user-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return this.authService.signup(authCredentialsDto);
  }
  @Post('/singin')
  singIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.singIn(authCredentialsDto);
  }
}
