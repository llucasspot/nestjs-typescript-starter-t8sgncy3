import { Injectable } from '@nestjs/common';
import { BaseStringUrl } from '../../../../services/auth/modules/local/domain/jwt-sign-config.getter.port';
import {
  UserProjectsServiceFindAllBody,
  UserProjectsServiceFindOneBody,
} from '../../../../services/user-projects/domain/user-projects.service.port';
import { UserProjectsMicroserviceConfigGetterPort } from '../../domain/user-projects-microservice-config.getter.port';

@Injectable()
export class UserProjectsMicroserviceConfigGetterEnvAdapter
  implements UserProjectsMicroserviceConfigGetterPort
{
  get() {
    return {
      findAllEndpoint: ({ userId }: UserProjectsServiceFindAllBody) => ({
        url: buildStringUrl(
          'findAllEndpoint',
          'http://localhost:3000/api/users/:userId/projects/',
        ).replace(':userId', userId) as BaseStringUrl,
      }),
      createOneEndpoint: ({ userId }: UserProjectsServiceFindAllBody) => ({
        url: buildStringUrl(
          'findAllEndpoint',
          'http://localhost:3000/api/users/:userId/projects/',
        ).replace(':userId', userId) as BaseStringUrl,
      }),
      findOneByIdEndpoint: ({
        userId,
        projectId,
      }: UserProjectsServiceFindOneBody) => ({
        url: buildStringUrl(
          'findAllEndpoint',
          'http://localhost:3000/api/users/:userId/projects/:projectId/',
        )
          .replace(':userId', userId)
          .replace(':projectId', projectId) as BaseStringUrl,
      }),
      updateOneEndpoint: ({
        userId,
        projectId,
      }: UserProjectsServiceFindOneBody) => ({
        url: buildStringUrl(
          'findAllEndpoint',
          'http://localhost:3000/api/users/:userId/projects/:projectId/',
        )
          .replace(':userId', userId)
          .replace(':projectId', projectId) as BaseStringUrl,
      }),
      deleteOneEndpoint: ({
        userId,
        projectId,
      }: UserProjectsServiceFindOneBody) => ({
        url: buildStringUrl(
          'findAllEndpoint',
          'http://localhost:3000/api/users/:userId/projects/:projectId/',
        )
          .replace(':userId', userId)
          .replace(':projectId', projectId) as BaseStringUrl,
      }),
    };
  }
}

function buildStringUrl(
  processEnvVariableKey: string,
  defaultValue: BaseStringUrl,
): BaseStringUrl {
  return (
    (process.env[
      `MICROSERVICE_USER_PROJECTS_${processEnvVariableKey}`
    ] as BaseStringUrl) || defaultValue
  );
}
