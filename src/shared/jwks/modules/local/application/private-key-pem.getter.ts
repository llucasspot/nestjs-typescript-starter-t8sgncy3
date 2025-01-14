import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { Getter } from '../../../../core/getter';
import { LocalFilePathResolverPort } from '../../../../file/local-file-path.resolver.port';
import { JwksConfigPort } from '../domain/jwks-config.port';

@Injectable()
export class PrivateKeyPemGetter implements Getter<Promise<string>> {
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
