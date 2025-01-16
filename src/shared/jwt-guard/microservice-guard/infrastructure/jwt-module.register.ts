import { InternalServerErrorException } from '@nestjs/common';
import { JwtModule, JwtModuleOptions, JwtSecretRequestType } from '@nestjs/jwt';
import { PublicKeyGetter } from '../../../public-key/domain/public-key.getter';
import { PublicKeyModule } from '../../../public-key/infrastructure/public-key.module';
import { JwtVerifyConfigGetterPort } from '../../domain/jwt-verify-config.getter.port';
import { JwtConfigModule } from '../../infrastructure/jwt.config.module';

export const JwtModuleRegister = () =>
  JwtModule.registerAsync({
    imports: [JwtConfigModule, PublicKeyModule],
    inject: [JwtVerifyConfigGetterPort, PublicKeyGetter],
    useFactory: async (
      jwtVerifyConfigGetter: JwtVerifyConfigGetterPort,
      publicKeyGetter: PublicKeyGetter,
    ) => {
      const secretOrKeyProvider: JwtModuleOptions['secretOrKeyProvider'] =
        async (requestType, tokenOrPayload) => {
          if (requestType === JwtSecretRequestType.SIGN) {
            throw new InternalServerErrorException(
              'module is not allowed to sign tokens',
            );
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
        verifyOptions: {
          algorithms: [...jwtVerifyConfig.algorithms],
          audience: jwtVerifyConfig.audience,
          issuer: jwtVerifyConfig.issuer,
          ignoreExpiration: false,
        },
      };
    },
  });
