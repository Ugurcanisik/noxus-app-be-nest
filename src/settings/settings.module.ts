import { Module } from "@nestjs/common";
import { SettingsService } from "./settings.service";
import { SettingsController } from "./settings.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "../orm.config";
import { Setting } from "./entities/setting.entity";

@Module({
  imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([Setting])],
  controllers: [SettingsController],
  providers: [SettingsService]
})
export class SettingsModule {
}
