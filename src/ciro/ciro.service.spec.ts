import { Test, TestingModule } from '@nestjs/testing';
import { CiroService } from './ciro.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ciro } from './entities/ciro.entity';

describe('CiroService', () => {
  let service: CiroService;

  const mockUserRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((ciro) =>
        Promise.resolve({ id: Date.now(), ...ciro }),
      ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CiroService,
        { provide: getRepositoryToken(Ciro), useValue: { mockUserRepository } },
      ],
    }).compile();

    service = module.get<CiroService>(CiroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new ciro record', async () => {
    expect(await service.create({ total: 3333, date: '2222' })).toEqual({
      id: expect.any(Number),
      total: 3333,
      date: '2222',
    });
    expect(mockUserRepository.create).toHaveBeenCalledWith({
      total: 3333,
      date: '2222',
    });
  });
});
