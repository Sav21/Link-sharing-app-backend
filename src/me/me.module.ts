import { Module } from "@nestjs/common";
import { MeService } from "./me.service";
import { MeController } from "./me.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  controllers: [MeController],
  providers: [MeService],
  imports: [PrismaModule],
})
export class MeModule {}
