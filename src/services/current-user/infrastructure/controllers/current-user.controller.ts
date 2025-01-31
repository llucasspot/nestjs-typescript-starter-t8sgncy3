import { Controller } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '../../../../shared/jwt-guard/decorators/api-bearer-auth.decorator';
import {
  User,
  UserI,
} from '../../../../shared/jwt-guard/decorators/user.decorator';
import { Get } from '../../../../shared/nest/http.decorators';
import { UserServicePort } from '../../../auth/domain/user-service/user.service.port';

const NotFoundApiResponse = ApiResponse({
  status: 404,
  description: "User's info not found",
});

@ApiBearerAuth()
@ApiTags('your info')
@Controller('/user')
export class CurrentUserController {
  constructor(private readonly userService: UserServicePort) {}

  @ApiOperation({ summary: "Get your user's info" })
  @ApiResponse({ status: 200, description: "Return your user's info" })
  @NotFoundApiResponse
  @Get()
  getInfo(@User() user: UserI) {
    const id = user.id;
    return this.userService.getUser({ id });
  }
}
