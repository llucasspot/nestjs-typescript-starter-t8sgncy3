import {
  Abstract,
  applyDecorators,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CanActivate } from '@nestjs/common/interfaces';
import {
  ApiBearerAuth as SwaggerApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtGuard } from '../guards/jwt/jwt.guard';

export class ApiUnauthorizedResponseErrorData {
  message: string = 'Unauthorized';
  error?: string = 'Unauthorized';
  statusCode: number = HttpStatus.UNAUTHORIZED;
}

export function ApiBearerAuth() {
  const guards: Abstract<CanActivate>[] = [JwtGuard];
  return applyDecorators(
    ApiUnauthorizedResponse({
      type: ApiUnauthorizedResponseErrorData,
    }),
    SwaggerApiBearerAuth(),
    UseGuards(...guards),
  );
}
