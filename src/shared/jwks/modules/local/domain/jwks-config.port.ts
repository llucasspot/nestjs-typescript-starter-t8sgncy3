export type RelativePath = `../${string}` | `./${string}`;

export abstract class JwksConfigPort {
  abstract get relativePublicKeyPath(): RelativePath;

  abstract get relativePrivateKeyPath(): RelativePath;
}
