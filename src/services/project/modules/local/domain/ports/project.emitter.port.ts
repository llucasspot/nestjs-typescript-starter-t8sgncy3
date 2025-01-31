export abstract class ProjectEmitterPort {
  abstract emit(event: 'school deleted', body: { id: string }): Promise<void>;
  abstract emit(event: 'project deleted', body: { id: string }): Promise<void>;
  abstract emit(
    event: 'project deleted' | 'school deleted',
    body: { id: string },
  ): Promise<void>;
}
