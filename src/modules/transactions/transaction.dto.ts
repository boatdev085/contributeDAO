import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class BodyTransactionDto {
  @IsOptional()
  @ApiProperty({ type: String, description: "Tx Hash" })
  txHash?: string;
  @IsOptional()
  @ApiProperty({ type: Boolean, description: "User Active" })
  active?: boolean;
}
