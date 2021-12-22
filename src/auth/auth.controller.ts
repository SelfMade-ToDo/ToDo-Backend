import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
// import { Login } from './dto/login.dto';
import { SignUp } from './dto/signUp.dto';
import { JwtAuthGuard } from './jwt_auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('/:id')
  async findOneUser(
    @Param('id') userId: number,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    return res
      .status(HttpStatus.OK)
      .json({ user: await this.authService.findById(userId) });
  }

  @Post('/join')
  async join(
    @Body() signUp: SignUp,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    this.authService.join(signUp);

    return res.status(HttpStatus.CREATED).send();
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @Post('/login')
  // async login(
  //   @Body() login: Login,
  //   @Res() res: Response,
  // ): Promise<Response<any, Record<string, any>>> {
  //   this.authService.login(login);

  //   return res.status(HttpStatus.OK);
  // }
}
