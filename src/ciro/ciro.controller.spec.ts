import { Test, TestingModule } from '@nestjs/testing';
import { CiroController } from './ciro.controller';
import { CiroService } from './ciro.service';

describe('CiroController', () => {
  let controller: CiroController;

  const mockCiroService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    update: jest.fn((id, dto) => ({
      id,
      ...dto,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CiroController],
      providers: [CiroService],
    })
      .overrideProvider(CiroService)
      .useValue(mockCiroService)
      .compile();

    controller = module.get<CiroController>(CiroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a ciro', () => {
    const dto = { total: 2222, date: '222' };
    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      total: dto.total,
      date: dto.date,
    });

    expect(mockCiroService.create).toHaveBeenCalledWith(dto);
  });
});
