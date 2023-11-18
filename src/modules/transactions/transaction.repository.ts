import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "./transaction.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { BodyTransactionDto } from "./transaction.dto";
import { PaginationParams } from "src/base/base.interface";

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly repo: Repository<Transaction>
  ) {}

  async getAll(
    where?: FindOptionsWhere<Transaction>,
    paginationParams?: PaginationParams
  ) {
    Transaction;
    return await this.repo.findAndCount({
      where: {
        ...where,
      },
      order: { id: "desc" },
      take: paginationParams?.limit,
      skip: paginationParams?.offset,
    });
  }

  async findOne(params: BodyTransactionDto & { id?: number }) {
    return await this.repo.findOne({
      where: {
        active: params?.active,
        txHash: params?.txHash,
        id: params?.id,
      },
    });
  }

  async create(data: Transaction) {
    return await this.repo.insert(data);
  }

  async update(id: number, data: Transaction) {
    return await this.repo.update({ id }, data);
  }

  async delete(id: number) {
    return await this.repo.delete({ id });
  }
}
