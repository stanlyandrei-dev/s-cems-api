import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

import { Comment } from './comments.entity';
import { User } from '../users/users.entity';
import { Post } from '../posts/posts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, User, Post]),

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

  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}