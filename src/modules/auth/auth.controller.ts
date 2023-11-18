import { Controller, Post, Body } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { BodyAuthDto } from "./auth.dto";

@ApiBearerAuth()
@ApiTags("Login")
@Controller("login")
export class AuthController {
  constructor(private readonly userService: AuthService) {}
  @Post("")
  async login(@Body() body: BodyAuthDto) {
    return await this.userService.login(body);
  }
}
