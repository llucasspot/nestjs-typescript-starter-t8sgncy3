import { Injectable, NotFoundException } from '@nestjs/common';
import { SchoolsServicePort } from '../../../../../project/domain/schools.service.port';
import { CreateSchoolBody } from '../../../../../schools/domain/create-school.body';
import { SchoolDto } from '../../../../../schools/domain/school.dto';
import { UpdateSchoolBody } from '../../../../../schools/domain/update-school.body';
import {
  UserSchoolsServiceFindAllBody,
  UserSchoolsServiceFindOneBody,
  UserSchoolsServicePort,
} from '../../../../domain/user-schools.service.port';
import { UserSchoolsRepositoryPort } from '../../domain/ports/user-schools-repository.port';

@Injectable()
export class UserSchoolsServiceLocalAdapter implements UserSchoolsServicePort {
  constructor(
    private readonly userSchoolsRepository: UserSchoolsRepositoryPort,
    private readonly schoolsService: SchoolsServicePort,
  ) {}

  async findAll({
    userId,
  }: UserSchoolsServiceFindAllBody): Promise<SchoolDto[]> {
    const userSchools = await this.userSchoolsRepository.findAll({
      userId,
    });
    return this.schoolsService.findAll({
      id: userSchools.map(({ schoolId }) => schoolId),
    });
  }

  async createOne(
    { userId }: UserSchoolsServiceFindAllBody,
    body: CreateSchoolBody,
  ): Promise<SchoolDto> {
    const school = await this.schoolsService.createOne(body);
    await this.userSchoolsRepository.create({
      userId,
      schoolId: school.id,
    });
    return school;
  }

  async findOneById({
    userId,
    schoolId,
  }: UserSchoolsServiceFindOneBody): Promise<SchoolDto> {
    const userSchool = await this.userSchoolsRepository.findOne({
      userId,
      schoolId,
    });
    if (!userSchool) {
      throw new NotFoundException('User school not found');
    }
    return this.schoolsService.findOneById(schoolId);
  }

  async updateOne(
    { userId, schoolId }: UserSchoolsServiceFindOneBody,
    body: UpdateSchoolBody,
  ): Promise<SchoolDto> {
    const userSchool = await this.userSchoolsRepository.findOne({
      userId,
      schoolId,
    });
    if (!userSchool) {
      throw new NotFoundException('User school not found');
    }
    return this.schoolsService.updateOne(schoolId, body);
  }

  async deleteOne({
    userId,
    schoolId,
  }: UserSchoolsServiceFindOneBody): Promise<void> {
    const userSchool = await this.userSchoolsRepository.findOne({
      userId,
      schoolId,
    });
    if (!userSchool) {
      throw new NotFoundException('User school not found');
    }
    return this.schoolsService.deleteOne(schoolId);
  }
}
