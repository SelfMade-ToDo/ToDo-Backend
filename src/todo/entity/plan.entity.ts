import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/auth/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Plan {
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
  @Column()
  isFinished: boolean;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.plans)
  @JoinColumn()
  user: User;
}
