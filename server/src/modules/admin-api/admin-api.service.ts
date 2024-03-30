import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserLoginDto, CreateUserAccountDto } from './dto/admin-api.dto';
import IJwtPayload from 'src/authentication/jwt-payload';
import { JwtService } from '@nestjs/jwt';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UsersRole } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthenticationService } from 'src/authentication/authentication.service';
import ProductWarranty from 'src/entities/warranty.entity';

@Injectable()
export class AdminApiService {

    constructor(
        @InjectDataSource() private dataSource: DataSource,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(ProductWarranty)
        private readonly warrantyRepository: Repository<ProductWarranty>,
        private readonly authenticationService: AuthenticationService,
    ) {}

    async userLogIn(userLoginDto: UserLoginDto) {
        const { email, password } = userLoginDto;
        
        try {
          let user = await this.userRepository.findOne({
            select: [
              'id',
              'email',
              'firstname',
              'lastname',
              'role',
              'password',
            ],
            where: { email: email, role: UsersRole.ADMIN },
          });
          
          if (user && (await user.validatePassword(password))) {            
            const payload: IJwtPayload = { email, role: 'admin' };
            // const jwtAccessToken = await this.jwtService.signAsync(payload);
            const jwtAccessToken = await this.authenticationService.generateToken(payload)

            let resuser = {
              id: user.id,
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname,
              role: user.role
            }

            return { statusCode: 200, jwtAccessToken, user: resuser };
          } else {
            return {
              statusCode: 400,
              message: ['Invalid Credentials'],
              error: 'Bad Request',
            };
          }
        } catch (error) {
          console.log(error);
          return {
            statusCode: 500,
            message: [new InternalServerErrorException(error)['response']['name']],
            error: 'Bad Request',
          };
        }
    }

    async createUserAccount(createUserAccountDto: CreateUserAccountDto) {

      //check for existing account with same email id
      let existingUser = await this.userRepository.find({
       where: { email: createUserAccountDto.email, role: UsersRole.ADMIN },
      });

      if(existingUser.length > 0) {
        return {
          status: 400,
          message: "The user with this email address already exists."
        }
      }
  
      //salt password
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(
        createUserAccountDto.password, salt
      );

      try {
        let newUser = new UserEntity();
        newUser.firstname = createUserAccountDto.firstname;
        newUser.middlename = createUserAccountDto?.middlename;
        newUser.lastname = createUserAccountDto.lastname;
        newUser.email = createUserAccountDto.email;
        newUser.mobile = createUserAccountDto.mobile;
        newUser.password = hashPassword;
        newUser.salt = salt;
        newUser.role = UsersRole.ADMIN;

        let user = await this.userRepository.save(newUser);
        console.log("User: ", user);

        //Notify Email

        return {
          status: 200,
          message: "User created successfully."
        }

      }
      catch(error) {
        return {
          statusCode: 500,
          message: [new InternalServerErrorException(error)['response']['name']],
          error: 'Bad Request',
        }
      }
    }

    async getAllWarrantyRecords(pageSize: string, page: string) {
      try {
        const limit = pageSize ? +pageSize : 5;
        const offset = +page > 0 ? (+page -1) * limit : 0;

        let record = await this.dataSource.query(`
        select * from product_warranty pw order by pw.createdat desc limit ${limit} offset ${offset}`);
        // console.log("Warranty records: ", record);
        return {
          status: 200,
          message: "Success",
          warranty: record
        }
      }
      catch(error) {
        return {
          statusCode: 500,
          message: [new InternalServerErrorException(error)['response']['name']],
          error: 'Bad Request',
        };
      }
    }
    
}
