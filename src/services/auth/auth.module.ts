import { InternalServerErrorException, Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions, JwtSecretRequestType } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigPort } from '../../shared/config/domain/ports/config.port';
import { ProcessEnvConfigAdapter } from '../../shared/config/infrastructure/process-env-config.adapter';
import { AuthService } from './application/services/auth.service';
import { HashingPort } from './domain/ports/hashing.port';
import { JwksServicePort } from './domain/ports/jwks.service.port';
import { KidGetterPort } from './domain/ports/kid.getter.port';
import { UserRepositoryPort } from './domain/ports/user-repository.port';
import { JwksServiceJoseAdapter } from './infrastructure/adapters/jwks.service.jose-adapter';
import { KidGetterJoseAdapter } from './infrastructure/adapters/kid.getter.jose-adapter';
import { SequelizeUserRepository } from './infrastructure/adapters/user.repository.sequelize.adapter';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { JwksController } from './infrastructure/controllers/jwks.controller';
import { DatabaseModule } from './infrastructure/database/database.module';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';

@Module({
  controllers: [AuthController, JwksController],
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigPort, JwksServicePort, KidGetterPort],
      extraProviders: [
        {
          provide: JwksServicePort,
          useClass: JwksServiceJoseAdapter,
        },
        {
          provide: KidGetterPort,
          useClass: KidGetterJoseAdapter,
        },
      ],
      useFactory: async (
        configPort: ConfigPort,
        jwksServicePort: JwksServicePort,
        kidGetterPort: KidGetterPort,
      ) => {
        await jwksServicePort.getJwks();
        const signKeyPrivateInfo = jwksServicePort.keyPrivateInfos[0];
        if (!signKeyPrivateInfo) {
          throw new InternalServerErrorException('no key');
        }

        const secretOrKeyProvider: JwtModuleOptions['secretOrKeyProvider'] =
          async (requestType, tokenOrPayload) => {
            if (requestType === JwtSecretRequestType.SIGN) {
              return signKeyPrivateInfo.privateKey;
            }
            if (requestType === JwtSecretRequestType.VERIFY) {
              const token = tokenOrPayload as string;
              const kid = kidGetterPort.get({ token });
              const keyPrivateInfo = jwksServicePort.keyPrivateInfos[kid];
              return keyPrivateInfo.publicKey;
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
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: JwksServicePort,
      useClass: JwksServiceJoseAdapter,
    },
    {
      provide: KidGetterPort,
      useClass: KidGetterJoseAdapter,
    },
    {
      provide: UserRepositoryPort,
      useClass: SequelizeUserRepository,
    },
    {
      provide: ConfigPort,
      useClass: ProcessEnvConfigAdapter,
    },
    {
      provide: HashingPort,
      useFactory: async (): Promise<HashingPort> => {
        const inWebContainer = true;
        let hashingService: HashingPort;
        if (inWebContainer) {
          const { BcryptJsHashingAdapter } = await import(
            './infrastructure/adapters/bcryptjs-hashing.adapter'
          );
          hashingService = new BcryptJsHashingAdapter();
        } else {
          const { BcryptHashingAdapter } = await import(
            './infrastructure/adapters/bcrypt-hashing.adapter'
          );
          hashingService = new BcryptHashingAdapter();
        }
        return hashingService;
      },
    },
  ],
})
export class AuthModule {}
