import { Injectable } from '@nestjs/common';
import { ArrayIncludes } from '../../core/array.utils';
import { PrivateKeyPemGetterPort } from '../../jwks/modules/local/application/private-key-pem.getter.port';
import {
  asymmetricAlgorithms,
  AvailableAlgorithm,
} from '../../jwks/modules/local/domain/jwk-from-public-key-pem.extractor.port';
import { PrivateKeyPemGetterFsAdapter } from '../../jwks/modules/local/infrastructure/adapters/private-key-pem.getter.fs-adapter';
import { PrivateKeyPemGetterSyncAdapter } from '../../jwks/modules/local/infrastructure/adapters/private-key-pem.getter.sync-adapter';
import { PublicKeyGetterAsyncAdapter } from '../infrastructure/adapters/public-key-getter-async/public-key.getter.async-adapter';
import { PublicKeyGetterSyncAdapter } from '../infrastructure/adapters/public-key-getter-sync/public-key.getter.sync-adapter';
import { PublicKeyGetterPort } from '../public-key-getter/public-key.getter.port';

@Injectable()
export class KeyGettersGetter {
  constructor(
    private readonly publicKeyGetterAsyncAdapter: PublicKeyGetterAsyncAdapter,
    private readonly privateKeyPemGetterFsAdapter: PrivateKeyPemGetterFsAdapter,
    private readonly publicKeyGetterSyncAdapter: PublicKeyGetterSyncAdapter,
    private readonly privateKeyPemGetterSyncAdapter: PrivateKeyPemGetterSyncAdapter,
  ) {}

  get({ algorithm }: { algorithm: AvailableAlgorithm }): {
    publicKeyGetter: PublicKeyGetterPort;
    privateKeyGetter: PrivateKeyPemGetterPort;
  } {
    if (ArrayIncludes(asymmetricAlgorithms, algorithm)) {
      return {
        publicKeyGetter: this.publicKeyGetterAsyncAdapter,
        privateKeyGetter: this.privateKeyPemGetterFsAdapter,
      };
    }
    return {
      publicKeyGetter: this.publicKeyGetterSyncAdapter,
      privateKeyGetter: this.privateKeyPemGetterSyncAdapter,
    };
  }
}
