export abstract class CrudRepository<TEntity> {
  abstract findById(id: string): Promise<TEntity | null>;
  abstract findMany(data: any): Promise<TEntity[]>;
  abstract create(data: any): Promise<TEntity>;
  abstract update(data: any): Promise<TEntity>;
  abstract delete(id: string): Promise<void>;
}
