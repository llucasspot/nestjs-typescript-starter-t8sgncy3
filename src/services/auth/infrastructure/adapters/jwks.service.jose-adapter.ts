import { Injectable } from '@nestjs/common';
import {
  exportJWK,
  exportPKCS8,
  exportSPKI,
  generateKeyPair,
  JWK,
  KeyLike,
} from 'jose';
import { GenerateKeyPairResult } from 'jose/dist/types/key/generate_key_pair';
import { MakeRequired } from '../../../../shared/core/make-required.util';
import {
  JwKey,
  Jwks,
  JwksServicePort,
  KeyPrivateInfo,
} from '../../domain/ports/jwks.service.port';

type CreateJwKeyOptions = { kid: string; alg: string; use: string };

@Injectable()
export class JwksServiceJoseAdapter implements JwksServicePort {
  public readonly keyPrivateInfos: KeyPrivateInfo[] = [];

  private jwks: Jwks;
  private readonly jwKeys: JwKey[] = [];

  constructor() {}

  async getJwks() {
    if (this.jwks) {
      return this.jwks;
    }

    const jwKey = await this.buildOneJwKey();
    this.jwKeys.push(jwKey);

    const jwks = {
      keys: this.jwKeys,
    };

    this.jwks = jwks;
    return jwks;
  }

  private async buildOneJwKey() {
    const options = {
      kid: `${this.keyPrivateInfos.length + 1}`,
      alg: 'RS256',
      use: 'sig',
    } as const;
    const keyPairResult = await generateKeyPair(options.alg);
    const keyPrivateInfo = await this.buildKeyPrivateInfos(
      keyPairResult,
      options,
    );
    this.keyPrivateInfos.push(keyPrivateInfo);
    return this.exportJWK(keyPairResult.publicKey, options);
  }

  private async buildKeyPrivateInfos<
    TCreateJwKeyOptions extends CreateJwKeyOptions,
  >(
    { privateKey, publicKey }: GenerateKeyPairResult,
    { kid, alg }: TCreateJwKeyOptions,
  ) {
    const publicKeyPEM = await exportSPKI(publicKey);
    const privateKeyPEM = await exportPKCS8(privateKey);
    const keyPrivateInfo = {
      kid,
      alg,
      publicKey: publicKeyPEM,
      privateKey: privateKeyPEM,
    } as {
      publicKey: string;
      privateKey: string;
    } & TCreateJwKeyOptions;

    return keyPrivateInfo;
  }

  private async exportJWK(
    publicKey: KeyLike,
    { kid, alg, use }: CreateJwKeyOptions,
  ) {
    const jwKey = await exportJWK(publicKey);
    jwKey.kid = kid;
    jwKey.alg = alg;
    jwKey.use = use;
    return jwKey as MakeRequired<JWK, 'kid' | 'alg' | 'use' | 'n' | 'e'>;
  }
}
