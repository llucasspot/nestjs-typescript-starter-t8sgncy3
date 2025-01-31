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
import { CreateSchoolBody } from '../../../schools/domain/create-school.body';
import { UpdateSchoolBody } from '../../../schools/domain/update-school.body';
import { UserSchoolsServicePort } from '../../../user-schools/domain/user-schools.service.port';

const NotFoundApiResponse = ApiResponse({
  status: 404,
  description: 'School not found',
});

@ApiBearerAuth()
@ApiTags('your schools')
@Controller('/user/schools')
export class CurrentUserSchoolsController {
  constructor(private readonly userSchoolsService: UserSchoolsServicePort) {}

  @ApiOperation({ summary: 'Create a new school' })
  @ApiResponse({
    status: 201,
    description: 'School successfully created',
  })
  @Post()
  createOne(@User() user: UserI, @Body() body: CreateSchoolBody) {
    const userId = user.id;
    return this.userSchoolsService.createOne({ userId }, body);
  }

  @ApiOperation({ summary: 'Get all schools' })
  @ApiResponse({ status: 200, description: 'Return all schools' })
  @Get()
  findAll(@User() user: UserI) {
    const userId = user.id;
    return this.userSchoolsService.findAll({ userId });
  }

  @ApiOperation({ summary: 'Get a school by id' })
  @ApiResponse({ status: 200, description: 'Return the school' })
  @NotFoundApiResponse
  @Get(':schoolId')
  findOneById(@User() user: UserI, @Param('schoolId') schoolId: string) {
    const userId = user.id;
    return this.userSchoolsService.findOneById({ userId, schoolId });
  }

  @ApiOperation({ summary: 'Update a school' })
  @ApiResponse({
    status: 200,
    description: "User's school successfully updated",
  })
  @NotFoundApiResponse
  @Put(':schoolId')
  updateOne(
    @User() user: UserI,
    @Param('schoolId') schoolId: string,
    @Body() dto: UpdateSchoolBody,
  ) {
    const userId = user.id;
    return this.userSchoolsService.updateOne({ userId, schoolId }, dto);
  }

  @ApiOperation({ summary: 'Delete a school' })
  @ApiResponse({
    status: 200,
    description: 'School successfully deleted',
  })
  @NotFoundApiResponse
  @Delete(':schoolId')
  deleteOne(@User() user: UserI, @Param('schoolId') schoolId: string) {
    const userId = user.id;
    return this.userSchoolsService.deleteOne({ userId, schoolId });
  }
}
