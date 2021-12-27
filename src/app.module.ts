import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NM,
      entities: [
        'dist/auth/entity/*.entity{.ts,.js}',
        'dist/todo/entity/*.entity{.ts,.js}',
      ],
      synchronize: true,
      timezone: '+09:00',
    }),
    GraphQLModule.forRoot({
      // typePaths: ['./**/*.graphql'],
      autoSchemaFile: 'schema.gql',
    }),
    TodoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
