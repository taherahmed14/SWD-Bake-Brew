import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    BaseEntity,
    Generated,
  } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  import { Exclude } from 'class-transformer';
  
  export enum Flags {
    N = 'N',
    Y = 'Y',
  }
  
  export enum UsersRole {
    CUSTOMER = 'customer',
    ADMIN = 'admin'
  }
  
  @Entity({ name: 'tbluser' })
  export class UserEntity extends BaseEntity {
  
    @Column()
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ default: null })
    email: string;
  
    @Column({ default: null })
    firstname: string;
  
    @Column({ default: null })
    middlename: string;
  
    @Column({ default: null })
    lastname: string;
  
    @Exclude()
    @Column({ nullable: true })
    password: string;
  
    @Exclude()
    @Column({ nullable: true })
    salt: string;
  
    @Column({ default: UsersRole.ADMIN })
    role: UsersRole;
  
    @CreateDateColumn()
    createdat: Date;
  
    @UpdateDateColumn()
    updatedat: Date;
  
    @Column({ default: null })
    mobile: string;
  
    async validatePassword(password: string): Promise<boolean> {
      const hashPassword = await bcrypt.compare(password, this.password);
      return hashPassword;
    }
  }
  