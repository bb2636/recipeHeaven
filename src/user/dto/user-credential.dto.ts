import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts english and number',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
