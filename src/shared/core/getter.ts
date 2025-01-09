export abstract class Getter<TResult, TParams = void> {
  abstract get(params: TParams): TResult;
}
