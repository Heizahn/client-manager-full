import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceReceivableDto } from './create-service_receivable.dto';

export class UpdateServiceReceivableDto extends PartialType(CreateServiceReceivableDto) {}
