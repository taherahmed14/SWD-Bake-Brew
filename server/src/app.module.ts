import { Module } from '@nestjs/common';
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
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserApiModule,
    DatabaseFileModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AdminApiModule,
    AuthenticationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule {}
