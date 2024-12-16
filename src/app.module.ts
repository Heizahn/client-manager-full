import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Router } from './entities/router.entity';
import { Sector } from './entities/sector.entity';
import { Service } from './entities/service.entity';
import { Client } from './entities/client.entity';
import { ServiceReceivable } from './entities/service_receivable.entity';
import { Payment } from './entities/payment.entity';
import { ServicesModule } from './services/services.module';
import { ServiceReceivableModule } from './service_receivable/service_receivable.module';
import { RoutersModule } from './routers/routers.module';
import { SectorsModule } from './sectors/sectors.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.SUPABASE_HOST,
      port: Number(process.env.SUPABASE_PORT),
      username: process.env.SUPABASE_USER,
      password: process.env.SUPABASE_PASSWORD,
      database: process.env.SUPABASE_DB_NAME,
      entities: [Client, Profile, Router, Sector, Service, ServiceReceivable, Payment],
      synchronize: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'front/dist'),
      exclude: ['/api/*'],
    }),
    ClientsModule,
    ServicesModule,
    ServiceReceivableModule,
    RoutersModule,
    SectorsModule,
    AuthModule,
  ],
})
export class AppModule {}
