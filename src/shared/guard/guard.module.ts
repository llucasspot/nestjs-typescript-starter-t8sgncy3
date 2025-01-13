import { Module } from '@nestjs/common';
import { AuthConfModule } from '../../services/auth/infrastructure/auth-conf.module';
import { PublicKeyModule } from '../public-key/infrastructure/public-key.module';
import { JwtGuard } from './guards/jwt/jwt.guard';
import { JwtStrategy } from './guards/jwt/jwt.strategy';

@Module({
  imports: [PublicKeyModule, AuthConfModule],
  providers: [JwtGuard, JwtStrategy],
  exports: [JwtGuard],
})
export class GuardModule {}
