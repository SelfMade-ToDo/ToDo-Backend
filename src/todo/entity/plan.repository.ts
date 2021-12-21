import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Plan } from './plan.entity';

@Injectable()
@EntityRepository(Plan)
export class PlanRepository extends Repository<Plan> {}
