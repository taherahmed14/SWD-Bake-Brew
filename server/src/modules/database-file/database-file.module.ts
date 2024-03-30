import { Module } from '@nestjs/common';
import { DatabaseFileService } from './database-file.service';
import DatabaseFileController from './database-file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProductImage from 'src/entities/product_image.entity';
import ProductWarranty from 'src/entities/warranty.entity';

@Module({
  controllers: [DatabaseFileController],
  providers: [DatabaseFileService],
  imports: [
    TypeOrmModule.forFeature([ProductImage, ProductWarranty])
  ]
})
export class DatabaseFileModule {}
