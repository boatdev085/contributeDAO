import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import {
  TransformInterceptor,
  TransformExceptionFilter,
} from "./interceptor/middleware/middleware.interceptor";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserJWTService } from "./user-jwt.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { configPostgresService } from "./configuration/postgres";
import { config } from "dotenv";
import { UserModule } from "./modules/users/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { TransactionModule } from "./modules/transactions/transaction.module";

config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configPostgresService.getTypeOrmConfig()),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: `${process.env.JWT_EXPIRESIN}` },
    }),
    ConfigModule,
    UserModule,
    AuthModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: TransformExceptionFilter,
    },
    AppService,
    UserJWTService,
  ],
})
export class AppModule {}
