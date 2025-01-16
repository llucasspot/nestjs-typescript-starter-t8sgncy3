import { Module } from '@nestjs/common';
import { PublicKeyModule } from '../../public-key/infrastructure/public-key.module';
import { JwtConfigModule } from './jwt.config.module';
import { JwtGuard } from './strategy/jwt.guard';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [PublicKeyModule, JwtConfigModule],
  providers: [JwtGuard, JwtStrategy],
  exports: [],
})
export class JwtGuardModule {}
