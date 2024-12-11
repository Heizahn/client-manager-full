import { Test, TestingModule } from '@nestjs/testing';
import { ServiceReceivableService } from './service_receivable.service';

describe('ServiceReceivableService', () => {
  let service: ServiceReceivableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceReceivableService],
    }).compile();

    service = module.get<ServiceReceivableService>(ServiceReceivableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
