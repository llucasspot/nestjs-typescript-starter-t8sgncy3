import { Body, Controller, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiMicroserviceAuth } from '../../../../shared/microservice-guard/decorators/api-microservice-auth.decorator';
import {
  Delete,
  Get,
  Post,
  Put,
} from '../../../../shared/nest/http.decorators';
import { CreateProjectDto } from '../../../project/domain/dtos/create-project.dto';
import { UpdateProjectDto } from '../../../project/domain/dtos/update-project.dto';
import { UserProjectsServicePort } from '../../domain/user-projects.service.port';

const NotFoundApiResponse = ApiResponse({
  status: 404,
  description: "User's project not found",
});

@ApiMicroserviceAuth()
@ApiTags('user projects')
@Controller('/users/:userId/projects')
export class UserProjectsController {
  constructor(private readonly userProjectsService: UserProjectsServicePort) {}

  @ApiOperation({ summary: "Create a new user's project" })
  @ApiResponse({
    status: 201,
    description: "User's project successfully created",
  })
  @Post()
  createOne(@Param('userId') userId: string, @Body() dto: CreateProjectDto) {
    return this.userProjectsService.createOne({ userId }, dto);
  }

  @ApiOperation({ summary: "Get all user's projects" })
  @ApiResponse({ status: 200, description: "Return all user's projects" })
  @Get()
  findAll(@Param('userId') userId: string) {
    return this.userProjectsService.findAll({ userId });
  }

  @ApiOperation({ summary: "Get a user's project by id" })
  @ApiResponse({ status: 200, description: "Return the user's project" })
  @NotFoundApiResponse
  @Get(':projectId')
  findOneById(
    @Param('userId') userId: string,
    @Param('projectId') projectId: string,
  ) {
    return this.userProjectsService.findOneById({ userId, projectId });
  }

  @ApiOperation({ summary: "Update a user's project" })
  @ApiResponse({
    status: 200,
    description: "User's project successfully updated",
  })
  @NotFoundApiResponse
  @Put(':projectId')
  updateOne(
    @Param('userId') userId: string,
    @Param('projectId') projectId: string,
    @Body() dto: UpdateProjectDto,
  ) {
    return this.userProjectsService.updateOne({ userId, projectId }, dto);
  }

  @ApiOperation({ summary: "Delete a user's project" })
  @ApiResponse({
    status: 200,
    description: "User's project successfully deleted",
  })
  @NotFoundApiResponse
  @Delete(':projectId')
  deleteOne(
    @Param('userId') userId: string,
    @Param('projectId') projectId: string,
  ) {
    return this.userProjectsService.deleteOne({ userId, projectId });
  }
}
