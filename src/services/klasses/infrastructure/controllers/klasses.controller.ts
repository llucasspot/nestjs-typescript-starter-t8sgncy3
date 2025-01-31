import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiMicroserviceAuth } from '../../../../shared/microservice-guard/decorators/api-microservice-auth.decorator';
import { CreateKlassBody } from '../../domain/dtos/create-klass.body';
import { UpdateKlassBody } from '../../domain/dtos/update-klass.body';
import { KlassesServicePort } from '../../domain/klasses.service.port';

@ApiMicroserviceAuth()
@ApiTags('klasses')
@Controller('/klasses')
export class KlassesController {
  constructor(private readonly klassesService: KlassesServicePort) {}

  @ApiOperation({ summary: 'Create a new klass' })
  @ApiResponse({ status: 201, description: 'Klass successfully created' })
  @Post()
  createOne(@Body() body: CreateKlassBody) {
    return this.klassesService.createOne(body);
  }

  @ApiOperation({ summary: 'Get all klasses' })
  @ApiResponse({ status: 200, description: 'Return all klasses' })
  @Get()
  findAll() {
    return this.klassesService.findAll();
  }

  @ApiOperation({ summary: 'Get a klass by id' })
  @ApiResponse({ status: 200, description: 'Return the klass' })
  @ApiResponse({ status: 404, description: 'Klass not found' })
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.klassesService.findOneById(id);
  }

  @ApiOperation({ summary: 'Update a klass' })
  @ApiResponse({ status: 200, description: 'Klass successfully updated' })
  @ApiResponse({ status: 404, description: 'Klass not found' })
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() body: UpdateKlassBody) {
    return this.klassesService.updateOne(id, body);
  }

  @ApiOperation({ summary: 'Delete a klass' })
  @ApiResponse({ status: 200, description: 'Klass successfully deleted' })
  @ApiResponse({ status: 404, description: 'Klass not found' })
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.klassesService.deleteOne(id);
  }
}
