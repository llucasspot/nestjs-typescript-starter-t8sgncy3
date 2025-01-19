import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { LocalFilePathResolverPort } from '../../../../../file/local-file-path.resolver.port';
import { PrivateKeyPemGetterPort } from '../../application/private-key-pem.getter.port';
import { JwksConfigPort } from '../../domain/jwks-config.port';

@Injectable()
export class PrivateKeyPemGetterFsAdapter implements PrivateKeyPemGetterPort {
  constructor(
    private readonly jwksConfig: JwksConfigPort,
    private readonly localFilePathResolver: LocalFilePathResolverPort,
  ) {}

  async get(): Promise<string> {
    return fs.readFileSync(
      this.localFilePathResolver.resolve(
        this.jwksConfig.relativePrivateKeyPath,
      ),
      'utf8',
    );
  }
}
