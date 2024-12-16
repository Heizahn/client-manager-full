import { Injectable,  } from '@nestjs/common';
import { CreateRouterDto } from './dto/create-router.dto';
import { UpdateRouterDto } from './dto/update-router.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Router } from '../entities/router.entity';

@Injectable()
export class RoutersService {
  constructor(
    @InjectRepository(Router)
    private readonly routerRepository: Repository<Router>,
  ){}

  create(createRouterDto: CreateRouterDto) {
    return 'This action adds a new router';
  }

  findAll() {
    return `This action returns all routers`;
  }

  async findCreateClient(){
    return await this.routerRepository.query(
      `SELECT id, nombre
      FROM routers`
    )
  }
  findOne(id: number) {
    return `This action returns a #${id} router`;
  }

  update(id: number, updateRouterDto: UpdateRouterDto) {
    return `This action updates a #${id} router`;
  }

  remove(id: number) {
    return `This action removes a #${id} router`;
  }
}
