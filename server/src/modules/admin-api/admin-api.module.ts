import { Module } from '@nestjs/common';
import { AdminApiService } from './admin-api.service';
import { AdminApiController } from './admin-api.controller';
import { UserEntity } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/authentication/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/common/general/general-config';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { Products } from 'src/entities/user-api.entity';
import { DatabaseFileService } from '../database-file/database-file.service';
import ProductImage from 'src/entities/product_image.entity';
import ProductWarranty from 'src/entities/warranty.entity';
import { EncryptionService } from 'src/common/encryption/encryption';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  controllers: [AdminApiController],
  providers: [AdminApiService, JwtStrategy, DatabaseFileService, EncryptionService,
    {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
    }
  ],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      Products,
      ProductImage,
      ProductWarranty
    ]),
    PassportModule,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    AuthenticationModule
  ]
})
export class AdminApiModule {}
