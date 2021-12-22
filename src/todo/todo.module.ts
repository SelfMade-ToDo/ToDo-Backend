import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Plan } from './entity/plan.entity';
import { PlanResolver } from './plan.resolver';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([Plan]), AuthModule],
  controllers: [TodoController],
  providers: [TodoService, PlanResolver],
})
export class TodoModule {}
