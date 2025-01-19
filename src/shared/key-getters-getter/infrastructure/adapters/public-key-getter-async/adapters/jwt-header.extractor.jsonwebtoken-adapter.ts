import { Injectable } from '@nestjs/common';
import { decode } from 'jsonwebtoken';
import { JwtHeaderExtractorPort } from '../../../../domain/ports/jwt-header.extractor.port';

@Injectable()
export class JwtHeaderExtractorJsonwebtokenAdapter
  implements JwtHeaderExtractorPort
{
  extractFrom({ token }: { token: string }) {
    let decoded;
    try {
      decoded = decode(token, { complete: true });
    } catch (err) {
      decoded = null;
    }

    const kid = decoded?.header?.kid;
    const alg = decoded?.header?.alg;

    return {
      kid,
      alg,
    };
  }
}
