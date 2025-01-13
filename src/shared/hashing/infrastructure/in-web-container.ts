import { Logger } from '@nestjs/common';
import * as process from 'node:process';

const logger = new Logger('isRunningInWebContainer');

function isRunningInWebContainer(): boolean {
  if (process.env.SHELL && ['/bin/jsh'].includes(process.env.SHELL)) {
    logger.log('running in Node WebContainer');
    return true;
  }
  logger.log('running in Node');
  return false;
}

const runningInWebContainer = isRunningInWebContainer();

export const inWebContainer = <TPort>({
  loadIfTrue,
  loadIfFalse,
}: {
  loadIfTrue: () => Promise<TPort>;
  loadIfFalse: () => Promise<TPort>;
}) => {
  if (runningInWebContainer) {
    return loadIfTrue();
  } else {
    return loadIfFalse();
  }
};
