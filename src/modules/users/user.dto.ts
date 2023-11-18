import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class BodyUserDto {
  @IsOptional()
  @ApiProperty({ type: String, description: "User Name" })
  name?: string;

  @IsOptional()
  @ApiProperty({ type: String, description: "User Surname" })
  surname?: string;

  @IsOptional()
  @ApiProperty({ type: Number, description: "User Quota" })
  quota?: number;

  @IsOptional()
  @ApiProperty({ type: Boolean, description: "User Active" })
  active?: boolean;
}
