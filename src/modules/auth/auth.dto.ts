import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

// TODO: example auth with id
export class BodyAuthDto {
  @IsOptional()
  @ApiProperty({ type: Number, description: "User ID" })
  id?: number;
}
