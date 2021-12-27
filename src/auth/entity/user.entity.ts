import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Plan } from 'src/todo/entity/plan.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  email: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => [Plan])
  @OneToMany(() => Plan, (plan) => plan.user)
  @JoinColumn()
  plans: Plan[];
}
