import { Injectable } from '@nestjs/common';
import { PublicKeyPemGetterPort } from '../../application/public-key-pem.getter.port';

@Injectable()
export class PublicKeyPemGetterHardCodedAdapter
  implements PublicKeyPemGetterPort
{
  async get(): Promise<string> {
    return `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjSGT762f3WsHqEXFsCgM
COExxwZ8VFvM933oMBEv5DA7EerVBxVDBzEi3B9x6RoBvWVOnyywDFhkxMYJDg+M
xNA22KdAR9zmmgBMH8skz6laCD3DUD4O4z3G+e43k5RymIkEcZmLKYwiUxCDHEXS
TC65B9G+9vtszk8dMhixL/oaJQR4aoJVyl806uYadRKWZY2dJFk8BZGN2/bpMqAG
s2y3sx0inBfwkAIOHu6ynIAwqXMuvpfb6wSoUwnIq7l3+fhpsR0sE1arl9m18vJN
fvdC+LReP3xIj5UFrgJNxcIO6XOB9BOGQGVrz05py6IuVwLTwqLpjFSXEhbgT1wg
fwIDAQAB
-----END PUBLIC KEY-----
`;
  }
}
