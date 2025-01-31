import { Body, Controller, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '../../../../shared/jwt-guard/decorators/api-bearer-auth.decorator';
import {
  User,
  UserI,
} from '../../../../shared/jwt-guard/decorators/user.decorator';
import {
  Delete,
  Get,
  Post,
  Put,
} from '../../../../shared/nest/http.decorators';
import { CreateProjectKlassBody } from '../../../klasses/domain/dtos/create-klass.body';
import { UpdateProjectKlassBody } from '../../../klasses/domain/dtos/update-klass.body';
import { KlassesServicePort } from '../../../klasses/domain/klasses.service.port';

const NotFoundApiResponse = ApiResponse({
  status: 404,
  description: "project's klass not found",
});

@ApiBearerAuth()
@ApiTags("your project's klasses")
@Controller('/user/projects/:projectId/klasses')
export class CurrentUserProjectKlassesController {
  constructor(private readonly klassesService: KlassesServicePort) {}

  @ApiOperation({ summary: "Create a new project's klass" })
  @ApiResponse({
    status: 201,
    description: 'Klass successfully created',
  })
  @Post()
  createOne(
    @User() user: UserI,
    @Param('projectId') projectId: string,
    @Body() body: CreateProjectKlassBody,
  ) {
    return this.klassesService.createOne({ projectId, ...body });
  }

  @ApiOperation({ summary: "Get all project's klass" })
  @ApiResponse({ status: 200, description: "Return all project's klass" })
  @Get()
  findAll(@User() user: UserI, @Param('projectId') projectId: string) {
    return this.klassesService.findAll({ projectId });
  }

  @ApiOperation({ summary: "Get a project's klass by id" })
  @ApiResponse({ status: 200, description: "Return the project's klass" })
  @NotFoundApiResponse
  @Get(':klassId')
  findOneById(
    @User() user: UserI,
    @Param('projectId') projectId: string,
    @Param('klassId') id: string,
  ) {
    return this.klassesService.findOneById(id);
  }

  @ApiOperation({ summary: "Update a project's klas" })
  @ApiResponse({
    status: 200,
    description: "User's project's klass successfully updated",
  })
  @NotFoundApiResponse
  @Put(':klassId')
  updateOne(
    @User() user: UserI,
    @Param('projectId') projectId: string,
    @Param('klassId') id: string,
    @Body() body: UpdateProjectKlassBody,
  ) {
    return this.klassesService.updateOne(id, body);
  }

  @ApiOperation({ summary: 'Delete a project' })
  @ApiResponse({
    status: 200,
    description: "Project's klass successfully deleted",
  })
  @NotFoundApiResponse
  @Delete(':projectId')
  deleteOne(
    @User() user: UserI,
    @Param('projectId') projectId: string,
    @Param('klassId') id: string,
  ) {
    return this.klassesService.deleteOne(id);
  }
}
