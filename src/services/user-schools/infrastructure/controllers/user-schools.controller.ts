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
import { UserSchoolsServicePort } from '../../domain/user-schools.service.port';

@ApiMicroserviceAuth()
@ApiTags('user schools')
@Controller('/users/:userId/schools')
export class UserSchoolsController {
  constructor(private readonly userSchoolsService: UserSchoolsServicePort) {}

  @ApiOperation({ summary: "Create a new user's school" })
  @ApiResponse({
    status: 201,
    description: "User's school successfully created",
  })
  @Post()
  createOne(@Param('userId') userId: string, @Body() dto: CreateSchoolDto) {
    return this.userSchoolsService.createOne({ userId }, dto);
  }

  @ApiOperation({ summary: "Get all user's schools" })
  @ApiResponse({ status: 200, description: "Return all user's schools" })
  @Get()
  findAll(@Param('userId') userId: string) {
    return this.userSchoolsService.findAll({ userId });
  }

  @ApiOperation({ summary: "Get a user's school by id" })
  @ApiResponse({ status: 200, description: "Return the user's school" })
  @ApiResponse({ status: 404, description: "User's school not found" })
  @Get(':schoolId')
  findOneById(
    @Param('userId') userId: string,
    @Param('schoolId') schoolId: string,
  ) {
    return this.userSchoolsService.findOneById({ userId, schoolId });
  }

  @ApiOperation({ summary: "Update a user's school" })
  @ApiResponse({
    status: 200,
    description: "User's school successfully updated",
  })
  @ApiResponse({ status: 404, description: "User's school not found" })
  @Put(':schoolId')
  updateOne(
    @Param('userId') userId: string,
    @Param('schoolId') schoolId: string,
    @Body() dto: UpdateSchoolDto,
  ) {
    return this.userSchoolsService.updateOne({ userId, schoolId }, dto);
  }

  @ApiOperation({ summary: "Delete a user's school" })
  @ApiResponse({
    status: 200,
    description: "User's school successfully deleted",
  })
  @ApiResponse({ status: 404, description: "User's school not found" })
  @Delete(':schoolId')
  deleteOne(
    @Param('userId') userId: string,
    @Param('schoolId') schoolId: string,
  ) {
    return this.userSchoolsService.deleteOne({ userId, schoolId });
  }
}
