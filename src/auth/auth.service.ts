import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserRepository } from './entity/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
