import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsBoolean,
    IsEmail,
    MaxLength,
    MinLength,
    Max,
    Min,
    IsInt,
    IsArray,
    IsUUID
} from 'class-validator';
import { isFloat64Array } from 'util/types';

export class CreateCartDto {
    @IsUUID()
    @IsNotEmpty()
    user_id: string;

    @IsArray()
    @IsNotEmpty()
    products: string; // Array of objects with product Id, quantity, price

    @IsNumber()
    @IsNotEmpty()
    totalPayment: number;

    @IsBoolean()
    paymentStatus: boolean;
}

export class CreateShippingDtlDto {
    @IsUUID()
    @IsNotEmpty()
    user_id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    phNumber: number;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    county: string;

    @IsString()
    @IsNotEmpty()
    eir: string;
}

export class CreatePaymentDto {
    @IsUUID()
    @IsNotEmpty()
    user_id: string;

    @IsNumber()
    @IsNotEmpty()
    cardnumber: number;

    @IsString()
    @IsNotEmpty()
    cardname: string;

    @IsNumber()
    @IsNotEmpty()
    cvv: number;
}


