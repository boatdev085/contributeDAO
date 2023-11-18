import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  Scope,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserJWTService } from "src/user-jwt.service";

@Injectable({ scope: Scope.REQUEST })
export class AuthGuards implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userJWTService: UserJWTService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [type, token] =
      context.switchToHttp().getRequest().headers?.authorization?.split(" ") ||
      [];
    if (token) {
      const verify = await this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      if (verify) {
        this.userJWTService.setUser({
          id: verify.id,
        });
        return true;
      }
    }
    return false;
  }
}
