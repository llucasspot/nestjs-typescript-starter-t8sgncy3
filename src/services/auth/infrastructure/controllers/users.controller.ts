import { Body, Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiMicroserviceAuth } from '../../../../shared/microservice-guard/decorators/api-microservice-auth.decorator';
import { Get, Post } from '../../../../shared/nest/http.decorators';
import { CreateUserBody } from '../../domain/user-service/dtos/create-user.body';
import { UserServicePort } from '../../domain/user-service/user.service.port';

@ApiMicroserviceAuth()
@ApiTags('users')
@Controller('/users')
export class UsersController {
  constructor(private readonly userService: UserServicePort) {}

  @Post()
  createUser(@Body() body: CreateUserBody) {
    return this.userService.createUser(body);
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return this.userService.getUser({ id: userId });
  }
}
