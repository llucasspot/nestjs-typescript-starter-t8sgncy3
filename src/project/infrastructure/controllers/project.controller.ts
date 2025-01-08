import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/infrastructure/guards/jwt-auth.guard';
import { ProjectService } from '../../application/services/project.service';
import {
  CreateProjectDto,
  UpdateProjectDto,
} from '../../application/dtos/project.dto';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() dto: CreateProjectDto, @Request() req) {
    return this.projectService.create(dto, req.user.id);
  }

  @Get()
  findAll(@Request() req) {
    return this.projectService.findByUserId(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.delete(id);
  }
}
