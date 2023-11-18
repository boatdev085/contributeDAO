import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "../users/user.repository";
import { UserModule } from "../users/user.module";
import { AuthService } from "./auth.service";
import { UserJWTService } from "src/user-jwt.service";

@Module({
  imports: [UserModule],
  providers: [AuthService, UserRepository, JwtService, UserJWTService],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
