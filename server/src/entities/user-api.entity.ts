import {
    Entity,
    Column,
    BaseEntity,
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import ProductImage from './product_image.entity';

@Entity({ name: 'tblProduct' })
export class Products extends BaseEntity {
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
    weight: string;

    @Column({ default: null })
    dimensions: string;
}

@Entity({ name: 'tblCart' })
export class UserCart extends BaseEntity {
    @Column()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: null, type: 'uuid' })
    user_id: string;

    @Column({ default: [] })
    products: string;

    @Column({ default: false })
    paymentStatus: boolean;

    @CreateDateColumn()
    createdat: Date;
  
    @UpdateDateColumn()
    updatedat: Date;
}

@Entity({ name: 'tblShippingDtl' })
export class UserShippingDetail extends BaseEntity {
    @Column()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: null, type: 'uuid' })
    user_id: string;

    @Column({ default: null })
    name: string;

    @Column({ type: 'bigint', default: null })
    phNumber: number;

    @Column({ default: null })
    address: string;

    @Column({ default: null })
    county: string;

    @Column({ default: null })
    eir: string;

    @CreateDateColumn()
    createdat: Date;
  
    @UpdateDateColumn()
    updatedat: Date;
}

@Entity({ name: 'tblPaymentDtl' })
export class UserPaymentDetail extends BaseEntity {
    @Column()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: null, type: 'uuid' })
    user_id: string;

    @Column({ default: null })
    cardname: string;

    @Column({ type: 'bigint', default: null })
    cardnumber: number;

    @Column({ default: null })
    cvv: number;

    @CreateDateColumn()
    createdat: Date;
  
    @UpdateDateColumn()
    updatedat: Date;
}
