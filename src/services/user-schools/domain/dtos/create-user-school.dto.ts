export class CreateUserSchoolDto {
  constructor(
    public readonly schoolId: string,
    public readonly userId: string,
  ) {}
}
