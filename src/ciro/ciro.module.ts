import { Module } from '@nestjs/common';
import { CiroService } from './ciro.service';
import { CiroController } from './ciro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../orm.config';
import { Ciro } from './entities/ciro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ciro])],
  controllers: [CiroController],
  providers: [CiroService],
  exports: [CiroService],
})
export class CiroModule {}
