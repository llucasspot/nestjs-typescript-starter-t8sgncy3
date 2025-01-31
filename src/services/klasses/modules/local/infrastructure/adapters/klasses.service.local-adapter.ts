import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateKlassBody } from '../../../../domain/dtos/create-klass.body';
import { GetKlassBody } from '../../../../domain/dtos/get-klass.body';
import { KlassDto } from '../../../../domain/dtos/klass.dto';
import { UpdateKlassBody } from '../../../../domain/dtos/update-klass.body';
import { KlassesServicePort } from '../../../../domain/klasses.service.port';
import { KlassEntity } from '../../domain/klass.entity';
import { KlassesRepositoryPort } from '../../domain/ports/klasses-repository.port';

@Injectable()
export class KlassesServiceLocalAdapter implements KlassesServicePort {
  constructor(private readonly klassesRepository: KlassesRepositoryPort) {}

  async findAll(body?: GetKlassBody): Promise<KlassDto[]> {
    const entities = await this.klassesRepository.findAll(body);
    return entities.map(this.mapToDomain);
  }

  async createOne(body: CreateKlassBody): Promise<KlassDto> {
    const entity = await this.klassesRepository.create(body);
    return this.mapToDomain(entity);
  }

  async findOneById(id: string): Promise<KlassDto> {
    const entity = await this.klassesRepository.findById(id);
    if (!entity) {
      throw new NotFoundException('Klass not found');
    }
    return this.mapToDomain(entity);
  }

  async updateOne(id: string, body: UpdateKlassBody): Promise<KlassDto> {
    await this.findOneById(id);
    const entity = await this.klassesRepository.update(id, body);
    return this.mapToDomain(entity);
  }

  async deleteOne(id: string): Promise<void> {
    await this.findOneById(id);
    await this.klassesRepository.delete(id);
  }

  private mapToDomain(entity: KlassEntity): KlassDto {
    return plainToInstance(KlassDto, entity);
  }
}
