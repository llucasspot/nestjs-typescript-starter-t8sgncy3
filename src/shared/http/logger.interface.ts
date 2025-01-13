export abstract class LoggerI {
  abstract error(...messages: any[]): void;

  /**
   * Write a 'log' level log.
   */
  abstract log(...messages: any[]): void;

  /**
   * Write a 'warn' level log.
   */
  abstract warn(...messages: any[]): void;

  /**
   * Write a 'debug' level log.
   */
  abstract debug(...messages: any[]): void;

  /**
   * Write a 'verbose' level log.
   */
  abstract verbose(...messages: any[]): void;

  /**
   * Write a 'fatal' level log.
   */
  abstract fatal(...messages: any[]): void;
}
