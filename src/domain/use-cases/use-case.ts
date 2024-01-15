export interface UseCase<TRequest, TResult> {
  exec(requestObject: TRequest): Promise<TResult>;
}
