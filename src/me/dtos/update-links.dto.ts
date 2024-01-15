import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";

export class NewLinkDto {
  @ApiProperty()
  @IsString()
  platform: string;

  @ApiProperty()
  @IsString()
  value: string;
}

export class UpdateMyLinksDto {
  @ApiProperty({ type: [NewLinkDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NewLinkDto)
  links: NewLinkDto[];
}
