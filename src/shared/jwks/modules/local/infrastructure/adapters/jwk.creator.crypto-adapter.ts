import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ArrayIncludes } from '../../../../../core/array.utils';
import {
  CreateJwkBody,
  CreateJwkResponse,
  Jwk,
  JwkCreatorPort,
} from '../../domain/jwk.creator.port';
import { generateKeyPairSync, KeyObject } from 'crypto';

@Injectable()
export class JwkCreatorCryptoAdapter implements JwkCreatorPort {
  async create({ alg, use, kid }: CreateJwkBody): Promise<CreateJwkResponse> {
    let jwk;
    let jwkPrivateInfo;

    if (
      ArrayIncludes(
        ['RS256', 'RS384', 'RS512', 'PS256', 'PS384', 'PS512'] as const,
        alg,
      )
    ) {
      // @ts-expect-error generateKeyPairSync
      const { publicKey, privateKey } = generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: { format: 'jwk' },
        privateKeyEncoding: { format: 'pem' },
      });

      jwkPrivateInfo = { kid, privateKey, alg };
      jwk = {
        ...(publicKey as KeyObject),
        kid,
        use,
        alg,
      } as unknown as Jwk;
    } else if (ArrayIncludes(['ES256', 'ES384', 'ES512'] as const, alg)) {
      const namedCurve = {
        ES256: 'P-256',
        ES384: 'P-384',
        ES512: 'P-521',
      }[alg];

      // @ts-expect-error generateKeyPairSync
      const { publicKey, privateKey } = generateKeyPairSync('ec', {
        namedCurve,
        publicKeyEncoding: { format: 'jwk' },
        privateKeyEncoding: { format: 'pem' },
      });

      jwkPrivateInfo = { kid, privateKey, alg };
      jwk = {
        ...(publicKey as KeyObject),
        kid,
        use,
        alg,
      } as unknown as Jwk;
    } else {
      throw new InternalServerErrorException(`Unsupported algorithm: ${alg}`);
    }

    return {
      jwk,
      jwkPrivateInfo,
    };
  }
}
