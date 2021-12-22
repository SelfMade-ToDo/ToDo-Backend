import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Plan } from './entity/plan.entity';
import { TodoService } from './todo.service';

@Resolver()
export class PlanResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => Plan, { name: 'plan' })
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.findById(id);
  }

  @Query(() => [Plan], { name: 'plans' })
  async getUsersByNickname() {
    return this.todoService.findUsers();
  }
}
