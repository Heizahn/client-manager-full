import { Router } from 'src/entities/router.entity';

export type CreateRouterDto = Omit<Router, 'id'>;
