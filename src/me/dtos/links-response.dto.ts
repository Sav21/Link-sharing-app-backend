import { ApiProperty } from "@nestjs/swagger";
import { SocialLinkDto } from "src/social-link/dtos/social-link.dto";

export class MyLinksResponseDto {
  @ApiProperty({ type: [SocialLinkDto] })
  links: SocialLinkDto[];
}
