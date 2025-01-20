export abstract class ProjectEmitterPort {
  abstract emit(
    event: 'school deleted',
    body: { projectId: string },
  ): Promise<void>;
  abstract emit(
    event: 'project deleted',
    body: { projectId: string },
  ): Promise<void>;
  abstract emit(event: string, body: unknown): Promise<void>;
}
