import { Injectable } from '@nestjs/common';
import { PublicKeyGetterPort } from '../../../public-key-getter/public-key.getter.port';

@Injectable()
export class PublicKeyGetterSyncAdapter implements PublicKeyGetterPort {
  constructor() {}

  async getByToken() {
    return 'vfbbestbezbeberz';
  }
}
