import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
  }

  export class CreateUserAccountDto {
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    middlename: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    confirmPassword: string;
  
    @IsNotEmpty()
    @IsString()
    mobile: string;
  }