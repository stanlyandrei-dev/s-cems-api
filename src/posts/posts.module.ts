import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './posts.entity';
import { User } from '../users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],

  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}