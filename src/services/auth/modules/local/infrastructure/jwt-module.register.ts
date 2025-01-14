import { InternalServerErrorException } from '@nestjs/common';
import { JwtModule, JwtModuleOptions, JwtSecretRequestType } from '@nestjs/jwt';
import { PrivateKeyPemGetter } from '../../../../../shared/jwks/modules/local/application/private-key-pem.getter';
import { JwtConfigModule } from '../../../../../shared/jwt-guard/infrastructure/jwt.config.module';
import { PublicKeyGetter } from '../../../../../shared/public-key/domain/public-key.getter';
import { PublicKeyModule } from '../../../../../shared/public-key/infrastructure/public-key.module';
import { JwtSignConfigGetterPort } from '../domain/jwt-sign-config.getter.port';
import { JwtVerifyConfigGetterPort } from '../../../../../shared/jwt-guard/domain/jwt-verify-config.getter.port';
import { AuthConfModule } from './auth-conf.module';

export const JwtModuleRegister = () =>
  JwtModule.registerAsync({
    imports: [AuthConfModule, JwtConfigModule, PublicKeyModule],
    inject: [
      JwtSignConfigGetterPort,
      JwtVerifyConfigGetterPort,
      PublicKeyGetter,
      PrivateKeyPemGetter,
    ],
    useFactory: async (
      jwtSignConfigGetter: JwtSignConfigGetterPort,
      jwtVerifyConfigGetter: JwtVerifyConfigGetterPort,
      publicKeyGetter: PublicKeyGetter,
      privateKeyPemGetter: PrivateKeyPemGetter,
    ) => {
      const privateKeyPem = await privateKeyPemGetter.get();

      const secretOrKeyProvider: JwtModuleOptions['secretOrKeyProvider'] =
        async (requestType, tokenOrPayload) => {
          if (requestType === JwtSecretRequestType.SIGN) {
            return privateKeyPem;
          }
          if (requestType === JwtSecretRequestType.VERIFY) {
            const token = tokenOrPayload as string;
            return publicKeyGetter.getByToken({ token });
          }
          throw new InternalServerErrorException('impossible request type');
        };

      const jwtSignConfig = jwtSignConfigGetter.get();
      const jwtVerifyConfig = jwtVerifyConfigGetter.get();
      const jwk = await publicKeyGetter.getJwkByKid({ kid: '1' });
      return {
        secretOrKeyProvider,
        signOptions: {
          expiresIn: jwtSignConfig.expiresIn,
          issuer: jwtSignConfig.issuer,
          audience: jwtSignConfig.audience,
          algorithm: jwk.alg,
          keyid: jwk.kid,
        },
        verifyOptions: {
          algorithms: [...jwtVerifyConfig.algorithms],
          audience: jwtVerifyConfig.audience,
          issuer: jwtVerifyConfig.issuer,
          ignoreExpiration: false,
        },
      };
    },
  });
