import { IsNotEmpty, IsString } from 'class-validator';

export default class SigninDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
