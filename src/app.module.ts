import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { CiroModule } from './ciro/ciro.module';

@Module({
  imports: [CategoriesModule, CiroModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
