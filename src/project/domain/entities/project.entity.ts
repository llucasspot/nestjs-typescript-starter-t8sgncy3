export class Project {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(name: string, description: string): Project {
    return new Project(undefined, name, description, undefined, undefined);
  }
}
