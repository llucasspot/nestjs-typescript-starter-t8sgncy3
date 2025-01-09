import { Injectable } from '@nestjs/common';
import { exportJWK, generateKeyPair, JWK, KeyLike } from 'jose';
import { MakeRequired } from '../../../../shared/core/make-required.util';
import {
  JwKey,
  Jwks,
  JwksServicePort,
} from '../../domain/ports/jwks.service.port';

@Injectable()
export class JwksServiceJoseAdapter implements JwksServicePort {
  public readonly keys: {
    kid: string;
    publicKey: string;
    privateKey: string;
  }[] = [];
  private jwks: Jwks;
  private readonly jwKeys: JwKey[] = [];

  constructor() {}

  async getJwks() {
    if (this.jwks) {
      return this.jwks;
    }

    const jwKey = await this.buildOneKey();
    this.jwKeys.push(jwKey);

    const jwks = {
      keys: this.jwKeys,
    };

    this.jwks = jwks;
    return jwks;
  }

  private async buildOneKey() {
    const options = {
      kid: `${this.keys.length + 1}`,
      alg: 'RS256',
      use: 'sig',
    };

    const { publicKey, privateKey } = await generateKeyPair(options.alg);
    const key = {
      kid: options.kid,
      publicKey: publicKey.type,
      privateKey: privateKey.type,
    };

    console.log(publicKey);
    this.keys.push(key);

    return this.exportJWK(publicKey, options);
  }

  private async exportJWK(
    publicKey: KeyLike,
    { kid, alg, use }: { alg: string; kid: string; use: string },
  ) {
    const jwKey = await exportJWK(publicKey);
    jwKey.kid = kid;
    jwKey.alg = alg;
    jwKey.use = use;
    return jwKey as MakeRequired<JWK, 'kid' | 'alg' | 'use' | 'n' | 'e'>;
  }
}
