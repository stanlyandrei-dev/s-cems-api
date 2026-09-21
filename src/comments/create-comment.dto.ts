import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  postId: number;
}