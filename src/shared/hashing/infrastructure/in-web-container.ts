import { Logger } from '@nestjs/common';

const logger = new Logger('isRunningInWebContainer');

function isRunningInWebContainer(): boolean {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    logger.log('running in WebContainer');
    return true;
  }
  if (
    typeof process !== 'undefined' &&
    process.versions &&
    process.versions.node
  ) {
    logger.log('running in Node');
    return false;
  }
  logger.log('default value to false');
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
