import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserAccountDto, UserVerifyDto, UserLoginDto, VerifyOTPDto, CreateAdminAccountDto } from './dto/create-auth.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  async userRegister(@Body() createUserAccountDto: CreateUserAccountDto) {
    return this.authService.userRegister(createUserAccountDto);
  }

  @Post("/verify")
  async verifyUser(@Body() userVerifyDto: UserVerifyDto) {
    return this.authService.verifyUser(userVerifyDto);
  }

  @Post('/login')
  async userLogIn(
    @Body() userLoginDto: UserLoginDto
    ) {
    return this.authService.userLogIn(userLoginDto);
  }

  @Post('/otp')
  async verifyOTP(@Body() verifyOTPDto: VerifyOTPDto) {
    return this.authService.verifyOTP(verifyOTPDto);
  }

  @Post("/admin-register")
  @UseGuards(AuthGuard('jwt'))
  async adminRegister(@Body() createAdminAccountDto: CreateAdminAccountDto) {
    return this.authService.adminRegister(createAdminAccountDto);
  }
}
