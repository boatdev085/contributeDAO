import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
} from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { AuthGuards } from "src/guards/auth.guards";
import { TransactionService } from "./transaction.service";
import { BodyTransactionDto } from "./transaction.dto";

@ApiBearerAuth()
@ApiTags("Transaction")
@Controller("transaction")
@UseGuards(AuthGuards)
export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  @ApiQuery({ name: "limit", required: false, type: Number })
  @ApiQuery({ name: "offset", required: false, type: Number })
  @ApiQuery({ name: "v", required: false, type: String })
  public async getAll(
    @Query("limit") limit?: number,
    @Query("offset") offset?: number,
    @Query("v") v?: string
  ) {
    return await this.service.getAll(undefined, { limit, offset, v });
  }

  @Get("/latest-block")
  async getBlockNumberLatest() {
    return await this.service.getBlockNumberLatest();
  }

  @Get("/:txHash")
  async getByTransactionID(@Param("txHash") txHash: string) {
    return await this.service.getByTransactionID(txHash);
  }

  @Post()
  async createTransaction(@Body() body: BodyTransactionDto) {
    return await this.service.create(body);
  }

  @Put("/:id")
  async updateTransaction(
    @Body() body: BodyTransactionDto,
    @Param("id") id: number
  ) {
    return await this.service.update(id, body);
  }

  @Delete("/:id")
  async deleteTransaction(@Param("id") id: number) {
    return await this.service.delete(id);
  }
}
