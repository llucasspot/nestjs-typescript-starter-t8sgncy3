import { InternalServerErrorException } from '@nestjs/common';
import { JwtModule, JwtModuleOptions, JwtSecretRequestType } from '@nestjs/jwt';
import { JwksServicePort } from '../../../../../shared/jwks/domain/jwks.service.port';
import { SignJwkGetterPort } from '../../../../../shared/private-key/domain/sign-jwk.getter.port';
import { PrivateKeyModule } from '../../../../../shared/private-key/infrastructure/private-key.module';
import { PublicKeyGetter } from '../../../../../shared/public-key/domain/public-key.getter';
import { PublicKeyModule } from '../../../../../shared/public-key/infrastructure/public-key.module';
import { AuthConfModule } from '../../../infrastructure/auth-conf.module';
import { JwtSignConfigGetterPort } from '../../../domain/jwt-sign-config.getter.port';
import { JwtVerifyConfigGetterPort } from '../../../domain/jwt-verify-config.getter.port';

export const JwtModuleRegister = () =>
  JwtModule.registerAsync({
    imports: [AuthConfModule, PublicKeyModule, PrivateKeyModule],
    inject: [
      JwtSignConfigGetterPort,
      JwtVerifyConfigGetterPort,
      JwksServicePort,
      PublicKeyGetter,
      SignJwkGetterPort,
    ],
    useFactory: async (
      jwtSignConfigGetter: JwtSignConfigGetterPort,
      jwtVerifyConfigGetter: JwtVerifyConfigGetterPort,
      jwksService: JwksServicePort,
      publicKeyGetter: PublicKeyGetter,
      signKeyGetter: SignJwkGetterPort,
    ) => {
      await jwksService.getJwks();
      const signKeyPrivateInfo = signKeyGetter.get();

      const secretOrKeyProvider: JwtModuleOptions['secretOrKeyProvider'] =
        async (requestType, tokenOrPayload) => {
          if (requestType === JwtSecretRequestType.SIGN) {
            return signKeyPrivateInfo.privateKey;
          }
          if (requestType === JwtSecretRequestType.VERIFY) {
            const token = tokenOrPayload as string;
            return publicKeyGetter.get({ token });
          }
          throw new InternalServerErrorException('impossible request type');
        };

      const jwtSignConfig = jwtSignConfigGetter.get();
      const jwtVerifyConfig = jwtVerifyConfigGetter.get();
      return {
        secretOrKeyProvider,
        signOptions: {
          expiresIn: jwtSignConfig.expiresIn,
          issuer: jwtSignConfig.issuer,
          audience: jwtSignConfig.audience,
          algorithm: signKeyPrivateInfo.alg,
          keyid: signKeyPrivateInfo.kid,
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
