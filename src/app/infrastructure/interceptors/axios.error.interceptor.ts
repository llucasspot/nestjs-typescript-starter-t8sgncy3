import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from '@nestjs/common/services/logger.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AxiosError } from 'axios';

@Injectable()
export class AxiosErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger(this.constructor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        this.logger.error(err, err.message, err.stack);

        if (this.isAxiosError(err)) {
          const statusCode =
            err.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
          const message =
            // @ts-expect-error err.response?.data?.message
            err.response?.data?.message ||
            err.message ||
            'An error occurred during the HTTP request';

          return throwError(() => new HttpException(message, statusCode));
        }

        return throwError(() => err);
      }),
    );
  }

  private isAxiosError(err: any): err is AxiosError {
    return err.isAxiosError;
  }
}
