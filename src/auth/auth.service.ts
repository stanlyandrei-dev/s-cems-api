import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { User } from '../users/users.entity';

import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser =
      await this.usersRepository.findOne({
        where: {
          email: registerDto.email,
        },
      });

    if (existingUser) {
      throw new ConflictException(
        'Email already exists',
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        registerDto.password,
        10,
      );

    const user =
      this.usersRepository.create({
        name: registerDto.name,
        email: registerDto.email,
        password: hashedPassword,
      });

    const savedUser =
      await this.usersRepository.save(user);

    const { password, ...result } = savedUser;

    return result;
  }

  async login(loginDto: LoginDto) {
    const user =
      await this.usersRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where(
          'user.email = :email',
          {
            email: loginDto.email,
          },
        )
        .getOne();

    if (!user) {
      throw new UnauthorizedException(
        'Invalid email or password',
      );
    }

    const passwordMatch =
      await bcrypt.compare(
        loginDto.password,
        user.password,
      );

    if (!passwordMatch) {
      throw new UnauthorizedException(
        'Invalid email or password',
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      message: 'Login successful',
      access_token:
        this.jwtService.sign(payload),
    };
  }
}