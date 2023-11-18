import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { JwtService } from "@nestjs/jwt";
import { UserJWTService } from "src/user-jwt.service";
import { UserService } from "./user.service";
import { UserRepository } from "./user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserRepository, JwtService, UserJWTService],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UserModule {}
