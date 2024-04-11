import { Module } from '@nestjs/common';
import { UserApiService } from './user-api.service';
import { UserApiController } from './user-api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products, UserCart, UserShippingDetail } from '../../entities/user-api.entity';
import { DatabaseFileService } from '../database-file/database-file.service';
import ProductImage from 'src/entities/product_image.entity';
import ProductWarranty from 'src/entities/warranty.entity';
import { UserPaymentDetail } from '../../entities/user-api.entity';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  controllers: [UserApiController],
  providers: [UserApiService, DatabaseFileService, 
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
  ],
  imports: [
    TypeOrmModule.forFeature([
      Products, 
      UserCart, 
      UserShippingDetail, 
      ProductImage, 
      ProductWarranty,
      UserPaymentDetail
    ])
  ]
})
export class UserApiModule {}
