import { Injectable, InternalServerErrorException } from '@nestjs/common';
import forge from 'node-forge';
import { MakeRequired } from '../../../../../core/make-required.util';
import {
  AvailableAlgorithm,
  CreateJwkBody,
  CreateJwkResponse,
  Jwk,
  JwkCreatorPort,
  JwkPrivateInfo,
} from '../../domain/jwk.creator.port';

@Injectable()
export class JwkCreatorForgeAdapter implements JwkCreatorPort {
  async create(options: CreateJwkBody): Promise<CreateJwkResponse> {
    const keyPairResult = this.generateKeyPair(options.alg);
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

  private generateKeyPair(alg: AvailableAlgorithm) {
    return KeyPairGenerator.generateKeyPair(alg);
  }

  private async buildJwkPrivateInfo(
    keyPairResult: { privateKey: forge.pki.PrivateKey },
    { kid, alg }: CreateJwkBody,
  ): Promise<JwkPrivateInfo> {
    const privateKeyPEM = forge.pki.privateKeyToPem(keyPairResult.privateKey);
    return {
      kid,
      alg,
      privateKey: privateKeyPEM,
    };
  }

  private async exportJWK(
    publicKey: forge.pki.PublicKey,
    { kid, alg, use }: CreateJwkBody,
  ): Promise<Jwk> {
    const publicKeyJwk = this.publicKeyToJwk(publicKey);

    publicKeyJwk.kid = kid;
    publicKeyJwk.alg = alg;
    publicKeyJwk.use = use;

    return publicKeyJwk as MakeRequired<Jwk, 'kid' | 'alg' | 'use' | 'n' | 'e'>;
  }

  private publicKeyToJwk(publicKey: forge.pki.PublicKey): Partial<Jwk> {
    // @ts-expect-error publicKey.n
    const n = Buffer.from(publicKey.n.toByteArray().slice(1)).toString(
      'base64url',
    );
    // @ts-expect-error publicKey.e
    const e = Buffer.from(publicKey.e.toByteArray()).toString('base64url');

    return {
      kty: 'RSA',
      n,
      e,
    };
  }
}

export class KeyPairGenerator {
  static generateKeyPair(algorithm: AvailableAlgorithm) {
    switch (algorithm) {
      case 'RS256':
      case 'RS384':
      case 'RS512':
      case 'PS256':
      case 'PS384':
      case 'PS512': {
        return forge.pki.rsa.generateKeyPair(2048);
      }

      case 'ES256':
      case 'ES384':
      case 'ES512': {
        throw new InternalServerErrorException(
          `Elliptic Curve is not supported in node-forge.`,
        );
      }

      default: {
        throw new InternalServerErrorException(
          `Algorithm ${algorithm} is not supported.`,
        );
      }
    }
  }
}
