import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './application/services/auth.service';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { SequelizeUserRepository } from './infrastructure/adapters/user.repository.sequelize.adapter';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { UserRepositoryPort } from './domain/ports/user-repository.port';
import { ConfigPort } from '../shared/config/domain/ports/config.port';
import { HashingPort } from './domain/ports/hashing.port';
import { ProcessEnvConfigAdapter } from '../shared/config/infrastructure/process-env-config.adapter';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  controllers: [AuthController],
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configPort: ConfigPort) => ({
        secret: configPort.jwtSecret,
        signOptions: { expiresIn: configPort.jwtExpiresIn },
      }),
      inject: [ConfigPort],
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
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
