import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserJWTService } from "src/user-jwt.service";
import { TransactionRepository } from "./transaction.repository";
import { BodyTransactionDto } from "./transaction.dto";
import { PaginationParams } from "src/base/base.interface";
import { FindOptionsWhere } from "typeorm";
import { Transaction } from "./transaction.entity";
import { UserService } from "../users/user.service";
import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: process.env.ALCHEMY_KEY,
  network: Network.ETH_MAINNET,
};

@Injectable()
export class TransactionService {
  private readonly alchemy: Alchemy;
  constructor(
    private readonly repo: TransactionRepository,
    private readonly userService: UserService,
    private readonly userJWTService: UserJWTService
  ) {
    this.alchemy = new Alchemy(settings);
  }

  async getAll(
    where?: FindOptionsWhere<Transaction>,
    pagination?: PaginationParams
  ) {
    try {
      const user = this.userJWTService.getUser();
      const quota = await this.checkQuota(user.id);
      const [data, count] = await this.repo.getAll(where, pagination);
      await this.updateQuota(user.id, quota.quota, data.length);
      return {
        result: data,
        metadata: {
          total_item: count,
        },
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async getByTransactionID(txHash: string) {
    try {
      // TODO: logic redis
      const user = this.userJWTService.getUser();
      const quota = await this.checkQuota(user.id);
      let transaction = await this.repo.findOne({ txHash });
      if (!transaction) {
        transaction = {
          txHash,
          tx_detail: await this.alchemy.core.getTransaction(txHash),
        };
        await this.repo.create(transaction);
      }
      await this.updateQuota(user.id, quota.quota, 1);

      return transaction;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async getBlockNumberLatest() {
    try {
      const user = this.userJWTService.getUser();
      const quota = await this.checkQuota(user.id);
      const latestBlock = await this.alchemy.core.getBlock("latest");
      await this.updateQuota(user.id, quota.quota, 1);

      return latestBlock;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async webhook(data: BodyTransactionDto) {
    try {
      let transaction = await this.repo.findOne({ txHash: data.txHash });
      if (transaction) {
        throw new HttpException("have data", HttpStatus.INTERNAL_SERVER_ERROR);
      }
      const create = await this.repo.create({
        ...data,
        active: true,
      });
      return create.raw && create.raw[0];
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(data: BodyTransactionDto) {
    try {
      const user = this.userJWTService.getUser();
      const create = await this.repo.create({
        ...data,
        active: true,
        created_by: user?.id ? Number(user?.id) : undefined,
      });
      return create.raw && create.raw[0];
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, data: BodyTransactionDto) {
    try {
      const user = this.userJWTService.getUser();
      await this.repo.update(id, {
        ...data,
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
      await this.repo.delete(id);
      return "Success";
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async checkQuota(userID: number) {
    const getQuota = await this.userService.getByUserID(userID);
    if (getQuota.quota <= 0) {
      throw new HttpException(`Full Quota`, HttpStatus.NOT_FOUND);
    }
    return getQuota;
  }

  async updateQuota(userID: number, oldQuota: number, countRead: number) {
    return await this.userService.update(userID, {
      quota: oldQuota - countRead,
    });
  }
}
