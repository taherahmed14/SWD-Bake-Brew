import { IsString, IsEmail, IsNotEmpty, IsBoolean, IsIn, MinLength, Matches, IsNumber, minLength, MaxLength } from 'class-validator';
import { UsersRole, Flags } from 'src/entities/user.entity'; 

export class UserLoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{16,}$/, 
    { message: 'Password too weak. Password should be 16 characters long including numbers, special characters, lowercase and uppercase letters.' })
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(["super_admin", "admin", "customer"])
    role: UsersRole;
}

export class CreateUserAccountDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{16,}$/, 
    { message: 'Password too weak. Password should be 16 characters long including numbers, special characters, lowercase and uppercase letters.' })
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(["super_admin", "admin", "customer"])
    role: UsersRole;
}

export class UserVerifyDto {
    @IsNotEmpty()
    @IsString()
    token: string;
  
    @IsNotEmpty()
    @IsString()
    record: string;
}

export class VerifyOTPDto {
    @IsNotEmpty()
    @IsNumber()
    otp: number;

    @IsNotEmpty()
    @IsString()
    id: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(["super_admin", "admin", "customer"])
    role: UsersRole;
}

export class CreateAdminAccountDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(["super_admin", "admin", "customer"])
    role: UsersRole;
}
