import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserJWTService } from "src/user-jwt.service";
import { UserRepository } from "./user.repository";
import { BodyUserDto } from "./User.dto";

const DEFAULT_QUOTA = 200000;
@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly userJWTService: UserJWTService
  ) {}

  async getByUserID(id: number) {
    try {
      const user = this.userJWTService.getUser();
      const User = await this.userRepo.findOne(id, {});
      if (User?.id !== user?.id) {
        throw new HttpException(
          `Unable to retrieve data from other Users.`,
          HttpStatus.NOT_FOUND
        );
      }
      return User;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async create(data: BodyUserDto) {
    try {
      const user = this.userJWTService.getUser();
      const create = await this.userRepo.create({
        name: data?.name || "",
        surname: data?.surname || "",
        quota: data.quota || DEFAULT_QUOTA,
        active: true,
        created_by: user?.id ? Number(user?.id) : undefined,
      });
      return create.raw && create.raw[0];
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, data: BodyUserDto) {
    try {
      const user = this.userJWTService.getUser();
      const User = await this.userRepo.findOne(id, {});
      if (User?.id !== user?.id) {
        throw new HttpException(
          `Unable to retrieve data from other Users.`,
          HttpStatus.NOT_FOUND
        );
      }
      await this.userRepo.update(user.id, {
        name: data?.name,
        surname: data?.surname,
        quota: data?.quota,
        active: data?.active,
        updated_by: user?.id ? Number(user?.id) : undefined,
      });
      return "success";
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(id: number) {
    try {
      const user = this.userJWTService.getUser();
      const User = await this.userRepo.findOne(id, {});
      if (User?.id !== user?.id) {
        throw new HttpException(
          `Unable to retrieve data from other Users.`,
          HttpStatus.NOT_FOUND
        );
      }
      await this.userRepo.delete(id);
      return "Success";
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
