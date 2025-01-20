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
import { CreateSchoolDto } from '../../../schools/domain/create-school.dto';
import { UpdateSchoolDto } from '../../../schools/domain/update-school.dto';
import { SchoolsServicePort } from '../../domain/schools.service.port';

@ApiMicroserviceAuth()
@ApiTags('schools')
@Controller('/schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsServicePort) {}

  @ApiOperation({ summary: 'Create a new school' })
  @ApiResponse({ status: 201, description: 'School successfully created' })
  @Post()
  createOne(@Body() body: CreateSchoolDto) {
    return this.schoolsService.createOne(body);
  }

  @ApiOperation({ summary: 'Get all schools' })
  @ApiResponse({ status: 200, description: 'Return all schools' })
  @Get()
  findAll() {
    return this.schoolsService.findAll();
  }

  @ApiOperation({ summary: 'Get a school by id' })
  @ApiResponse({ status: 200, description: 'Return the school' })
  @ApiResponse({ status: 404, description: 'School not found' })
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.schoolsService.findOneById(id);
  }

  @ApiOperation({ summary: 'Update a school' })
  @ApiResponse({ status: 200, description: 'School successfully updated' })
  @ApiResponse({ status: 404, description: 'School not found' })
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() body: UpdateSchoolDto) {
    return this.schoolsService.updateOne(id, body);
  }

  @ApiOperation({ summary: 'Delete a school' })
  @ApiResponse({ status: 200, description: 'School successfully deleted' })
  @ApiResponse({ status: 404, description: 'School not found' })
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.schoolsService.deleteOne(id);
  }
}
