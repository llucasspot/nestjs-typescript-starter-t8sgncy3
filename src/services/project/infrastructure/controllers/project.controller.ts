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
import { ApiBearerAuth } from '../../../../shared/jwt-guard/decorators/api-bearer-auth.decorator';
import {
  CreateProjectDto,
  UpdateProjectDto,
} from '../../domain/dtos/project.dto';
import { ProjectServicePort } from '../../domain/project.service.port';

@ApiBearerAuth()
@ApiTags('projects')
@Controller('projects')
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
  @ApiResponse({ status: 404, description: 'Project not found' })
  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.projectService.findOneById(id);
  }

  @ApiOperation({ summary: 'Update a project' })
  @ApiResponse({ status: 200, description: 'Project successfully updated' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectService.updateOne(id, dto);
  }

  @ApiOperation({ summary: 'Delete a project' })
  @ApiResponse({ status: 200, description: 'Project successfully deleted' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.projectService.deleteOne(id);
  }
}
