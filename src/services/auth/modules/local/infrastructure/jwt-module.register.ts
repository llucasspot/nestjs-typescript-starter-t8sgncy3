import { InternalServerErrorException } from '@nestjs/common';
import { JwtModule, JwtModuleOptions, JwtSecretRequestType } from '@nestjs/jwt';
import { JwtVerifyConfigGetterPort } from '../../../../../shared/jwt-guard/domain/jwt-verify-config.getter.port';
import { JwtConfigModule } from '../../../../../shared/jwt-guard/infrastructure/jwt.config.module';
import { KeyGettersGetter } from '../../../../../shared/key-getters-getter/domain/key-getters.getter';
import { KeyGettersGetterModule } from '../../../../../shared/key-getters-getter/infrastructure/key-getters.getter.module';
import { JwtSignConfigGetterPort } from '../domain/jwt-sign-config.getter.port';
import { AuthConfModule } from './auth-conf.module';

export const JwtModuleRegister = () =>
  JwtModule.registerAsync({
    imports: [AuthConfModule, JwtConfigModule, KeyGettersGetterModule],
    inject: [
      JwtSignConfigGetterPort,
      JwtVerifyConfigGetterPort,
      KeyGettersGetter,
    ],
    useFactory: async (
      jwtSignConfigGetter: JwtSignConfigGetterPort,
      jwtVerifyConfigGetter: JwtVerifyConfigGetterPort,
      keyGettersGetter: KeyGettersGetter,
    ) => {
      const jwtSignConfig = jwtSignConfigGetter.get();
      const algorithm = jwtSignConfig.alg;
      const { publicKeyGetter, privateKeyGetter } = keyGettersGetter.get({
        algorithm,
      });

      const secretOrKeyProvider: JwtModuleOptions['secretOrKeyProvider'] =
        async (requestType, tokenOrPayload) => {
          if (requestType === JwtSecretRequestType.SIGN) {
            return privateKeyGetter.get();
          }
          if (requestType === JwtSecretRequestType.VERIFY) {
            const token = tokenOrPayload as string;
            return publicKeyGetter.getByToken({ token });
          }
          throw new InternalServerErrorException('impossible request type');
        };

      const jwtVerifyConfig = jwtVerifyConfigGetter.get();
      return {
        secretOrKeyProvider,
        signOptions: {
          expiresIn: jwtSignConfig.expiresIn,
          issuer: jwtSignConfig.issuer,
          audience: jwtSignConfig.audience,
          algorithm: algorithm,
          keyid: jwtSignConfig.kid,
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
