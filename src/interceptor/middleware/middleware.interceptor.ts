import {
  ArgumentsHost,
  CallHandler,
  Catch,
  ExceptionFilter,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from 'express';

class MainResponse {
  statusCode?: HttpStatus;
  result: any;
  metadata?: Record<string, any>;
}
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any | MainResponse> {
    return next.handle().pipe(
      map((res: any | MainResponse) => {
        return {
          result: res?.result || res,
          status: res?.statusCode || HttpStatus.OK,
          status_code: res?.statusCode || HttpStatus.OK,
          total_item: res?.metadata?.total_item || undefined,
        };
      }),
    );
  }
}

@Catch(HttpException)
export class TransformExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const error = exception.getResponse() as any;
    const status = exception.getStatus();
    response.status(status).json({
      result: {},
      status: status,
      statusCode: status,
      error: error.message ? error.message : [error],
      metadata: {},
    });
  }
}
