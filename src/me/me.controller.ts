import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { RequestingUser } from "src/auth/decorators/requesting-user.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "src/user/types/user.type";
import { MyDetailsResponseDto } from "./dtos/details-response.dto";
import { MyLinksResponseDto } from "./dtos/links-response.dto";
import { UpdateMyDetailsDto } from "./dtos/update-details.dto";
import { UpdateMyLinksDto } from "./dtos/update-links.dto";
import { MeService } from "./me.service";

@Controller("me")
export class MeController {
  constructor(private readonly meService: MeService) {}

  @ApiOperation({
    summary: "Get logged in user's profile details",
    tags: ["me"],
  })
  @ApiOkResponse({ type: MyDetailsResponseDto })
  @ApiBearerAuth()
  @Get("details")
  @UseGuards(JwtAuthGuard)
  getDetails(@RequestingUser() user: User): Promise<MyDetailsResponseDto> {
    return this.meService.getDetails(user);
  }

  @ApiOperation({
    summary: "Update logged in user's profile details",
    tags: ["me"],
  })
  @ApiOkResponse({ type: MyDetailsResponseDto })
  @ApiBearerAuth()
  @Post("details")
  @UseGuards(JwtAuthGuard)
  updateDetails(
    @RequestingUser() user: User,
    @Body() body: UpdateMyDetailsDto,
  ): Promise<MyDetailsResponseDto> {
    return this.meService.updateDetails(user, body);
  }

  @ApiOperation({
    summary: "Get logged in user's social links",
    tags: ["me"],
  })
  @ApiOkResponse({ type: MyLinksResponseDto })
  @ApiBearerAuth()
  @Get("links")
  @UseGuards(JwtAuthGuard)
  async getLinks(@RequestingUser() user: User): Promise<MyLinksResponseDto> {
    const links = await this.meService.getLinks(user);
    return { links };
  }

  @ApiOperation({
    summary: "Update logged in user's social links",
    tags: ["me"],
  })
  @ApiOkResponse({ type: MyLinksResponseDto })
  @ApiBearerAuth()
  @Post("links")
  @UseGuards(JwtAuthGuard)
  async updateLinks(
    @RequestingUser() user: User,
    @Body() body: UpdateMyLinksDto,
  ): Promise<MyLinksResponseDto> {
    const links = await this.meService.updateLinks(user, body);
    return { links };
  }
}
