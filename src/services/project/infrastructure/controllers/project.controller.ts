import { Body, Controller, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiMicroserviceAuth } from '../../../../shared/microservice-guard/decorators/api-microservice-auth.decorator';
import {
  Delete,
  Get,
  Post,
  Put,
} from '../../../../shared/nest/http.decorators';
import { CreateProjectDto } from '../../domain/dtos/create-project.dto';
import { UpdateProjectDto } from '../../domain/dtos/update-project.dto';
import { ProjectServicePort } from '../../domain/project.service.port';

const NotFoundApiResponse = ApiResponse({
  status: 404,
  description: 'Project not found',
});

@ApiMicroserviceAuth()
@ApiTags('projects')
@Controller('/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectServicePort) {}

  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({ status: 201, description: 'Project successfully created' })
  @Post()
  createOne(@Body() dto: CreateProjectDto) {
    return this.projectService.createOne(dto);
  }

  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'Return all projects' })
  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @ApiOperation({ summary: 'Get a project by id' })
  @ApiResponse({ status: 200, description: 'Return the project' })
  @NotFoundApiResponse
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.projectService.findOneById(id);
  }

  @ApiOperation({ summary: 'Update a project' })
  @ApiResponse({ status: 200, description: 'Project successfully updated' })
  @NotFoundApiResponse
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectService.updateOne(id, dto);
  }

  @ApiOperation({ summary: 'Delete a project' })
  @ApiResponse({ status: 200, description: 'Project successfully deleted' })
  @NotFoundApiResponse
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.projectService.deleteOne(id);
  }
}
