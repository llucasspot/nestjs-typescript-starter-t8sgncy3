import { InternalServerErrorException, Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions, JwtSecretRequestType } from '@nestjs/jwt';
import { ConfigPort } from '../../shared/config/domain/ports/config.port';
import { AuthService } from './application/services/auth.service';
import { AuthhModule } from './authh.module';
import { JwksServicePort } from './domain/ports/jwks.service.port';
import { PublicKeyGetterPort } from './domain/ports/public-key.getter.port';
import { SignKeyGetterPort } from './domain/ports/sign-key.getter.port';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { JwksController } from './infrastructure/controllers/jwks.controller';

@Module({
  controllers: [AuthController, JwksController],
  imports: [
    AuthhModule,
    JwtModule.registerAsync({
      imports: [AuthhModule],
      inject: [
        ConfigPort,
        JwksServicePort,
        PublicKeyGetterPort,
        SignKeyGetterPort,
      ],
      useFactory: async (
        configPort: ConfigPort,
        jwksServicePort: JwksServicePort,
        publicKeyGetterPort: PublicKeyGetterPort,
        signKeyGetterPort: SignKeyGetterPort,
      ) => {
        await jwksServicePort.getJwks();
        const signKeyPrivateInfo = signKeyGetterPort.get();

        const secretOrKeyProvider: JwtModuleOptions['secretOrKeyProvider'] =
          async (requestType, tokenOrPayload) => {
            if (requestType === JwtSecretRequestType.SIGN) {
              return signKeyPrivateInfo.privateKey;
            }
            if (requestType === JwtSecretRequestType.VERIFY) {
              const token = tokenOrPayload as string;
              return publicKeyGetterPort.get({ token });
            }
            throw new InternalServerErrorException('impossible request type');
          };

        const jwtSignConfig = configPort.jwtSignOptions;
        const jwtVerifyConfig = configPort.jwtVerifyOptions;
        return {
          secretOrKeyProvider,
          signOptions: {
            expiresIn: jwtSignConfig.expiresIn,
            issuer: jwtSignConfig.issuer,
            audience: jwtSignConfig.audience,
            algorithm: signKeyPrivateInfo.alg,
          },
          verifyOptions: {
            algorithms: [...jwtVerifyConfig.algorithms],
            audience: jwtVerifyConfig.audience,
            issuer: jwtVerifyConfig.issuer,
            ignoreExpiration: false,
          },
        };
      },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
