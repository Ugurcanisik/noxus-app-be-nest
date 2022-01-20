import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Staff } from "./entities/staff.entity";

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff) private StaffRepository: Repository<Staff>,
  ) {}

  async create(createStaffDto: CreateStaffDto) {
    const newStaff = await this.StaffRepository.create(createStaffDto);
    return await this.StaffRepository.save(newStaff);
  }

  async findAll() {
    return await this.StaffRepository.find({
      where: { deleted: false },
      order: { startDate: 'ASC' },
    });
  }

  async findOne(id: string) {
    return await this.StaffRepository.findOne({
      where: { id: id, deleted: false },
    })
      .then((response) => {
        return response;
      })
      .catch((e) => {
        return false;
      });
  }

  async update(id: string, updateStaffDto: UpdateStaffDto) {
    const staff = await this.findOne(id);
    if (staff) {
      return await this.StaffRepository.update(id, updateStaffDto);
    }
  }

  async isActive(id: string, payload: object) {
    const staff = await this.findOne(id);
    if (staff) {
      return await this.StaffRepository.update(id, payload);
    }
  }

  async remove(id: string) {
    const staff = await this.findOne(id);
    if (staff) {
      return await this.StaffRepository.update(id, { deleted: true });
    }
  }
}
