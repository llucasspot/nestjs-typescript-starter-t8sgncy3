import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigPort } from '../../../../shared/config/domain/ports/config.port';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configPort: ConfigPort) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configPort.jwtSecret,
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}
