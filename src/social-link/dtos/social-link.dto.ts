import { ApiProperty } from "@nestjs/swagger";

export class SocialLinkDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  platform: string;

  @ApiProperty()
  value: string;
}
