import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Post } from './posts.entity';
import { User } from '../users/users.entity';

import { CreatePostDto } from './create-post.dto';
import { UpdatePostDto } from './update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const user =
      await this.usersRepository.findOne({
        where: {
          id: createPostDto.userId,
        },
      });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    const post =
      this.postsRepository.create({
        title: createPostDto.title,
        content: createPostDto.content,
        user,
      });

    return this.postsRepository.save(post);
  }

  async findAll() {
    return this.postsRepository.find({
      relations: {
        user: true,
      },
    });
  }

  // Endpoint #19
  async findByUser(userId: number) {
    return this.postsRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: number) {
    const post =
      await this.postsRepository.findOne({
        where: { id },
        relations: {
          user: true,
          comments: true,
        },
      });

    if (!post) {
      throw new NotFoundException(
        'Post not found',
      );
    }

    return post;
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ) {
    const post =
      await this.findOne(id);

    Object.assign(
      post,
      updatePostDto,
    );

    return this.postsRepository.save(post);
  }

  async remove(id: number) {
    const post =
      await this.findOne(id);

    await this.postsRepository.remove(post);

    return {
      message:
        'Post deleted successfully',
    };
  }
}