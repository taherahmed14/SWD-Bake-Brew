import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ProductImage from 'src/entities/product_image.entity';
import { Readable } from 'stream';

@Injectable()
export class DatabaseFileService {
  constructor(
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>
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
}
