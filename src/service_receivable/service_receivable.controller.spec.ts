import { Test, TestingModule } from '@nestjs/testing';
import { ServiceReceivableController } from './service_receivable.controller';
import { ServiceReceivableService } from './service_receivable.service';

describe('ServiceReceivableController', () => {
  let controller: ServiceReceivableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceReceivableController],
      providers: [ServiceReceivableService],
    }).compile();

    controller = module.get<ServiceReceivableController>(ServiceReceivableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
