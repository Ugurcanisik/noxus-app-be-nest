import { forwardRef, Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../orm.config';
import { Category } from './entities/category.entity';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
