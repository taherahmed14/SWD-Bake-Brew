import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
 
@Entity()
class ProductWarranty {
  @PrimaryGeneratedColumn("uuid")
  public id: number;

  @Column({ default: null })
  product_id: string;

  @Column({ default: null })
  email: string;

  @Column({ default: null })
  name: string;

  @Column({ default: null })
  serialNumber: string;

  @Column({ default: null })
  contactNumber: string;

  @Column({ default: null })
  modelNumber: string;

  @Column({ default: null })
  state: string;

  @Column({ default: null })
  productFeedback: string;
 
  @Column({ default: null })
  serialNoFilename: string;
 
  @Column({
    type: 'bytea',
    default: null
  })
  serialNoData: Uint8Array;

  @Column({ default: null })
  productFilename: string;
 
  @Column({
    type: 'bytea',
    default: null
  })
  productData: Uint8Array;

  @Column({ default: null })
  invoiceFilename: string;
 
  @Column({
    type: 'bytea',
    default: null
  })
  invoiceData: Uint8Array;

  @CreateDateColumn()
  createdat: Date;

  @UpdateDateColumn()
  updatedat: Date;
}
 
export default ProductWarranty;