import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiBearerAuth } from '../../../../shared/jwt-guard/decorators/api-bearer-auth.decorator';
import {
  User,
  UserI,
} from '../../../../shared/jwt-guard/decorators/user.decorator';
import { SignInDto, SignUpDto } from '../../domain/dtos/auth.dto';
import { AuthServicePort } from '../../domain/auth.service.port';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthServicePort) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post('signup')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @ApiOperation({ summary: 'Login with credentials' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('signin')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @ApiBearerAuth()
  @Get('lala')
  lala(@User() user: UserI) {
    return user;
  }
}
