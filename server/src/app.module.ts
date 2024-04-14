import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/database/typeorm.config';
import { UserApiModule } from './modules/user-api/user-api.module';
import { DatabaseFileModule } from './modules/database-file/database-file.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { AdminApiModule } from './modules/admin-api/admin-api.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthModule } from './modules/auth/auth.module';
import { EncryptionService } from './common/encryption/encryption';
import { MailService } from './mail/mail.service';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { CsrfMiddleware } from './common/middleware/csrf.middleware';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 30000,
      limit: 100,
    }]),
    UserApiModule,
    DatabaseFileModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AdminApiModule,
    AuthenticationModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EncryptionService,
    MailService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
  ],
})
export class AppModule {}
