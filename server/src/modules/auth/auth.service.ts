import { Injectable } from '@nestjs/common';
import { CreateUserAccountDto, UserVerifyDto, UserLoginDto, VerifyOTPDto, CreateAdminAccountDto } from './dto/create-auth.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { AuthenticationService } from 'src/authentication/authentication.service';
import * as bcrypt from 'bcrypt';
import { Flags } from 'src/entities/user.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { EncryptionService } from 'src/common/encryption/encryption';
import { MailService } from 'src/mail/mail.service';
import { randomBytes, createHash } from 'crypto';
import IJwtPayload from 'src/authentication/jwt-payload';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authenticationService: AuthenticationService,
    private readonly encryptionService: EncryptionService,
    private readonly mailService: MailService
  ) {}

  generatePassword () {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 16;
    let password = "";

    for (let i = 0; i <= passwordLength; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber +1);
     }

     return password;
  }

  async userRegister(createUserAccountDto: CreateUserAccountDto) {
    //1. Validate input - name, email, password, role default - user.
    //2. Check if the email already exists - If no, proceed. If yes, return to log in page.
    //3. Hash password.
    //4. Encrypt data - name, email.
    //5. Save user record.
    //6. Send an verification link to user email, to verify user when he/she clicks the link.

    try {
      //check for existing account with same email id
      let existingEmail = await this.dataSource.query(
        `select firstname, nameiv, nametag, email, emailiv, emailtag from tbluser t where t."role" = '${createUserAccountDto.role}'`
      );
  
      for(let i = 0; i < existingEmail.length; i++) {
        let decryptName = this.encryptionService.decrypt(
          existingEmail[i].firstname,
          existingEmail[i].nameiv,
          existingEmail[i].nametag
        );
        console.log("User names::", decryptName);
        
        let decryptEmail = this.encryptionService.decrypt(
          existingEmail[i].email, 
          existingEmail[i].emailiv, 
          existingEmail[i].emailtag
        );
        
        if(decryptEmail === createUserAccountDto.email) {
          return {
            status: 400,
            message: "The user with this email address already exists."
          }
        }
      }

      //Encrypt sensitive data
      let encryptedName = this.encryptionService.encrypt(createUserAccountDto.name);
      let encryptedEmail = this.encryptionService.encrypt(createUserAccountDto.email);

      const token_1 = randomBytes(32).toString('hex'); 
      const token_2 = randomBytes(32).toString('hex'); 
      const token_3 = randomBytes(32).toString('hex');
      const hashToken = createHash('sha256').update(token_2).digest('hex');
      let link = `${process.env.UI_URL}/verify-user/${token_1}-${token_2}-${token_3}/${encryptedEmail.encryptedData}/${createUserAccountDto.role}`;

      //Hash password
      const salt = await bcrypt.genSalt();
      let hashPassword = await bcrypt.hash(
        createUserAccountDto.password, salt
      );

      this.mailService.sendEmail({
        name: createUserAccountDto.name,
        email: createUserAccountDto.email,
        subject: "Bake & Brew - Verify your account",
        message: `Thanks for registering with us. Please verify your account by clicking on the below link and enjoy some fresh bakes & brews.`,
        link
      });

      let newUser = new UserEntity();
      newUser.firstname = encryptedName.encryptedData;
      newUser.nameiv = encryptedName.iv;
      newUser.nametag = encryptedName.tag;
      newUser.email = encryptedEmail.encryptedData;
      newUser.emailiv = encryptedEmail.iv;
      newUser.emailtag = encryptedEmail.tag;
      newUser.password = hashPassword;
      newUser.salt = salt;
      newUser.role = createUserAccountDto.role;
      newUser.verification = Flags.N;
      newUser.verifytoken = hashToken;

      let user = await this.userRepository.save(newUser);
      // console.log("User: ", user);

      return {
        status: 200,
        message: "User created successfully."
      }

    }
    catch(error) {
      console.log(error);
      
      return {
        status: 500,
        message: [new InternalServerErrorException(error)['response']['name']],
        error: 'Bad Request',
      }
    }
  }

  async verifyUser(userVerifyDto: UserVerifyDto) {
    try{
      const hashToken = createHash('sha256').update(userVerifyDto.token).digest('hex');
      const verify = await this.userRepository.findOne({
        where : { email: userVerifyDto.record, verifytoken: hashToken }
      });

      if(verify.id) {
        //Update user verification to "Y"
        await this.userRepository.update(
          { id: verify.id },
          { verification : Flags.Y }
        );

        return {
          status: 200,
          message: "User verified successfully."
        }
      }
      else {
        return {
          status: 400,
          message: "User not found."
        }
      }
    }
    catch(error) {
      console.log(error);
      
      return {
        status: 500,
        message: [new InternalServerErrorException(error)['response']['name']],
        error: 'Bad Request',
      }
    }
  }

  async userLogIn(userLoginDto: UserLoginDto, response: Response) {
    const { email, password, role } = userLoginDto;
    
    try {
      //1. Fetch all user data as per created date in ascending order
      //2. Decrypt each email address and compare with the login email.
      //3. If email matches, decrypt the name and fetch ID and verification
      //4. If verification is "N", return "User not verified"
      //5. Else proceed further 

      let users = await this.dataSource.query(
        `select t.id, t.email, t.emailiv, t.emailtag, t.firstname, t.nameiv, t.nametag, t.verification 
        from tbluser t where t."role" = '${role}' order by t.createdat desc`
      );

      let userDt = {
        id: "",
        email: "",
        name: "",
        verification: ""
      };

      for(let i = 0; i < users.length; i++) {
        let decryptedEmail = this.encryptionService.decrypt(users[i].email, users[i].emailiv, users[i].emailtag);
        if(decryptedEmail === email) {
          if(users[i].verification === "N") {
            return {
              status: 400,
              message: "User not verified"
            }
          }

          let decryptedName = this.encryptionService.decrypt(users[i].firstname, users[i].nameiv, users[i].nametag);

          userDt.id = users[i].id;
          userDt.email = decryptedEmail;
          userDt.name = decryptedName;
          userDt.verification = users[i].verification;

          break;
        }
      }

      if(!userDt.id) {
        return {
          status: 400,
          message: ['Invalid Credentials'],
          error: 'Bad Request',
        };
      }

      let user = await this.userRepository.findOne({
        select: [
          'password',
        ],
        where: { id: userDt.id },
      });
      
      if (user && (await user.validatePassword(password))) {            

        let resuser = {
          id: userDt.id,
          role
        }

        const otp = Math.floor(Math.random() * 9000) + 1000;

        await this.userRepository.update(
          { id: userDt.id },
          { otp }
        );

        this.mailService.sendOtp({
          name: userDt.name,
          email: userDt.email,
          subject: "Bake & Brew - OTP for Two-Factor Authentication",
          message: `Your one time password to access your account - ${otp}.`,
        });

        const csrfToken = randomBytes(32).toString('hex');
        console.log("Cookies::", response.cookie);

        response.cookie('csrf', csrfToken, {
          secure: true,
          httpOnly: true
        });

        return { 
          status: 200, 
          user: resuser,
          csrfToken,
          message: "Login Successfull"
        };
      } else {
        return {
          status: 400,
          message: ['Invalid Credentials'],
          error: 'Bad Request',
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        message: [new InternalServerErrorException(error)['response']['name']],
        error: 'Bad Request',
      };
    }
  }

  async verifyOTP(verifyOTPDto: VerifyOTPDto) {
    try{
      const { id, otp, role } = verifyOTPDto;

      const confirmOTP = await this.userRepository.findOne({
        select: [
          'id'
        ],
        where: { id, otp }
      });

      console.log("OTP dt::", confirmOTP);

      if(confirmOTP.id) {
        const payload: IJwtPayload = { email: id, role };
        // const jwtAccessToken = await this.jwtService.signAsync(payload);
        const jwtAccessToken = await this.authenticationService.generateToken(payload)

        return {
          status: 200,
          jwtAccessToken,
          message: 'OTP verified successfully',
        };
      }

      return {
        status: 400,
        message: 'Invalid OTP',
        error: 'Bad Request',
      };
    }
    catch(error) {
      console.log(error);
      
      return {
        status: 500,
        message: [new InternalServerErrorException(error)['response']['name']],
        error: 'Bad Request',
      }
    }
  }

  async adminRegister(createAdminAccountDto: CreateAdminAccountDto) {
    //1. Validate input - name, email, password, role default - user.
    //2. Check if the email already exists - If no, proceed. If yes, return to log in page.
    //3. Hash password.
    //4. Encrypt data - name, email.
    //5. Save user record.
    //6. Send an verification link to user email, to verify user when he/she clicks the link.

    try {
      //check for existing account with same email id
      let existingEmail = await this.dataSource.query(
        `select email, emailiv, emailtag from tbluser t where t."role" = '${createAdminAccountDto.role}'`
      );
  
      for(let i = 0; i < existingEmail.length; i++) {
        let decryptEmail = this.encryptionService.decrypt(
          existingEmail[i].email, 
          existingEmail[i].emailiv, 
          existingEmail[i].emailtag
        );
        
        if(decryptEmail === createAdminAccountDto.email) {
          return {
            status: 400,
            message: "The user with this email address already exists."
          }
        }
      }

      //Encrypt sensitive data
      let encryptedName = this.encryptionService.encrypt(createAdminAccountDto.name);
      let encryptedEmail = this.encryptionService.encrypt(createAdminAccountDto.email);

      //Hash password
      const salt = await bcrypt.genSalt();
      let hashPassword : string;
  
      const password = "Admin@123Admin@123";
      hashPassword = await bcrypt.hash(
        password, salt
      );

      const token_1 = randomBytes(32).toString('hex'); 
      const token_2 = randomBytes(32).toString('hex'); 
      const token_3 = randomBytes(32).toString('hex');
      const hashToken = createHash('sha256').update(token_2).digest('hex');
      let link = `${process.env.UI_URL}/verify-user/${token_1}-${token_2}-${token_3}/${encryptedEmail.encryptedData}/${createAdminAccountDto.role}`;

      this.mailService.sendEmail({
        name: createAdminAccountDto.name,
        email: createAdminAccountDto.email,
        subject: "Bake & Brew - Verify your account",
        message: `Your admin account has been created. Kindly update password once verified. Your default password to login is ${password}. Please verify your account by clicking on the below link to be a part of bake & brew journey.`,
        link
      });

      let newUser = new UserEntity();
      newUser.firstname = encryptedName.encryptedData;
      newUser.nameiv = encryptedName.iv;
      newUser.nametag = encryptedName.tag;
      newUser.email = encryptedEmail.encryptedData;
      newUser.emailiv = encryptedEmail.iv;
      newUser.emailtag = encryptedEmail.tag;
      newUser.password = hashPassword;
      newUser.salt = salt;
      newUser.role = createAdminAccountDto.role;
      newUser.verification = Flags.N;
      newUser.verifytoken = hashToken;

      let user = await this.userRepository.save(newUser);
      console.log("User: ", user);

      return {
        status: 200,
        message: "User created successfully."
      }

    }
    catch(error) {
      console.log(error);
      
      return {
        status: 500,
        message: [new InternalServerErrorException(error)['response']['name']],
        error: 'Bad Request',
      }
    }
  }
}
