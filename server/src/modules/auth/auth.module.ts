import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EncryptionService } from 'src/common/encryption/encryption';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/common/general/general-config';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { MailService } from 'src/mail/mail.service';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  controllers: [AuthController],
  providers: [AuthService, EncryptionService, MailService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity
    ]),
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    AuthenticationModule
  ],
  exports: [EncryptionService]
})
export class AuthModule {}
