import { BaseStringUrl } from '../../../services/auth/modules/local/domain/jwt-sign-config.getter.port';
import {
  UserProjectsServiceFindAllBody,
  UserProjectsServiceFindOneBody,
} from '../../../services/user-projects/domain/user-projects.service.port';
import { Getter } from '../../core/getter';

export type EndpointConfig = {
  url: BaseStringUrl;
  query?: Record<string, string>;
  body?: object;
};

export type UserProjectsMicroserviceConfig = {
  findAllEndpoint: (body: UserProjectsServiceFindAllBody) => EndpointConfig;
  createOneEndpoint: (body: UserProjectsServiceFindAllBody) => EndpointConfig;
  findOneByIdEndpoint: (body: UserProjectsServiceFindOneBody) => EndpointConfig;
  updateOneEndpoint: (body: UserProjectsServiceFindOneBody) => EndpointConfig;
  deleteOneEndpoint: (body: UserProjectsServiceFindOneBody) => EndpointConfig;
};

export abstract class UserProjectsMicroserviceConfigGetterPort extends Getter<UserProjectsMicroserviceConfig> {}
