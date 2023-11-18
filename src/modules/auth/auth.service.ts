import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { BodyAuthDto } from "./auth.dto";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "../users/user.repository";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepository
  ) {}

  // TODO: example login
  async login(data: BodyAuthDto) {
    try {
      const payload = { id: data.id };
      const user = await this.userRepo.findOne(data.id, {});
      if (!user) {
        throw new HttpException(`Don't have user.`, HttpStatus.NOT_FOUND);
      }
      const token = await this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      });
      return {
        access_token: token,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
