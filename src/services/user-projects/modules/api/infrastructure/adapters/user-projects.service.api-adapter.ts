import { Injectable, Logger } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import {
  UserProjectsMicroserviceConfig,
  UserProjectsMicroserviceConfigGetterPort,
} from '../../../../../../shared/config/domain/user-projects-microservice-config.getter.port';
import { HttpAxiosClient } from '../../../../../../shared/http/axios/http-axios.client';
import { MicroserviceTokenGetterPort } from '../../../../../../shared/jwt-guard/microservice-guard/domain/microservice-token.getter.port';
import {
  CreateProjectDto,
  UpdateProjectDto,
} from '../../../../../project/domain/dtos/project.dto';
import { Project } from '../../../../../project/domain/dtos/project.entity';
import {
  UserProjectsServiceFindAllBody,
  UserProjectsServiceFindOneBody,
  UserProjectsServicePort,
} from '../../../../domain/user-projects.service.port';

@Injectable()
export class UserProjectsServiceApiAdapter implements UserProjectsServicePort {
  private readonly client: HttpAxiosClient;
  private readonly config: UserProjectsMicroserviceConfig;

  constructor(
    userProjectsMicroserviceConfigGetter: UserProjectsMicroserviceConfigGetterPort,
    private readonly microserviceTokenGetter: MicroserviceTokenGetterPort,
  ) {
    this.client = new HttpAxiosClient(
      new Logger('UserProjectsServiceApiAdapter'),
    );
    this.config = userProjectsMicroserviceConfigGetter.get();
  }

  async findAll(findBody: UserProjectsServiceFindAllBody): Promise<Project[]> {
    const { url, query } = this.config.findAllEndpoint(findBody);
    const accessToken = await this.microserviceTokenGetter.get();
    const config: AxiosRequestConfig = {
      params: query,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await this.client.get<Project[]>(url, config);
    return response.data;
  }

  async createOne(
    findBody: UserProjectsServiceFindAllBody,
    createBody: CreateProjectDto,
  ): Promise<Project> {
    const {
      url,
      query,
      body: endpointConfBody,
    } = this.config.findAllEndpoint(findBody);
    const accessToken = await this.microserviceTokenGetter.get();
    const config: AxiosRequestConfig = {
      params: query,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const body = {
      ...createBody,
      ...endpointConfBody,
    };
    const response = await this.client.post<Project>(url, body, config);
    return response.data;
  }

  async findOneById(
    findBody: UserProjectsServiceFindOneBody,
  ): Promise<Project> {
    const { url, query } = this.config.findAllEndpoint(findBody);
    const accessToken = await this.microserviceTokenGetter.get();
    const config: AxiosRequestConfig = {
      params: query,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await this.client.get<Project>(url, config);
    return response.data;
  }

  async updateOne(
    findBody: UserProjectsServiceFindOneBody,
    updateBody: UpdateProjectDto,
  ): Promise<Project> {
    const {
      url,
      query,
      body: endpointConfBody,
    } = this.config.findAllEndpoint(findBody);
    const accessToken = await this.microserviceTokenGetter.get();
    const config: AxiosRequestConfig = {
      params: query,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const body = {
      ...updateBody,
      ...endpointConfBody,
    };
    const response = await this.client.put<Project>(url, body, config);
    return response.data;
  }

  async deleteOne(findBody: UserProjectsServiceFindOneBody): Promise<void> {
    const { url, query } = this.config.findAllEndpoint(findBody);
    const accessToken = await this.microserviceTokenGetter.get();
    const config: AxiosRequestConfig = {
      params: query,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    const response = await this.client.delete<void>(url, config);
    return response.data;
  }
}
