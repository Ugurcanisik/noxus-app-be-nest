import { Test, TestingModule } from '@nestjs/testing';
import { CiroService } from './ciro.service';

describe('CiroService', () => {
  let service: CiroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CiroService],
    }).compile();

    service = module.get<CiroService>(CiroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
