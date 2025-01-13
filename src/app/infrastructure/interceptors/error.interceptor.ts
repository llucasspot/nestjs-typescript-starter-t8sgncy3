import {
  CallHandler,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Logger } from '@nestjs/common/services/logger.service';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger(this.constructor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        this.logger.error(err, err.message, err.stack);

        const timestamp = new Date().toISOString();
        const path = context.switchToHttp().getRequest().url;

        if (err instanceof HttpException) {
          const response = err.getResponse();
          return throwError(() => ({
            statusCode: err.getStatus(),
            // @ts-expect-error response['error']
            error: response['error'] || err.name,
            // @ts-expect-error response['message']
            message: response['message'] || err.message,
            timestamp,
            path,
          }));
        }

        const internalServerErrorException = new InternalServerErrorException();
        return throwError(() => ({
          statusCode: internalServerErrorException.getStatus(),
          error: internalServerErrorException.name,
          message: internalServerErrorException.message,
          timestamp,
          path,
        }));
      }),
    );
  }
}
