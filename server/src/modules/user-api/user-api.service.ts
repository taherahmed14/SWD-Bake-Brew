import { Injectable, Res } from '@nestjs/common';
import { CreateCartDto, 
  CreateProductDto, 
  CreateProductImageDto, 
  CreateShippingDtlDto, 
  CreateProductWarrantyDto, 
  CreatePaymentDto } from './dto/create-user-api.dto';
import { InjectRepository, InjectDataSource, InjectConnection } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { NextronProducts, UserCart, UserShippingDetail } from '../../entities/user-api.entity';
import { DatabaseFileService } from '../database-file/database-file.service';
import ProductImage from 'src/entities/product_image.entity';
import ProductWarranty from 'src/entities/warranty.entity';
import { sendEmail } from 'src/mail/mail.service';
var jsSHA = require("jssha");
const PayU = require("payu-websdk");

@Injectable()
export class UserApiService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(NextronProducts)
    private readonly productRepository: Repository<NextronProducts>,
    @InjectRepository(UserCart)
    private readonly userCartRepository: Repository<UserCart>,
    @InjectRepository(UserShippingDetail)
    private readonly userShippingRepository: Repository<UserShippingDetail>,
    private readonly databaseFilesService: DatabaseFileService,
    @InjectRepository(ProductImage)
    private productImageRepository: Repository<ProductImage>,
    @InjectRepository(ProductWarranty)
    private ProductWarrantyRepository: Repository<ProductWarranty>,
  ){}

  payuClient = new PayU({
    key: process.env.payumoneyMerchantKey,
    salt: process.env.payumoneyMerchantSalt,
  }, "TEST");

  async createProduct(data: CreateProductDto) {
    let newProduct = new NextronProducts();
    newProduct.title = data?.title;
    newProduct.description = data?.description;
    newProduct.price = data?.price;
    newProduct.quantity = data?.quantity;
    newProduct.availableStatus = data?.availableStatus;
    newProduct.discount = data?.discount;
    newProduct.rating = data?.rating;
    newProduct.category = data?.category;
    newProduct.tag = data?.tag;
    newProduct.warranty = data?.warranty;
    newProduct.color = data?.color;
    newProduct.productType = data?.productType;
    newProduct.modelId = data?.modelId;
    newProduct.offers = data?.offers;
    newProduct.brand = data?.brand;
    newProduct.generatorCompatibility = data?.generatorCompatibility;
    newProduct.displayType = data?.displayType;
    newProduct.indicatorType = data?.indicatorType;
    newProduct.surgeIndicator = data?.surgeIndicator;
    newProduct.masterSwitch = data?.masterSwitch;
    newProduct.mountType = data?.mountType;
    newProduct.underVoltProtection = data?.underVoltProtection;
    newProduct.overVoltProtection = data?.overVoltProtection;
    newProduct.surgeProtection = data?.surgeProtection;
    newProduct.overloadProtection = data?.overloadProtection;
    newProduct.minimumInputPower = data?.minimumInputPower;
    newProduct.maximumInputPower = data?.maximumInputPower;
    newProduct.minimumOutputPower = data?.minimumOutputPower;
    newProduct.maximumOutputPower = data?.maximumOutputPower;
    newProduct.weight = data?.weight;
    newProduct.coveredInWarranty = data?.coveredInWarranty;
    newProduct.notCoveredInWarranty = data?.notCoveredInWarranty;
    newProduct.warrantyServiceType = data?.warrantyServiceType;
    newProduct.dimensions = data?.dimensions;
    newProduct.spikeSuppressor = data?.spikeSuppressor;
    newProduct.outputVoltageCorrection = data?.outputVoltageCorrection;
    newProduct.tripDelay = data?.tripDelay;
    newProduct.circuitBreaker = data?.circuitBreaker;
    newProduct.maxPowerHandlingCapacity = data?.maxPowerHandlingCapacity;
    newProduct.maxSpikeCurrent = data?.maxSpikeCurrent;
    newProduct.accuracy = data?.accuracy;
    newProduct.powerRating = data?.powerRating;
    newProduct.automaticReset = data?.automaticReset;
    newProduct.discountPrice = data?.discountPrice;

    let productData = await this.productRepository.save(newProduct); 

    return {
      status: 200,
      product: productData
    }
  }

  async getProducts() {
    // let allProducts = await this.productRepository.find();
    // let allImages = await this.productImageRepository.find();

    

    let allProducts = await this.dataSource.query(
      `select distinct on (t2.product_id) t2.product_id, t2."data", t2.filename, t1."offerPrice" as "discountPrice",
      t1.title, t1."MRPprice" as "price", t1."availableStatus", t1.discount, t1.rating, t1.material, t1."mountType", t1.category  
      from "tblProduct" t1 
      join product_image t2 on t1.id = t2.product_id::uuid order by t2.product_id, t2.filename asc`
    );
    console.log("products: ", allProducts);    

    return {
      status: 200,
      products: allProducts
    }
  }

  async createProductImage(data: CreateProductImageDto, dataBuffer: any, filename: string) { 
    await this.databaseFilesService.uploadDatabaseFile(data.product_id, dataBuffer, filename);

    return {
      status: 200,
      message: "Product Image successfully added!"
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
    let newUserCart = new UserCart();
    newUserCart.email = data.email;
    newUserCart.products = JSON.stringify(data.products);

    let userCartData = await this.userCartRepository.save(newUserCart);

    return {
      status: 200,
      message: 'Cart created',
      cartId: userCartData.id
    }
  }
  
  async updatePaymentStatus(id: string) {
    await this.userCartRepository.update(
      { id },
      { paymentStatus: true }
    );

    //Need to update product quantity
    //Need to have a payment table with amount paid, cart Id, paid on date, user detail, payment mode
    //Need to send Order successfull Email

    // const data = ``;

    // let emailData = {
    //   email: data.email,
    //   name: data.name,
    //   subject: "Nextron - Order Placed",
    //   message: "Your warranty claim has been applied successfully. Our team will review the documents and update you in next 48 hours."
    // }
    // await sendEmail(emailData);
    
    return {
      status: 200,
      message: 'Payment updated'
    }
  }

  async createUserShippingDtl(data: CreateShippingDtlDto) {
    if(data.phNumber.toString().length < 10 || data.phNumber.toString().length > 10) {
      return {
        status: 400,
        message: 'Invalid phone number'
      }
    }

    if(data.zipcode.toString().length < 6 || data.zipcode.toString().length > 6) {
      return {
        status: 400,
        message: 'Invalid Zipcode'
      }
    }

    let userShippingDetail = new UserShippingDetail();
    userShippingDetail.fullName = data.fullName;
    userShippingDetail.email = data.email;
    userShippingDetail.phNumber = data.phNumber;
    userShippingDetail.street = data.street;
    userShippingDetail.landmark = data.landmark;
    userShippingDetail.state = data.state;
    userShippingDetail.zipcode = data.zipcode;

    let userShippingData = await this.userShippingRepository.save(userShippingDetail);

    return {
      status: 200,
      message: 'Shipping address added',
      shippingId: userShippingData.id
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

  async createProductWarranty(data: CreateProductWarrantyDto, files: any) {
    if(data.contactNumber.toString().length < 10 || data.contactNumber.toString().length > 10) {
      return {
        status: 400,
        message: 'Invalid contact number'
      }
    }
    console.log("Files: ", files);
    console.log("Data: ",  data);

    try {
      let warrantyData = new ProductWarranty();
      warrantyData.email = data.email;
      warrantyData.name = data.name;
      warrantyData.serialNumber = data.serialNumber;
      warrantyData.contactNumber = data.contactNumber;
      warrantyData.modelNumber = data.modelNumber;
      warrantyData.state = data.state;
      warrantyData.productFeedback = data.productFeedback;
  
      let savedData = await this.ProductWarrantyRepository.save(warrantyData);
      console.log("Saved data: ", savedData);
      
      await this.databaseFilesService.uploadWarrantyFiles(savedData.id, "serialNoData", files[0].buffer, files[0].originalname);
      await this.databaseFilesService.uploadWarrantyFiles(savedData.id, "productData", files[1].buffer, files[1].originalname);
      await this.databaseFilesService.uploadWarrantyFiles(savedData.id, "invoiceData", files[2].buffer, files[2].originalname);

      let emailData = {
        email: data.email,
        name: data.name,
        subject: "Nextron - Warranty Claim",
        message: "Your warranty claim has been applied successfully. Our team will review the documents and update you in next 48 hours."
      }
      await sendEmail(emailData);
  
      return {
        status: 200,
        message: 'Product Warranty claim saved successfully'
      }
    }
    catch(err) {
      console.log("Err: ", err);
    }
  }

  async payUMoneyPayment(data: CreatePaymentDto) {
    if (!data.txnid || !data.amount || !data.productinfo   
      || !data.firstname || !data.email) {
        return {
          status: 400,
          message: "Mandatory fields missing"
        }
    } else {
          var pd = data;
          var hashString = process.env.payumoneyMerchantKey // Merchant Key 
                  + '|' + pd.txnid 
                  + '|' + pd.amount + '|' + pd.productinfo + '|'          
                  + pd.firstname + '|' + pd.email + '|' 
                  + '||||||||||' 
                  + process.env.payumoneyMerchantSalt // Your salt value
          var sha = new jsSHA('SHA-512', "TEXT");
          sha.update(hashString)
          var hash = sha.getHash("HEX");

          console.log("Merchant Key: ", process.env.payumoneyMerchantKey);
          console.log("PayU URL: ", process.env.payuURL);
          console.log("Pd: ", pd);
          console.log("Hash: ", hash);
      
          return {
            status: 200,
            data: pd,
            hash,
            payuURL: process.env.payuURL,
            merchantKey: process.env.payumoneyMerchantKey
          }
    }
  }
} 
