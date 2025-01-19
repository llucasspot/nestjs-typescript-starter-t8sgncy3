import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { MicroserviceGuard } from '../infrastructure/strategy/microservice.guard';
import { ApiUnauthorizedResponseErrorBody } from '../../jwt-guard/decorators/types/api-unauthorized-response-error-body';

export function ApiMicroserviceAuth() {
  return applyDecorators(
    ApiUnauthorizedResponse({
      type: ApiUnauthorizedResponseErrorBody,
    }),
    ApiBearerAuth('microserviceToken'),
    UseGuards(MicroserviceGuard),
  );
}
