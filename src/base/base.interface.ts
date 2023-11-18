import { ApiProperty } from "@nestjs/swagger";

export abstract class BaseResponse {
  @ApiProperty({ type: Number, description: "Status" })
  status: number;

  @ApiProperty({ type: Number, description: "Status code" })
  statusCode: number;

  @ApiProperty({ type: String || Array<string>, description: "Status Error" })
  error: string | Array<string>;

  @ApiProperty({
    type: Object,
    description: "Metadata",
  })
  metadata: Record<string, any>;
}

export class PaginationParams {
  offset?: number;
  limit?: number;
  v?: string;
}
