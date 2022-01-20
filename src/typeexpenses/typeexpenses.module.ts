import { Module } from '@nestjs/common';
import { TypeexpensesService } from './typeexpenses.service';
import { TypeexpensesController } from './typeexpenses.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "../orm.config";
import { Typeexpense } from "./entities/typeexpense.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Typeexpense]),
  ],
  controllers: [TypeexpensesController],
  providers: [TypeexpensesService]
})
export class TypeexpensesModule {}
