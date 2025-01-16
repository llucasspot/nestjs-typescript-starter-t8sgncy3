export class CreateProjectDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
  ) {}
}
