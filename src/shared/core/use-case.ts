export abstract class UseCase<TResult, TParams = void> {
  abstract execute(params: TParams): TResult;
}
