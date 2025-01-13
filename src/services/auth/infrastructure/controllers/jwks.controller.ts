import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwksServicePort } from '../../../../shared/jwks/domain/jwks.service.port';

@ApiTags('auth')
@Controller('.well-known')
export class JwksController {
  constructor(private readonly jwksService: JwksServicePort) {}

  @ApiOperation({ summary: 'Get JWKS for token validation' })
  @ApiResponse({
    status: 200,
    description: 'Returns JWKS containing public keys for token validation',
  })
  @Get('jwks.json')
  getJwks() {
    return this.jwksService.getJwks();
  }
}
