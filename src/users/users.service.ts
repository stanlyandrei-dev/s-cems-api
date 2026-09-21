import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './users.entity';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser =
      await this.usersRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });

    if (existingUser) {
      throw new ConflictException(
        'Email already exists',
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        createUserDto.password,
        10,
      );

    const user =
      this.usersRepository.create({
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
      });

    return this.usersRepository.save(user);
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findPostsByUser(id: number) {
    const user =
      await this.usersRepository.findOne({
        where: { id },
        relations: {
          posts: true,
        },
      });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    return user.posts;
  }

  async findOne(id: number) {
    const user =
      await this.usersRepository.findOne({
        where: { id },
      });

    if (!user) {
      throw new NotFoundException(
        'User not found',
      );
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ) {
    const user = await this.findOne(id);

    if (updateUserDto.password) {
      updateUserDto.password =
        await bcrypt.hash(
          updateUserDto.password,
          10,
        );
    }

    Object.assign(
      user,
      updateUserDto,
    );

    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    await this.usersRepository.remove(user);

    return {
      message:
        'User deleted successfully',
    };
  }
}