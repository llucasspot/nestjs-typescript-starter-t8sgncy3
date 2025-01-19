import { Injectable } from '@nestjs/common';
import { PrivateKeyPemGetterPort } from '../../application/private-key-pem.getter.port';

@Injectable()
export class PrivateKeyPemGetterSyncAdapter implements PrivateKeyPemGetterPort {
  async get(): Promise<string> {
    return 'vfbbestbezbeberz';
  }
}
