import { Injectable } from '@nestjs/common';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sector } from 'src/entities/sector.entity';

@Injectable()
export class SectorsService {
  constructor(
    @InjectRepository(Sector)
    private readonly sectorRepository: Repository<Sector>,
  ) {}
  create(createSectorDto: CreateSectorDto) {
    return 'This action adds a new sector';
  }

  findAll() {
    return `This action returns all sectors`;
  }

  async findCreateClient(){
    return await this.sectorRepository.query(
      `SELECT id, nombre_sector
      FROM sectors`
    )
  }

  findOne(id: number) {
    return `This action returns a #${id} sector`;
  }

  update(id: number, updateSectorDto: UpdateSectorDto) {
    return `This action updates a #${id} sector`;
  }

  remove(id: number) {
    return `This action removes a #${id} sector`;
  }
}
