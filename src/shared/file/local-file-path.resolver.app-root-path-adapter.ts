import { Injectable } from '@nestjs/common';
import appRootPath from 'app-root-path';
import { LocalFilePathResolverPort } from './local-file-path.resolver.port';

@Injectable()
export class LocalFilePathResolverAppRootPathAdapter
  implements LocalFilePathResolverPort
{
  resolve(relativePath: string): string {
    return appRootPath.resolve(relativePath);
  }
}
