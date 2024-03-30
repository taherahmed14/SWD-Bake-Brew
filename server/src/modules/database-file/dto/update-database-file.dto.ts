import { PartialType } from '@nestjs/mapped-types';
import { CreateDatabaseFileDto } from './create-database-file.dto';

export class UpdateDatabaseFileDto extends PartialType(CreateDatabaseFileDto) {}
