import { Injectable } from "@nestjs/common";
import { MyDetails } from "./types/my-details.type";
import { SocialLink } from "src/social-link/types/social-link.type";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "src/user/types/user.type";

@Injectable()
export class MeService {
  constructor(private prismaService: PrismaService) {}

  async getDetails(user: User): Promise<MyDetails> {
    const profile = await this.prismaService.user.findUniqueOrThrow({
      where: { id: user.id },
    });

    return {
      id: profile.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
    };
  }

  async updateDetails(
    user: User,
    data: {
      firstName?: string | undefined;
      lastName?: string | undefined;
      email?: string | undefined;
    },
  ): Promise<MyDetails> {
    const profile = await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      },
    });

    return {
      id: profile.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
    };
  }

  async getLinks(user: User): Promise<SocialLink[]> {
    const socialLinks = await this.prismaService.socialLink.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        platform: true,
        value: true,
        order: true,
      },
    });

    return [...socialLinks]
      .sort((a, b) => a.order - b.order)
      .map((link) => ({
        id: link.id,
        platform: link.platform,
        value: link.value,
      }));
  }

  async updateLinks(
    user: User,
    data: { links: Array<{ platform: string; value: string }> },
  ): Promise<SocialLink[]> {
    await this.prismaService.$transaction([
      this.prismaService.socialLink.deleteMany({
        where: { userId: user.id },
      }),
      ...data.links.map((link, index) =>
        this.prismaService.socialLink.create({
          data: {
            userId: user.id,
            platform: link.platform,
            value: link.value,
            order: index,
          },
        }),
      ),
    ]);

    return this.getLinks(user);
  }
}
