export abstract class Creator<TResult, TParams = void> {
  abstract create(params: TParams): TResult;
}
