import { applyDecorators, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth as SwaggerApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtGuard } from '../infrastructure/strategy/jwt.guard';
import { ApiUnauthorizedResponseErrorBody } from './types/api-unauthorized-response-error-body';

export function ApiBearerAuth() {
  return applyDecorators(
    ApiUnauthorizedResponse({
      type: ApiUnauthorizedResponseErrorBody,
    }),
    SwaggerApiBearerAuth('userToken'),
    UseGuards(JwtGuard),
  );
}
