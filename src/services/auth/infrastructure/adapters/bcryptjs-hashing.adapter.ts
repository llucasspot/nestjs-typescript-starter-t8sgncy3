import { Injectable } from '@nestjs/common';
import { HashingPort } from '../../domain/ports/hashing.port';
import bcryptjs from 'bcryptjs';

@Injectable()
export class BcryptJsHashingAdapter implements HashingPort {
  private readonly saltRounds = 10;

  async hash(data: string): Promise<string> {
    return bcryptjs.hash(data, this.saltRounds);
  }

  async compare(data: string, encrypted: string): Promise<boolean> {
    return bcryptjs.compare(data, encrypted);
  }
}
