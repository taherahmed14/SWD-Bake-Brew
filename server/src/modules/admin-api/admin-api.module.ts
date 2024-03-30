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
import ProductWarranty from 'src/entities/warranty.entity';

@Module({
  controllers: [AdminApiController],
  providers: [AdminApiService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
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
