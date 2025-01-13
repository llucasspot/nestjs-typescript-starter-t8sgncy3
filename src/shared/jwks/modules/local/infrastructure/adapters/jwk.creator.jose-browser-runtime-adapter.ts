import { Injectable } from '@nestjs/common';
import {
  exportJWK,
  exportPKCS8,
  generateKeyPair,
  JWK,
  KeyLike,
} from 'jose-browser-runtime';
import { GenerateKeyPairResult } from 'jose/dist/types/key/generate_key_pair';
import { MakeRequired } from '../../../../../core/make-required.util';
import {
  CreateJwkBody,
  CreateJwkResponse,
  Jwk,
  JwkCreatorPort,
  JwkPrivateInfo,
} from '../../domain/jwk.creator.port';

@Injectable()
export class JwkCreatorJoseBrowserRuntimeAdapter implements JwkCreatorPort {
  async create(options: CreateJwkBody): Promise<CreateJwkResponse> {
    const keyPairResult = await generateKeyPair(options.alg);
    const jwkPrivateInfo = await this.buildJwkPrivateInfo(
      keyPairResult,
      options,
    );
    const jwk = await this.exportJWK(keyPairResult.publicKey, options);
    return {
      jwk,
      jwkPrivateInfo,
    };
  }

  private async buildJwkPrivateInfo(
    { privateKey }: GenerateKeyPairResult,
    { kid, alg }: CreateJwkBody,
  ): Promise<JwkPrivateInfo> {
    const privateKeyPEM = await exportPKCS8(privateKey);
    return {
      kid,
      alg,
      privateKey: privateKeyPEM,
    };
  }

  private async exportJWK(
    publicKey: KeyLike,
    { kid, alg, use }: CreateJwkBody,
  ): Promise<Jwk> {
    const jwKey = await exportJWK(publicKey);
    jwKey.kid = kid;
    jwKey.alg = alg;
    jwKey.use = use;
    return jwKey as MakeRequired<JWK, 'kid' | 'alg' | 'use' | 'n' | 'e'>;
  }
}
