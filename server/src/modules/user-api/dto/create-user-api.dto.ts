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

export class CreateProductDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsNumber()
    discountPrice: number;

    @IsNumber()
    quantity: number;

    @IsBoolean()
    availableStatus: boolean;

    @IsNumber()
    discount: number;

    @IsNumber()
    rating: number;

    @IsString()
    category: string;

    @IsString()
    tag: string;

    @IsString()
    warranty: string;

    @IsString()
    color: string;

    @IsString()
    productType: string;

    @IsString()
    modelId: string;

    @IsString()
    offers: string;

    @IsString()
    brand: string;

    @IsString()
    generatorCompatibility: string;

    @IsString()
    material: string;

    @IsString()
    displayType: string;

    @IsString()
    indicatorType: string;

    @IsString()
    surgeIndicator: string;

    @IsString()
    masterSwitch: string;

    @IsString()
    mountType: string;

    @IsString()
    underVoltProtection: string;

    @IsString()
    overVoltProtection: string;

    @IsString()
    surgeProtection: string;

    @IsString()
    overloadProtection: string;

    @IsString()
    minimumInputPower: string;

    @IsString()
    maximumInputPower: string;

    @IsString()
    minimumOutputPower: string;

    @IsString()
    maximumOutputPower: string;

    @IsString()
    weight: string;

    @IsString()
    coveredInWarranty: string;

    @IsString()
    notCoveredInWarranty: string;

    @IsString()
    warrantyServiceType: string;

    @IsString()
    dimensions: string;

    @IsBoolean()
    spikeSuppressor: boolean;

    @IsBoolean()
    outputVoltageCorrection: boolean;

    @IsBoolean()
    tripDelay: boolean;

    @IsBoolean()
    circuitBreaker: boolean;

    @IsString()
    maxPowerHandlingCapacity: string;

    @IsString()
    maxSpikeCurrent: string;

    @IsString()
    accuracy: string;

    @IsString()
    powerRating: string;

    @IsString()
    automaticReset: string;
}

export class CreateCartDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

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
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    // @Min(9000000000)
    // @Max(10000000000)
    phNumber: number;

    @IsString()
    @IsNotEmpty()
    street: string;

    @IsString()
    @IsNotEmpty()
    landmark: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsNumber()
    @IsNotEmpty()
    // @MaxLength(6)
    // @MinLength(6)
    zipcode: number;
}

export class CreateProductImageDto {
    @IsUUID()
    product_id: string;
}

export class CreateProductWarrantyDto {
    @IsString()
    product_id: string;

    @IsString()
    @IsNotEmpty()
    email: string;
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    serialNumber: string;

    @IsString()
    @IsNotEmpty()
    contactNumber: string;

    @IsString()
    @IsNotEmpty()
    modelNumber: string;

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsString()
    @IsNotEmpty()
    productFeedback: string;
}

export class CreatePaymentDto {
    @IsString()
    @IsNotEmpty()
    txnid: string;

    @IsNumber()
    @IsNotEmpty()
    amount: Float64Array;

    @IsString()
    @IsNotEmpty()
    productinfo: string;

    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}


