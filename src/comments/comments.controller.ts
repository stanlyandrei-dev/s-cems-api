import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from '../auth/jwt.guard';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './create-comment.dto';
import { UpdateCommentDto } from './update-comment.dto';

@Controller('comments')
@UseGuards(JwtGuard)
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(
      createCommentDto,
    );
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.commentsService.findOne(id);
  }

  @Get('post/:postId')
  findByPost(
    @Param('postId', ParseIntPipe) postId: number,
  ) {
    return this.commentsService.findByPost(postId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(
      id,
      updateCommentDto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.commentsService.remove(id);
  }
}