import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { LocalFilePathResolverPort } from '../../../../../file/local-file-path.resolver.port';
import { PublicKeyPemGetterPort } from '../../application/public-key-pem.getter.port';
import { JwksConfigPort } from '../../domain/jwks-config.port';

@Injectable()
export class PublicKeyPemGetterFsAdapter implements PublicKeyPemGetterPort {
  constructor(
    private readonly jwksConfig: JwksConfigPort,
    private readonly localFilePathResolver: LocalFilePathResolverPort,
  ) {}

  async get(): Promise<string> {
    return fs.readFileSync(
      this.localFilePathResolver.resolve(this.jwksConfig.relativePublicKeyPath),
      'utf8',
    );
  }
}
