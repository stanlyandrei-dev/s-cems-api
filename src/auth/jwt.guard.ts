import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request =
      context.switchToHttp().getRequest();

    const authHeader =
      request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException(
        'Authorization token required',
      );
    }

    const [type, token] =
      authHeader.split(' ');

    if (
      type !== 'Bearer' ||
      !token
    ) {
      throw new UnauthorizedException(
        'Invalid authorization format',
      );
    }

    try {
      request.user =
        this.jwtService.verify(token);

      return true;
    } catch {
      throw new UnauthorizedException(
        'Invalid or expired token',
      );
    }
  }
}