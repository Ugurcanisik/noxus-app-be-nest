import { Test, TestingModule } from '@nestjs/testing';
import { CiroController } from './ciro.controller';
import { CiroService } from './ciro.service';

describe('CiroController', () => {
  let controller: CiroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CiroController],
      providers: [CiroService],
    }).compile();

    controller = module.get<CiroController>(CiroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
