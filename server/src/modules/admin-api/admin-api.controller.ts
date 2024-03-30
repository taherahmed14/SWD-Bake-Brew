import { Controller, Post, HttpCode, HttpStatus, Body, Param, ParseUUIDPipe, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';
import { AdminApiService } from './admin-api.service';
import { UserLoginDto, CreateUserAccountDto } from './dto/admin-api.dto';

// @UseGuards(JwtAuthGuard)
@Controller('admin-api')
export class AdminApiController {
  constructor(private readonly adminApiService: AdminApiService) {}

  @Post('/login')
  async userLogIn(@Body() userLoginDto: UserLoginDto) {
    return this.adminApiService.userLogIn(userLoginDto);
  }

  @Post('/create-account')
  async createUserAccount(@Body() createUserAccountDto: CreateUserAccountDto) {
    return this.adminApiService.createUserAccount(createUserAccountDto);
  }

  @Get('/get-warranty')
  @UseGuards(AuthGuard('jwt'))
  async getAllWarrantyRecords(@Query() params: any) {
    console.log("Params: ", params);
    const { pageSize, page } = params;
    return this.adminApiService.getAllWarrantyRecords(pageSize, page);
  }

}
