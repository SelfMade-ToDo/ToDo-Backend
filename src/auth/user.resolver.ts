import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from './entity/user.entity';

@Resolver()
export class UserResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User, { name: 'user' })
  async user(@Args('id', { type: () => Int }) id: number) {
    return this.authService.findById(id);
  }
}
