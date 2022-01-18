import { Module } from '@nestjs/common';
import { CiroService } from './ciro.service';
import { CiroController } from './ciro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from "../orm.config";
import { Ciro } from "./entities/ciro.entity";

@Module({
  imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([Ciro])],
  controllers: [CiroController],
  providers: [CiroService],
})
export class CiroModule {}
