import { Injectable } from '@nestjs/common';
import { CreateServiceReceivableDto } from './dto/create-service_receivable.dto';
import { UpdateServiceReceivableDto } from './dto/update-service_receivable.dto';
import { Repository } from 'typeorm';
import { ServiceReceivable } from '../entities/service_receivable.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ServiceReceivableService {
  constructor(
    @InjectRepository(ServiceReceivable)
    private readonly serviceReceivableRepository: Repository<ServiceReceivable>,
  ) {}
  create(createServiceReceivableDto: CreateServiceReceivableDto) {
    return 'This action adds a new serviceReceivable';
  }

  async findAll(id: string) {
    return await this.serviceReceivableRepository.find({
      relations: ['created_by, client, payments'],
      where: {
        client: { id },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceReceivable`;
  }

  update(id: number, updateServiceReceivableDto: UpdateServiceReceivableDto) {
    return `This action updates a #${id} serviceReceivable`;
  }
}
