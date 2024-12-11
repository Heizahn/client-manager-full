import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  create() {
    return 'This action adds a new client';
  }

  async findAll(): Promise<Client[]> {
    try {
      return await this.clientRepository.query(
        `
          SELECT
            c."id",
            c."nombre",
            c."identificacion",
            c."direccion",
            c."telefono",
            s."nombre_sector",
            c."ipv4",
            p."nombre_service",
            c."saldo",
            c."estado"
          FROM "clients" c
          JOIN "sectors" s ON c."sectorId"= s."id"
          JOIN "services" p ON c."planId"= p."id"
        `,
      );
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string): Promise<Client> {
    return await this.clientRepository.findOne({
      where: {
        id,
      },
      relations: ['sector', 'plan', 'router', 'created_by'],
    });
  }

  update(id: number) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
