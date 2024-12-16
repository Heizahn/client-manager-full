import { Module } from '@nestjs/common';
import { RoutersService } from './routers.service';
import { RoutersController } from './routers.controller';
import { Router } from 'src/entities/router.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Router])],
  controllers: [RoutersController],
  providers: [RoutersService],
})
export class RoutersModule {}
