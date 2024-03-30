import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Res, UploadedFiles  } from '@nestjs/common';
import { UserApiService } from './user-api.service';
import { CreateProductDto, 
  CreateCartDto, 
  CreateShippingDtlDto, 
  CreateProductImageDto, 
  CreateProductWarrantyDto,
  CreatePaymentDto } from './dto/create-user-api.dto';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Response } from 'express';

@Controller('user-api')
export class UserApiController {
  constructor(private readonly userApiService: UserApiService) {}

  @Post('/product')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.userApiService.createProduct(createProductDto);
  }

  @Post('/product/image')
  @UseInterceptors(FileInterceptor('file'))
  async createProductImage(@Body() createProductImageDto: CreateProductImageDto, @UploadedFile() file: Express.Multer.File) {
    console.log("File: ", file);
    console.log("File buffer: ", file.buffer);
    console.log("Data: ", createProductImageDto);
    
    return this.userApiService.createProductImage(createProductImageDto, file.buffer, file.originalname);
  }

  @Get('/product')
  getProducts() {
    return this.userApiService.getProducts();
  }

  @Get('/product/:id')
  getProductById(@Param('id') id: string, @Res({ passthrough: true }) response: Response) {
    return this.userApiService.getProductById(id, response);
  }

  @Post('/user-cart')
  createUserCart(@Body() createCartDto: CreateCartDto) {
    return this.userApiService.createUserCart(createCartDto);
  }

  @Patch('/update-payment/:id')
  updatePaymentStatus(@Param('id') id: string) {
    return this.userApiService.updatePaymentStatus(id);
  }

  @Post('/user-shipping-address')
  createUserShippingDtl(@Body() createShippingDtlDto: CreateShippingDtlDto) {
    return this.userApiService.createUserShippingDtl(createShippingDtlDto);
  }

  @Get('/review-order/:cartId/:shippingId')
  getReviewOrderDetail(@Param('cartId') cartId: string, @Param('shippingId') shippingId: string) {
    return this.userApiService.getReviewOrderDetail(cartId, shippingId);
  }

  @Post('/warranty-claim')
  @UseInterceptors(AnyFilesInterceptor())
  // @UseInterceptors(FileInterceptor('fileProduct'))
  // @UseInterceptors(FileInterceptor('fileInvoice'))
  createProductWarranty(
      @Body() createProductWarrantyDto: CreateProductWarrantyDto,
      @UploadedFiles() files: Array<Express.Multer.File>) {
        console.log("File: ", files);
        
    return this.userApiService.createProductWarranty(createProductWarrantyDto, files);
  }

  @Post('/payment/payumoney')
  payUMoneyPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.userApiService.payUMoneyPayment(createPaymentDto);
  }
}
