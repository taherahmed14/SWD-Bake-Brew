import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ProductImage from 'src/entities/product_image.entity';
import { Readable } from 'stream';
import ProductWarranty from 'src/entities/warranty.entity';

@Injectable()
export class DatabaseFileService {
  constructor(
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
    @InjectRepository(ProductWarranty)
    private ProductWarrantyRepository: Repository<ProductWarranty>,
  ) {}
 
  async uploadDatabaseFile(id: any, dataBuffer: Buffer, filename: string) {
    const newFile = await this.productImageRepository.create({
      filename,
      data: dataBuffer,
      product_id: id
    })
    await this.productImageRepository.save(newFile);
    return newFile;
  }
 
  async getFileById(fileId: number, response: any) {
    const file = await this.productImageRepository.findOne({
      where: { id: fileId }
    });
    if (!file) {
      throw new NotFoundException();
    }

    const stream = Readable.from(file.data);
 
    response.set({
      'Content-Disposition': `inline; filename="${file.filename}"`,
      'Content-Type': 'image'
    })
 
    return new StreamableFile(stream);
  }

  async uploadWarrantyFiles(id: any, file: string, dataBuffer: Buffer, filename: string) {
    if(file === "serialNoData") {
      await this.ProductWarrantyRepository.update(
        {id},
        {serialNoFilename: filename, serialNoData: dataBuffer}
      )
    }
    if(file === "productData") {
      await this.ProductWarrantyRepository.update(
        {id},
        {productFilename: filename, productData: dataBuffer}
      )
    }
    if(file === "invoiceData") {
      await this.ProductWarrantyRepository.update(
        {id},
        {invoiceFilename: filename, invoiceData: dataBuffer}
      )
    }

    return;
  }
}
