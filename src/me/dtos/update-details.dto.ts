import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateMyDetailsDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  firstName?: string | undefined;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  lastName?: string | undefined;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  email?: string | undefined;
}
