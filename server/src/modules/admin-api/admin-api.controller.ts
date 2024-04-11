import { Controller, Post, HttpCode, HttpStatus, UseInterceptors, Body, Param, UploadedFile, ParseUUIDPipe, UseGuards, Get, Query, Patch, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminApiService } from './admin-api.service';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/admin-api.dto';

@Controller('admin-api')
export class AdminApiController {
  constructor(private readonly adminApiService: AdminApiService) {}

  @Patch('/delete-product/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteProduct(@Param('id') id: string) {
    return this.adminApiService.deleteProduct(id);
  }

  @Post('/product')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  async createProductImage(
    @Body() createProductDto, 
    @UploadedFile() file: Express.Multer.File) {
    console.log("File: ", file);
    console.log("File buffer: ", file.buffer);
    console.log("Data: ", createProductDto);
    
    return this.adminApiService.createProduct(createProductDto, file.buffer, file.originalname);
  }

  @Get('/get-admins')
  @UseGuards(AuthGuard('jwt'))
  async getAdmins() {
    return this.adminApiService.getAdmins();
  }

  @Delete('/delete-admin/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteAdmin(@Param('id') id: string) {
    return this.adminApiService.deleteAdmin(id);
  }
}
