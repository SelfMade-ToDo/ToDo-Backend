import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/auth/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Plan {
  constructor(name: string, description: string, user: User) {
    this.name = name;
    this.description = description;
    this.user = user;
  }

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => Boolean)
  @Column({ default: false })
  isFinished: boolean;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.plans)
  @JoinColumn()
  user: User;
}
