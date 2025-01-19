import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '../../../../shared/jwt-guard/decorators/api-bearer-auth.decorator';
import {
  User,
  UserI,
} from '../../../../shared/jwt-guard/decorators/user.decorator';
import { UserServicePort } from '../../../auth/domain/user-service/user.service.port';

@ApiBearerAuth()
@ApiTags('your info')
@Controller('/user')
export class CurrentUserController {
  constructor(private readonly userService: UserServicePort) {}

  @ApiOperation({ summary: "Get your user's info" })
  @ApiResponse({ status: 200, description: "Return your user's info" })
  @ApiResponse({ status: 404, description: "User's info not found" })
  @Get()
  getInfo(@User() user: UserI) {
    const id = user.id;
    return this.userService.getUser({ id });
  }
}
