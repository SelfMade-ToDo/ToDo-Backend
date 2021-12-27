import {
  Controller,
  Get,
  UseGuards,
  Request,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt_auth.guard';
import { DeleteResult } from 'typeorm';
import { AddPlan } from './dto/addPlan.dto';
import { ModifyPlan } from './dto/modifyPlan.dto';
import { Plan } from './entity/plan.entity';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTodo(
    @Request() req,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const payload: { id: number; name: string; email: string } = req.user;
    let plans: Plan[];
    try {
      plans = await this.todoService.getPlans(payload.id);
    } catch (e: any) {
      // eslint-disable-next-line prettier/prettier
      return res.status(HttpStatus.BAD_REQUEST).json({ 'error': e });
    }
    return res.status(HttpStatus.OK).json(plans);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async addTodo(
    @Request() req,
    @Body() addPlan: AddPlan,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const payload: { id: number; name: string; email: string } = req.user;
    let plan: Plan;
    try {
      plan = await this.todoService.addPlan(payload.id, addPlan);
    } catch (e: any) {
      // eslint-disable-next-line prettier/prettier
      return res.status(HttpStatus.BAD_REQUEST).json({ 'error': e });
    }
    return res.status(HttpStatus.OK).json(plan);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async modifyTodo(
    @Request() req,
    @Param('id') planId: number,
    @Body() modifyPlan: ModifyPlan,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const payload: { id: number; name: string; email: string } = req.user;
    let plan: Plan;
    try {
      plan = await this.todoService.modifyPlan(planId, modifyPlan);
    } catch (e: any) {
      // eslint-disable-next-line prettier/prettier
      return res.status(HttpStatus.BAD_REQUEST).json({ 'error': e });
    }
    return res.status(HttpStatus.OK).json(plan);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteTodo(
    @Request() req,
    @Param('id') planId: number,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const payload: { id: number; name: string; email: string } = req.user;
    let plan: DeleteResult;
    try {
      plan = await this.todoService.deletePlan(planId);
    } catch (e: any) {
      // eslint-disable-next-line prettier/prettier
      return res.status(HttpStatus.BAD_REQUEST).json({ 'error': e });
    }
    return res.status(HttpStatus.OK).json(plan);
  }
}
