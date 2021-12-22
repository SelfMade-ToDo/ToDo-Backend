import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUp } from './dto/signUp.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './entity/user.repository';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Login } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  //local passport
  async validateUser(
    email: string,
    password: string,
  ): Promise<{
    id: number;
    name: string;
    email: string;
  } | null> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (user && (await compare(password, user.password))) {
      const { password, plans, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: { id: number; name: string; email: string }) {
    const payload = { id: user.id, name: user.name, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async join(signUp: SignUp): Promise<void> {
    const user = new User();

    user.name = signUp.name;
    user.email = signUp.email;
    user.password = await hash(signUp.password, 12);

    console.log('save');

    this.userRepository.save(user);

    return;
  }

  // async login(login: Login): Promise<ReturnToken | Error> {
  //   const returnToken = new ReturnToken();

  //   if (
  //     !compare(
  //       login.password,
  //       (await this.userRepository.findOne({ where: { email: login.email } }))
  //         .password,
  //     )
  //   ) {
  //     return Error('incorrect password');
  //   }

  //   return returnToken;
  // }
}
