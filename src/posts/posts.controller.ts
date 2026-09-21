import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post as HttpPost,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from '../auth/jwt.guard';

import { PostsService } from './posts.service';
import { CreatePostDto } from './create-post.dto';
import { UpdatePostDto } from './update-post.dto';

@Controller('posts')
@UseGuards(JwtGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpPost()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  // Endpoint #19
  @Get('user/:userId')
  findByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.postsService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}