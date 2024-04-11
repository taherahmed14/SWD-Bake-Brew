import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UsersRole } from 'src/entities/user.entity';
import { Products } from 'src/entities/user-api.entity';
import { DatabaseFileService } from '../database-file/database-file.service';
import { CreateProductDto } from './dto/admin-api.dto';
import { EncryptionService } from 'src/common/encryption/encryption';

@Injectable()
export class AdminApiService {

    constructor(
        @InjectDataSource() private dataSource: DataSource,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(Products)
        private readonly productsRepository: Repository<Products>,
        private readonly databaseFilesService: DatabaseFileService,
        private readonly encryptionService: EncryptionService,
    ) {}

    async deleteProduct(id : string) {
        try {
            await this. productsRepository.update(
                { id },
                { availableStatus: false }
            );

            return {
                status: 200,
                message: "Product removed successfully"
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

    async createProduct(data: CreateProductDto, dataBuffer: any, filename: string) {
        try {
            let newProduct = new Products();
            newProduct.title = data?.title;
            newProduct.price = +data?.price;
            newProduct.quantity = +data?.quantity;
            newProduct.discount = +data?.discount;
            newProduct.category = data?.category;
        
            let productData = await this.productsRepository.save(newProduct); 

            const imageStatus = await this.createProductImage(productData.id, dataBuffer, filename);
        
            if(imageStatus) {
                return {
                  status: 200,
                  message: "Product saved successfully"
                }
            }
            else {
                await this.productsRepository.delete({ id:productData.id  })
                return {
                    status: 400,
                    message: "Failed to save product"
                }
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

    async createProductImage(data: string, dataBuffer: any, filename: string) { 
        try {
            const imageres = await this.databaseFilesService.uploadDatabaseFile(data, dataBuffer, filename);
            console.log("Image res::", imageres);
            
            if(imageres?.id) 
                return true;
            else 
                return false;
        }
        catch(error) {
            return {
                status: 500,
                message: [new InternalServerErrorException(error)['response']['name']],
                error: 'Bad Request',
            }
        }
    }

    async getAdmins() {
        try {
            let allAdmin = await this.dataSource.query(
                `select id, firstname as "name", nameiv, nametag,
                email, emailiv, emailtag,
                createdat, verification as "verified"
                from tbluser t where t."role" = 'admin' order by t.createdat desc`
            );
    
            for(let i = 0; i < allAdmin.length; i++) {
                allAdmin[i].email = this.encryptionService.decrypt(
                  allAdmin[i].email, 
                  allAdmin[i].emailiv, 
                  allAdmin[i].emailtag
                );
    
                allAdmin[i].name = this.encryptionService.decrypt(
                    allAdmin[i].name, 
                    allAdmin[i].nameiv, 
                    allAdmin[i].nametag
                );

                allAdmin[i].role = "Admin";
            }
    
            return {
                status: 200,
                data: allAdmin
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

    async deleteAdmin(id: string) {
        try {
            await this.userRepository.delete({ id });

            return {
                status: 200,
                message: "User successfully deleted"
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
    
}
