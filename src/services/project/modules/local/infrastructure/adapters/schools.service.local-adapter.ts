import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateSchoolDto } from '../../../../../schools/domain/create-school.dto';
import { SchoolDto } from '../../../../../schools/domain/school.dto';
import { UpdateSchoolDto } from '../../../../../schools/domain/update-school.dto';
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

  async findAll(schoolIds?: string[]): Promise<SchoolDto[]> {
    const schoolEntity = await this.schoolRepository.findAll(schoolIds);
    return schoolEntity.map(this.mapToDomain);
  }

  async createOne(body: CreateSchoolDto): Promise<SchoolDto> {
    const schoolEntity = await this.schoolRepository.create(body);
    return this.mapToDomain(schoolEntity);
  }

  async findOneById(id: string): Promise<SchoolDto> {
    const schoolEntity = await this.schoolRepository.findById(id);
    if (!schoolEntity) {
      throw new NotFoundException('School not found');
    }
    return this.mapToDomain(schoolEntity);
  }

  async updateOne(id: string, body: UpdateSchoolDto): Promise<SchoolDto> {
    await this.findOneById(id);
    const schoolEntity = await this.schoolRepository.update(id, body);
    return this.mapToDomain(schoolEntity);
  }

  async deleteOne(schoolId: string): Promise<void> {
    await this.findOneById(schoolId);
    await this.schoolRepository.delete(schoolId);
    await this.projectEmitter.emit('school deleted', { schoolId });
  }

  private mapToDomain(schoolEntity: SchoolEntity): SchoolDto {
    return plainToInstance(SchoolDto, schoolEntity);
  }
}
