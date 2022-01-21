import { Injectable } from "@nestjs/common";
import { CreateSettingDto } from "./dto/create-setting.dto";
import { UpdateSettingDto } from "./dto/update-setting.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Setting } from "./entities/setting.entity";

@Injectable()
export class SettingsService {

  constructor(
    @InjectRepository(Setting) private SettingRepository: Repository<Setting>
  ) {
  }

  async findAll() {
    return await this.SettingRepository.find({ where: { deleted: false } });
  }

  async update(id: string, updateSettingDto: UpdateSettingDto) {
    return await this.SettingRepository.update(id, updateSettingDto);
  }
}
