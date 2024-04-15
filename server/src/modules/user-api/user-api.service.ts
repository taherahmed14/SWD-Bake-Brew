import { Injectable, Res } from '@nestjs/common';
import { CreateCartDto, 
  CreateShippingDtlDto, 
  CreatePaymentDto } from './dto/create-user-api.dto';
import { InjectRepository, InjectDataSource, InjectConnection } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Products, UserCart, UserPaymentDetail, UserShippingDetail } from '../../entities/user-api.entity';
import { DatabaseFileService } from '../database-file/database-file.service';
import ProductImage from 'src/entities/product_image.entity';
import { InternalServerErrorException } from '@nestjs/common';
var jsSHA = require("jssha");

@Injectable()
export class UserApiService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    @InjectRepository(UserCart)
    private readonly userCartRepository: Repository<UserCart>,
    @InjectRepository(UserShippingDetail)
    private readonly userShippingRepository: Repository<UserShippingDetail>,
    private readonly databaseFilesService: DatabaseFileService,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
    @InjectRepository(UserPaymentDetail)
    private readonly userPaymentRepository: Repository<UserPaymentDetail>,    
  ){}

  async getProducts() {
    // let allProducts = await this.productRepository.find();
    // let allImages = await this.productImageRepository.find();
    let allProducts = await this.dataSource.query(
      `select distinct on (t2.product_id) t2.product_id, t2."data", t2.filename, t1."offerPrice" as "discountPrice",
      t1.title, t1."price" as "price", t1."availableStatus", t1.discount, t1.rating, t1.category  
      from "tblProduct" t1 
      join product_image t2 on t1.id = t2.product_id::uuid
      where t1."availableStatus" = true 
      order by t2.product_id, t2.filename asc`
    );
    console.log("products: ", allProducts);    

    return {
      status: 200,
      products: allProducts
    }
  }

  

  async getProductById(id: string, response: any) {
    let product = await this.productRepository.findOne({
      where: { id }
    });
    console.log("Product data: ", product);
    
    const productImage = await this.productImageRepository.find({
      where: { product_id: id }
    })
    console.log("Product Image: ", productImage);

    let decodeImages = [];

    productImage.forEach((product) => {
      const buffer = Buffer.from(product.data);
      const base64String = buffer.toString('base64');
      decodeImages.push(base64String);
    });

    return {
      status: 200,
      product,
      images: decodeImages
    }
  }

  async createUserCart(data: CreateCartDto) {
    try {
      let newUserCart = new UserCart();
      newUserCart.user_id = data.user_id;
      newUserCart.products = JSON.stringify(data.products);
  
      let userCartData = await this.userCartRepository.save(newUserCart);
  
      return {
        status: 200,
        message: 'Cart created',
        cartId: userCartData.id
      }
    }
    catch(error) {
      return {
        status: 500,
        message: [new InternalServerErrorException(error)['response']['name']],
        error: 'Bad Request',
      }
    }
  }

  async createUserShippingDtl(data: CreateShippingDtlDto) {
    try {
      if(data.phNumber.toString().length < 10 || data.phNumber.toString().length > 10) {
        return {
          status: 400,
          message: 'Invalid phone number'
        }
      }
  
      let userShippingDetail = new UserShippingDetail();
      userShippingDetail.name = data.name;
      userShippingDetail.phNumber = data.phNumber;
      userShippingDetail.address = data.address;
      userShippingDetail.county = data.county;
      userShippingDetail.eir = data.eir;
      userShippingDetail.user_id = data.user_id;
  
      let userShippingData = await this.userShippingRepository.save(userShippingDetail);
  
      return {
        status: 200,
        message: 'Shipping address added',
        shippingId: userShippingData.id
      }
    }
    catch(error) {
      return {
        status: 500,
        message: [new InternalServerErrorException(error)['response']['name']],
        error: 'Bad Request',
      }
    }
  }

  async createUserPaymentDtl(data: CreatePaymentDto) {
    try {
      if(data.cardnumber.toString().length < 16 || data.cardnumber.toString().length > 16) {
        return {
          status: 400,
          message: 'Invalid card number'
        }
      }

      if(data.cvv.toString().length < 3 || data.cvv.toString().length > 3) {
        return {
          status: 400,
          message: 'Invalid CVV'
        }
      }
  
      let userPaymentDetail = new UserPaymentDetail();
      userPaymentDetail.user_id = data.user_id;
      userPaymentDetail.cardname = data.cardname;
      userPaymentDetail.cardnumber = data.cardnumber;
      userPaymentDetail.cvv = data.cvv;
  
      let userPaymentData = await this.userPaymentRepository.save(userPaymentDetail);
  
      return {
        status: 200,
        message: 'Payment successfull',
        paymentId: userPaymentData.id
      }
    }
    catch(error) {
      return {
        status: 500,
        message: [new InternalServerErrorException(error)['response']['name']],
        error: 'Bad Request',
      }
    }
  }

  async getReviewOrderDetail(cartId, shippingId) {
    let shippingDetail = await this.userShippingRepository.findOne({
      where: { id: shippingId }
    });

    let cartDetail = await this.userCartRepository.findOne({
      where: { id: cartId }
    });

    let productIds = JSON.parse(cartDetail.products);
    let cartProducts = [];
    
    for(let i = 0; i < productIds.length; i++) {
      let productData = await this.productRepository.findOne({
        where: { id: productIds[i].productId }
      });
      cartProducts.push({
        product: productData,
        quantity: productIds[i].quantity,
        price: productIds[i].price
      });
    }
    
    return {
      shippingDetail,
      cartDetail: cartProducts
    }
  }
} 
