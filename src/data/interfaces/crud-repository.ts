export abstract class CrudRepository<TEntity> {
  abstract findById(id: string): Promise<TEntity>;
  abstract findMany(data: PaginationParams): Promise<TEntity[]>;
  abstract create(data: any): Promise<TEntity>;
  abstract update(data: any): Promise<TEntity>;
  abstract delete(id: string): Promise<void>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}
