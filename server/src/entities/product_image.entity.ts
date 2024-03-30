import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class ProductImage {
  @PrimaryGeneratedColumn("uuid")
  public id: number;

  @Column({ default: null })
  product_id: string;
 
  @Column()
  filename: string;
 
  @Column({
    type: 'bytea',
  })
  data: Uint8Array;
}
 
export default ProductImage;