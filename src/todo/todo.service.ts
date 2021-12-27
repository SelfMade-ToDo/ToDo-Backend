import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { UserRepository } from 'src/auth/entity/user.repository';
import { DeleteResult } from 'typeorm';
import { AddPlan } from './dto/addPlan.dto';
import { ModifyPlan } from './dto/modifyPlan.dto';
import { Plan } from './entity/plan.entity';
import { PlanRepository } from './entity/plan.repository';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Plan)
    private planRepository: PlanRepository,
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async findById(id: number): Promise<Plan> {
    return this.planRepository.findOne(id);
  }

  async findUsers(): Promise<Plan[]> {
    return this.planRepository.find();
  }

  async getPlans(userId: number): Promise<Array<Plan>> {
    return await this.planRepository.find({ where: { user: userId } });
  }

  async addPlan(userId: number, plan: AddPlan): Promise<Plan> {
    return await this.planRepository.save(
      new Plan(
        plan.name,
        plan.description,
        await this.userRepository.findOne(userId),
      ),
    );
  }

  async modifyPlan(planId: number, plan: ModifyPlan): Promise<Plan> {
    const updatePlan: Plan = await this.planRepository.findOne(planId);

    updatePlan.name = plan.name;
    updatePlan.description = plan.description;

    return this.planRepository.save(updatePlan);
  }

  async deletePlan(planId: number): Promise<DeleteResult> {
    return this.planRepository.delete({ id: planId });
  }
}
