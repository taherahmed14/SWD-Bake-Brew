import { Module } from '@nestjs/common';
import { UserApiService } from './user-api.service';
import { UserApiController } from './user-api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NextronProducts, UserCart, UserShippingDetail } from '../../entities/user-api.entity';
import { DatabaseFileService } from '../database-file/database-file.service';
import ProductImage from 'src/entities/product_image.entity';
import ProductWarranty from 'src/entities/warranty.entity';

@Module({
  controllers: [UserApiController],
  providers: [UserApiService, DatabaseFileService],
  imports: [
    TypeOrmModule.forFeature([NextronProducts, UserCart, UserShippingDetail, ProductImage, ProductWarranty])
  ]
})
export class UserApiModule {}
