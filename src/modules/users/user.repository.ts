import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { BodyUserDto } from "./user.dto";

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>
  ) {}

  async findOne(id: number, params?: BodyUserDto) {
    return await this.repo.findOne({
      where: {
        active: params?.active,
        id: id,
      },
    });
  }

  async create(User: User) {
    return await this.repo.insert(User);
  }

  async update(id: number, User: User) {
    return await this.repo.update({ id }, User);
  }

  async delete(id: number) {
    return await this.repo.delete({ id });
  }
}
