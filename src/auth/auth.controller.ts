import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/:id')
  async findOneUser(
    @Param('id') userId: number,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    return res
      .status(HttpStatus.OK)
      .json({ user: await this.authService.findById(userId) });
  }
}
