import {
  applyDecorators,
  Delete as NestDelete,
  Get as NestGet,
  Patch as NestPatch,
  Post as NestPost,
  Put as NestPut,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

function ApiOperationId(): MethodDecorator {
  return (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const operationId = propertyKey.toString();
    ApiOperation({ operationId })(target, propertyKey, descriptor);
  };
}

export function Get(path?: string | string[]) {
  return applyDecorators(NestGet(path), ApiOperationId());
}

export function Post(path?: string | string[]) {
  return applyDecorators(NestPost(path), ApiOperationId());
}

export function Patch(path?: string | string[]) {
  return applyDecorators(NestPatch(path), ApiOperationId());
}

export function Put(path?: string | string[]) {
  return applyDecorators(NestPut(path), ApiOperationId());
}

export function Delete(path?: string | string[]) {
  return applyDecorators(NestDelete(path), ApiOperationId());
}
