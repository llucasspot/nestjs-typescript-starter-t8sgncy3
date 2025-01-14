import { Module } from '@nestjs/common';
import { LocalFilePathResolverAppRootPathAdapter } from './local-file-path.resolver.app-root-path-adapter';
import { LocalFilePathResolverPort } from './local-file-path.resolver.port';

@Module({
  providers: [
    {
      provide: LocalFilePathResolverPort,
      useClass: LocalFilePathResolverAppRootPathAdapter,
    },
  ],
  exports: [LocalFilePathResolverPort],
})
export class FileModule {}
