import { HttpStatus } from '@nestjs/common';

export class ApiUnauthorizedResponseErrorBody {
  message: string = 'Unauthorized';
  error?: string = 'Unauthorized';
  statusCode: number = HttpStatus.UNAUTHORIZED;
}
