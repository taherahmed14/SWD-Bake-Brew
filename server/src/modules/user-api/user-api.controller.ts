import { Controller, Get, Post, Body, Patch, Param, Res, UploadedFiles, UseGuards  } from '@nestjs/common';
import { UserApiService } from './user-api.service';
import { 
  CreateCartDto, 
  CreateShippingDtlDto,
  CreatePaymentDto } from './dto/create-user-api.dto';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('user-api')
export class UserApiController {
  constructor(private readonly userApiService: UserApiService) {}

  @Get('/product')
  @UseGuards(AuthGuard('jwt'))
  getProducts() {
    return this.userApiService.getProducts();
  }

  @Get('/product/:id')
  getProductById(@Param('id') id: string, @Res({ passthrough: true }) response: Response) {
    return this.userApiService.getProductById(id, response);
  }

  @Post('/user-cart')
  @UseGuards(AuthGuard('jwt'))
  createUserCart(@Body() createCartDto: CreateCartDto) {
    return this.userApiService.createUserCart(createCartDto);
  }

  @Post('/user-shipping-address')
  @UseGuards(AuthGuard('jwt'))
  createUserShippingDtl(@Body() createShippingDtlDto: CreateShippingDtlDto) {
    return this.userApiService.createUserShippingDtl(createShippingDtlDto);
  }

  @Post('/user-payment')
  @UseGuards(AuthGuard('jwt'))
  createUserPaymentDtl(@Body() createPaymentDto: CreatePaymentDto) {
    return this.userApiService.createUserPaymentDtl(createPaymentDto);
  }

  @Get('/review-order/:cartId/:shippingId')
  getReviewOrderDetail(@Param('cartId') cartId: string, @Param('shippingId') shippingId: string) {
    return this.userApiService.getReviewOrderDetail(cartId, shippingId);
  }
}
