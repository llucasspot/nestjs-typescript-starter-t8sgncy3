export class CreateUserProjectDto {
  constructor(
    public readonly projectId: string,
    public readonly userId: string,
  ) {}
}
