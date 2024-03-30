import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToOne
} from 'typeorm';
import ProductImage from './product_image.entity';

@Entity({ name: 'tblProduct' })
export class NextronProducts extends BaseEntity {
    @Column()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: null })
    title: string;

    @Column({ default: null })
    description: string;

    @Column({ default: null })
    price: number;

    @Column({ type: 'decimal', default: null })
    MRPprice: number;

    @Column({ type: 'decimal', default: null })
    offerPrice: number;

    @Column({ default: null })
    quantity: number;

    @Column({ default: true, nullable: false })
    availableStatus?: boolean;

    @Column({ default: null })
    discount: number;

    @Column({ default: null })
    category: string;

    @Column({ default: null })
    rating: number;

    @Column({ default: null })
    tag: string;

    @Column({ default: null })
    warranty: string;

    @Column({ default: null })
    color: string;

    @Column({ default: null })
    productType: string;

    @Column({ default: null })
    modelId: string;

    @Column({ default: null })
    offers: string;

    @Column({ default: 'Nextron' })
    brand: string;

    @Column({ default: null })
    generatorCompatibility: string;

    @Column({ default: null })
    material: string;

    @Column({ default: null })
    displayType: string;

    @Column({ default: null })
    indicatorType: string;

    @Column({ default: null })
    surgeIndicator: string;

    @Column({ default: null })
    masterSwitch: string;

    @Column({ default: null })
    mountType: string;

    @Column({ default: null })
    underVoltProtection: string;

    @Column({ default: null })
    overVoltProtection: string;

    @Column({ default: null })
    surgeProtection: string;

    @Column({ default: null })
    overloadProtection: string;

    @Column({ default: null })
    minimumInputPower: string;

    @Column({ default: null })
    maximumInputPower: string;

    @Column({ default: null })
    minimumOutputPower: string;

    @Column({ default: null })
    maximumOutputPower: string;

    @Column({ default: null })
    weight: string;

    @Column({ default: null })
    coveredInWarranty: string;

    @Column({ default: null })
    notCoveredInWarranty: string;

    @Column({ default: null })
    warrantyServiceType: string;

    @Column({ default: null })
    dimensions: string;

    @Column({ default: false, nullable: false })
    spikeSuppressor: boolean;

    @Column({ default: false, nullable: false })
    outputVoltageCorrection: boolean;

    @Column({ default: false, nullable: false })
    tripDelay: boolean;

    @Column({ default: false, nullable: false })
    circuitBreaker: boolean;

    @Column({ default: null })
    maxPowerHandlingCapacity: string;

    @Column({ default: null })
    maxSpikeCurrent: string;

    @Column({ default: null })
    accuracy: string;

    @Column({ default: null })
    powerRating: string;

    @Column({ default: false, nullable: false })
    automaticReset: string;

    @Column({ default: null })
    discountPrice: number;

    // @Column({ default: [] })
    // productImages: string;

    // @JoinColumn({ name: 'product image' })
    // @OneToOne(
    //     () => ProductImage,
    //     {
    //     nullable: true
    //     }
    // )
    // productImages?: ProductImage;
    
    // @Column({ nullable: true })
    // productImagesId?: number;
}

@Entity({ name: 'tblCart' })
export class UserCart extends BaseEntity {
    @Column()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: null })
    email: string;

    @Column({ default: [] })
    products: string;

    @Column({ default: false })
    paymentStatus: boolean;
}

@Entity({ name: 'tblShippingDtl' })
export class UserShippingDetail extends BaseEntity {
    @Column()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: null })
    fullName: string;

    @Column({ default: null })
    email: string;

    @Column({ type: 'bigint', default: null })
    phNumber: number;

    @Column({ default: null })
    street: string;

    @Column({ default: null })
    landmark: string;

    @Column({ default: null })
    city: string;

    @Column({ default: null })
    state: string;

    @Column({ default: null })
    zipcode: number;
}
