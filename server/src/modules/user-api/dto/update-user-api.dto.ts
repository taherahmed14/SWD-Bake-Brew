import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-user-api.dto';

export class UpdateUserApiDto extends PartialType(CreateProductDto) {}
