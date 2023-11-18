import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuards } from "src/guards/auth.guards";
import { UserService } from "./user.service";
import { BodyUserDto } from "./user.dto";

@ApiBearerAuth()
@ApiTags("User")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuards)
  @Get("/:id")
  async getByCitizenId(@Param("id") id: number) {
    return await this.userService.getByUserID(id);
  }

  @Post()
  async createUser(@Body() body: BodyUserDto) {
    return await this.userService.create(body);
  }

  @UseGuards(AuthGuards)
  @Put("/:id")
  async updateUser(@Body() body: BodyUserDto, @Param("id") id: number) {
    return await this.userService.update(id, body);
  }

  @UseGuards(AuthGuards)
  @Delete("/:id")
  async deleteUser(@Param("id") id: number) {
    return await this.userService.delete(id);
  }
}
