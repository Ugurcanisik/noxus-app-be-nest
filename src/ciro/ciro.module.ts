import { Module } from '@nestjs/common';
import { CiroService } from './ciro.service';
import { CiroController } from './ciro.controller';

@Module({
  controllers: [CiroController],
  providers: [CiroService]
})
export class CiroModule {}
