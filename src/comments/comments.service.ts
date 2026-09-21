import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './comments.entity';
import { User } from '../users/users.entity';
import { Post } from '../posts/posts.entity';

import { CreateCommentDto } from './create-comment.dto';
import { UpdateCommentDto } from './update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
  ) {
    const user =
      await this.usersRepository.findOne({
        where: {
          id: createCommentDto.userId,
        },
      });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    const post =
      await this.postsRepository.findOne({
        where: {
          id: createCommentDto.postId,
        },
      });

    if (!post) {
      throw new NotFoundException(
        'Post not found',
      );
    }

    const comment =
      this.commentsRepository.create({
        content: createCommentDto.content,
        user,
        post,
      });

    return this.commentsRepository.save(
      comment,
    );
  }

  async findAll() {
    return this.commentsRepository.find({
      relations: {
        user: true,
        post: true,
      },
    });
  }

  async findOne(id: number) {
    const comment =
      await this.commentsRepository.findOne({
        where: { id },
        relations: {
          user: true,
          post: true,
        },
      });

    if (!comment) {
      throw new NotFoundException(
        'Comment not found',
      );
    }

    return comment;
  }

  async findByPost(postId: number) {
    return this.commentsRepository.find({
      where: {
        post: {
          id: postId,
        },
      },
      relations: {
        user: true,
        post: true,
      },
    });
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ) {
    const comment =
      await this.findOne(id);

    Object.assign(
      comment,
      updateCommentDto,
    );

    return this.commentsRepository.save(
      comment,
    );
  }

  async remove(id: number) {
    const comment =
      await this.findOne(id);

    await this.commentsRepository.remove(
      comment,
    );

    return {
      message:
        'Comment deleted successfully',
    };
  }
}