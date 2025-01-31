import { Body, Controller, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiMicroserviceAuth } from '../../../../shared/microservice-guard/decorators/api-microservice-auth.decorator';
import {
  Delete,
  Get,
  Post,
  Put,
} from '../../../../shared/nest/http.decorators';
import { CreateSchoolBody } from '../../../schools/domain/create-school.body';
import { UpdateSchoolBody } from '../../../schools/domain/update-school.body';
import { SchoolsServicePort } from '../../domain/schools.service.port';

const NotFoundApiResponse = ApiResponse({
  status: 404,
  description: 'School not found',
});

@ApiMicroserviceAuth()
@ApiTags('schools')
@Controller('/schools')
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsServicePort) {}

  @ApiOperation({ summary: 'Create a new school' })
  @ApiResponse({ status: 201, description: 'School successfully created' })
  @Post()
  createOne(@Body() body: CreateSchoolBody) {
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
  @NotFoundApiResponse
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() body: UpdateSchoolBody) {
    return this.schoolsService.updateOne(id, body);
  }

  @ApiOperation({ summary: 'Delete a school' })
  @ApiResponse({ status: 200, description: 'School successfully deleted' })
  @NotFoundApiResponse
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.schoolsService.deleteOne(id);
  }
}
