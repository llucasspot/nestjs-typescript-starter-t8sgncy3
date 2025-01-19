export abstract class PublicKeyGetterPort {
  abstract getByToken({ token }: { token: string }): Promise<string>;
}
