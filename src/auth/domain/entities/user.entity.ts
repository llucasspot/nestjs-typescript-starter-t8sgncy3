export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(email: string, hashedPassword: string): User {
    return new User(undefined, email, hashedPassword, undefined, undefined);
  }
}
