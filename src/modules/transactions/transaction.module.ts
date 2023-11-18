import { Module } from "@nestjs/common";
import { TransactionController } from "./transaction.controller";
import { JwtService } from "@nestjs/jwt";
import { UserJWTService } from "src/user-jwt.service";
import { TransactionService } from "./transaction.service";
import { TransactionRepository } from "./transaction.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "./transaction.entity";
import { UserService } from "../users/user.service";
import { UserModule } from "../users/user.module";
import { UserRepository } from "../users/user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), UserModule],
  providers: [
    TransactionService,
    TransactionRepository,
    UserService,
    UserRepository,
    JwtService,
    UserJWTService,
  ],
  controllers: [TransactionController],
  exports: [TypeOrmModule],
})
export class TransactionModule {}
