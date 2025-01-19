import { Module } from '@nestjs/common';
import { PublicKeyGetterLocalModule } from '../../key-getters-getter/public-key-getter/public-key-getter.local-module';
import { JwtConfigModule } from './jwt.config.module';
import { JwtGuard } from './strategy/jwt.guard';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [JwtConfigModule, PublicKeyGetterLocalModule],
  providers: [JwtGuard, JwtStrategy],
  exports: [],
})
export class JwtGuardModule {}
