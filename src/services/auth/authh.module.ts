import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigPort } from '../../shared/config/domain/ports/config.port';
import { ProcessEnvConfigAdapter } from '../../shared/config/infrastructure/process-env-config.adapter';
import { HashingPort } from './domain/ports/hashing.port';
import { JwksServicePort } from './domain/ports/jwks.service.port';
import { KidGetterPort } from './domain/ports/kid.getter.port';
import { PublicKeyGetterPort } from './domain/ports/public-key.getter.port';
import { SignKeyGetterPort } from './domain/ports/sign-key.getter.port';
import { UserRepositoryPort } from './domain/ports/user-repository.port';
import { JwksServiceJoseAdapter } from './infrastructure/adapters/jwks.service.jose-adapter';
import { KidGetterJoseAdapter } from './infrastructure/adapters/kid.getter.jose-adapter';
import { PublicKeyGetterLocalAdapter } from './infrastructure/adapters/public-key.getter.local-adapter';
import { SignKeyGetterLocalAdapter } from './infrastructure/adapters/sign-key.getter.local-adapter';
import { SequelizeUserRepository } from './infrastructure/adapters/user.repository.sequelize.adapter';
import { DatabaseModule } from './infrastructure/database/database.module';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';

@Module({
  imports: [DatabaseModule, PassportModule],
  providers: [
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
        if (inWebContainer) {
          const { BcryptJsHashingAdapter } = await import(
            './infrastructure/adapters/bcryptjs-hashing.adapter'
          );
          return new BcryptJsHashingAdapter();
        } else {
          const { BcryptHashingAdapter } = await import(
            './infrastructure/adapters/bcrypt-hashing.adapter'
          );
          return new BcryptHashingAdapter();
        }
      },
    },
    {
      provide: PublicKeyGetterPort,
      useClass: PublicKeyGetterLocalAdapter,
    },
    {
      provide: SignKeyGetterPort,
      useClass: SignKeyGetterLocalAdapter,
    },
  ],
  exports: [
    JwtStrategy,
    JwksServicePort,
    KidGetterPort,
    UserRepositoryPort,
    HashingPort,
    PublicKeyGetterPort,
    SignKeyGetterPort,
  ],
})
export class AuthhModule {}
