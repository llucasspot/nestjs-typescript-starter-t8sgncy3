import { Injectable } from '@nestjs/common';
import { decodeJwt, decodeProtectedHeader } from 'jose-browser-runtime';
import { JwtHeaderExtractorPort } from '../../domain/ports/jwt-header.extractor.port';

@Injectable()
export class JwtHeaderExtractorJoseBrowserRuntimeAdapter
  implements JwtHeaderExtractorPort
{
  extractFrom({ token }: { token: string }) {
    let decoded;
    try {
      decoded = {
        payload: decodeJwt(token),
        header: decodeProtectedHeader(token),
      };
    } catch (err) {
      decoded = null;
    }
    const kid = decoded?.header.kid;
    const alg = decoded?.header.alg;

    return {
      kid,
      alg,
    };
  }
}
