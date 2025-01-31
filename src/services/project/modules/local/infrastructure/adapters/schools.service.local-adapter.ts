import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateSchoolBody } from '../../../../../schools/domain/create-school.body';
import { GetSchoolBody } from '../../../../../schools/domain/get-school.body';
import { SchoolDto } from '../../../../../schools/domain/school.dto';
import { UpdateSchoolBody } from '../../../../../schools/domain/update-school.body';
import { SchoolsServicePort } from '../../../../domain/schools.service.port';
import { ProjectEmitterPort } from '../../domain/ports/project.emitter.port';
import { SchoolRepositoryPort } from '../../domain/ports/school-repository.port';
import { SchoolEntity } from '../../domain/school.entity';

@Injectable()
export class SchoolsServiceLocalAdapter implements SchoolsServicePort {
  constructor(
    private readonly schoolRepository: SchoolRepositoryPort,
    private readonly projectEmitter: ProjectEmitterPort,
  ) {}

  async findAll(body?: GetSchoolBody): Promise<SchoolDto[]> {
    const entities = await this.schoolRepository.findAll(body);
    return entities.map(this.mapToDomain);
  }

  async createOne(body: CreateSchoolBody): Promise<SchoolDto> {
    const entity = await this.schoolRepository.create(body);
    return this.mapToDomain(entity);
  }

  async findOneById(id: string): Promise<SchoolDto> {
    const entity = await this.schoolRepository.findById(id);
    if (!entity) {
      throw new NotFoundException('School not found');
    }
    return this.mapToDomain(entity);
  }

  async updateOne(id: string, body: UpdateSchoolBody): Promise<SchoolDto> {
    await this.findOneById(id);
    const entity = await this.schoolRepository.update(id, body);
    return this.mapToDomain(entity);
  }

  async deleteOne(id: string): Promise<void> {
    await this.findOneById(id);
    await this.schoolRepository.delete(id);
    await this.projectEmitter.emit('school deleted', { id });
  }

  private mapToDomain(entity: SchoolEntity): SchoolDto {
    return plainToInstance(SchoolDto, entity);
  }
}
