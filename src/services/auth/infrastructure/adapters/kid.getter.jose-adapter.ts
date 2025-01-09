import { Injectable } from '@nestjs/common';
import { decodeJwt, decodeProtectedHeader } from 'jose';
import { KidGetterPort } from '../../domain/ports/kid.getter.port';

@Injectable()
export class KidGetterJoseAdapter implements KidGetterPort {
  get({ token }: { token: string }) {
    let decoded;
    try {
      decoded = {
        payload: decodeJwt(token),
        header: decodeProtectedHeader(token),
      };
    } catch (err) {
      decoded = null;
    }
    return decoded?.header.kid;
  }
}
