import { Injectable } from '@nestjs/common';
import { JwksConfigPort, RelativePath } from '../../domain/jwks-config.port';

@Injectable()
export class JwksConfigProcessEnvAdapter implements JwksConfigPort {
  get relativePublicKeyPath(): RelativePath {
    return (
      (process.env.RELATIVE_PRIVATE_KEY_PATH as RelativePath) ||
      './public_key.dev.pem'
    );
  }

  get relativePrivateKeyPath(): RelativePath {
    return (
      (process.env.RELATIVE_PRIVATE_KEY_PATH as RelativePath) ||
      './private_key.dev.pem'
    );
  }
}
