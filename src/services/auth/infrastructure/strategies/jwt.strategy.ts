import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigPort } from '../../../../shared/config/domain/ports/config.port';
import { PublicKeyGetterPort } from '../../domain/ports/public-key.getter.port';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configPort: ConfigPort,
    private readonly publicKeyGetter: PublicKeyGetterPort,
  ) {
    const { algorithms, issuer, audience } = configPort.jwtVerifyOptions;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: async <TDoneResult>(
        req: any,
        token: string,
        done: (err: any, publicKey: string | null) => TDoneResult,
      ) => {
        const publicKey = publicKeyGetter.get({ token });
        return done(null, publicKey);
      },
      algorithms,
      issuer,
      audience,
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}
