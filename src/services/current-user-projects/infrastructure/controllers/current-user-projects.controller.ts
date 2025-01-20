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
  User,
  UserI,
} from '../../../../shared/jwt-guard/decorators/user.decorator';
import { CreateProjectDto } from '../../../project/domain/dtos/create-project.dto';
import { UpdateProjectDto } from '../../../project/domain/dtos/update-project.dto';
import { UserProjectsServicePort } from '../../../user-projects/domain/user-projects.service.port';

@ApiBearerAuth()
@ApiTags('your projects')
@Controller('/user/projects')
export class CurrentUserProjectsController {
  constructor(private readonly userProjectsService: UserProjectsServicePort) {}

  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({
    status: 201,
    description: 'Project successfully created',
  })
  @Post()
  createOne(@User() user: UserI, @Body() body: CreateProjectDto) {
    const userId = user.id;
    return this.userProjectsService.createOne({ userId }, body);
  }

  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'Return all projects' })
  @Get()
  findAll(@User() user: UserI) {
    const userId = user.id;
    return this.userProjectsService.findAll({ userId });
  }

  @ApiOperation({ summary: 'Get a project by id' })
  @ApiResponse({ status: 200, description: 'Return the project' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @Get(':projectId')
  findOneById(@User() user: UserI, @Param('projectId') projectId: string) {
    const userId = user.id;
    return this.userProjectsService.findOneById({ userId, projectId });
  }

  @ApiOperation({ summary: 'Update a project' })
  @ApiResponse({
    status: 200,
    description: "User's project successfully updated",
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @Put(':projectId')
  updateOne(
    @User() user: UserI,
    @Param('projectId') projectId: string,
    @Body() dto: UpdateProjectDto,
  ) {
    const userId = user.id;
    return this.userProjectsService.updateOne({ userId, projectId }, dto);
  }

  @ApiOperation({ summary: 'Delete a project' })
  @ApiResponse({
    status: 200,
    description: 'Project successfully deleted',
  })
  @ApiResponse({ status: 404, description: 'Project not found' })
  @Delete(':projectId')
  deleteOne(@User() user: UserI, @Param('projectId') projectId: string) {
    const userId = user.id;
    return this.userProjectsService.deleteOne({ userId, projectId });
  }
}
