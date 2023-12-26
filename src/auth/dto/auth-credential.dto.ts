import {
  IsEmail,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsNumber()
  Id: number;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  nickname: string;

  @IsString()
  profilePicture: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
