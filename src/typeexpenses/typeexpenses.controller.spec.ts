import { Test, TestingModule } from '@nestjs/testing';
import { TypeexpensesController } from './typeexpenses.controller';
import { TypeexpensesService } from './typeexpenses.service';

describe('TypeexpensesController', () => {
  let controller: TypeexpensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeexpensesController],
      providers: [TypeexpensesService],
    }).compile();

    controller = module.get<TypeexpensesController>(TypeexpensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
