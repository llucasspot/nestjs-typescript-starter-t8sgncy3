import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../application/services/auth.service';
import { SignUpDto, SignInDto } from '../../application/dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }
}
