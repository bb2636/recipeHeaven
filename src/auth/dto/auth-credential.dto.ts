import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  nickname: string;

  @IsString()
  profilePicture: string;

  password: string;
}
