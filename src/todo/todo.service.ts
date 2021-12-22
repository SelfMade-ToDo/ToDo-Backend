import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './entity/plan.entity';
import { PlanRepository } from './entity/plan.repository';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Plan)
    private planRepository: PlanRepository,
  ) {}

  async findById(id: number): Promise<Plan> {
    return this.planRepository.findOne(id);
  }

  async findUsers(): Promise<Plan[]> {
    return this.planRepository.find();
  }
}
