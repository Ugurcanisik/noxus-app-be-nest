import { Test, TestingModule } from '@nestjs/testing';
import { TypeexpensesService } from './typeexpenses.service';

describe('TypeexpensesService', () => {
  let service: TypeexpensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeexpensesService],
    }).compile();

    service = module.get<TypeexpensesService>(TypeexpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
