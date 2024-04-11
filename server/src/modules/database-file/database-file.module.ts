import { Module } from '@nestjs/common';
import { DatabaseFileService } from './database-file.service';
import DatabaseFileController from './database-file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductImage from 'src/entities/product_image.entity';
import ProductWarranty from 'src/entities/warranty.entity';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  controllers: [DatabaseFileController],
  providers: [DatabaseFileService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
  ],
  imports: [
    TypeOrmModule.forFeature([ProductImage, ProductWarranty])
  ]
})
export class DatabaseFileModule {}
