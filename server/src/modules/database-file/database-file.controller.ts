import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  StreamableFile,
  Res,
  ParseIntPipe,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { DatabaseFileService } from './database-file.service';
import { Response } from 'express';

@Controller('database-file')
@UseInterceptors(ClassSerializerInterceptor)
export default class DatabaseFileController {
  constructor(
    private readonly databaseFilesService: DatabaseFileService
  ) {}
 
  @Get(':id')
  getDatabaseFileById(@Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) response: Response) {
    return this.databaseFilesService.getFileById(id, response);
 
    // const stream = Readable.from(file.data);
 
    // response.set({
    //   'Content-Disposition': `inline; filename="${file.filename}"`,
    //   'Content-Type': 'image'
    // })
 
    // return new StreamableFile(stream);
  }

}
