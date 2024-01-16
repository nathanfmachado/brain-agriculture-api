import { RuralProducerEntity } from "./entities";
import { CrudRepository, PaginationParams } from "./crud-repository";

export interface CreateRuralProducerRepositoryParams {
  cpfCnpj: string;
  name: string;
  farm: string;
  city: string;
  state: string;
  totalArea: number;
  arableArea: number;
  vegetationArea: number;
  cropIds: string[];
}

export interface UpdateRuralProducerRepositoryParams {
  id: string;
  name?: string;
  cpfCnpj?: string;
  farm?: string;
  city?: string;
  state?: string;
  totalArea?: number;
  arableArea?: number;
  vegetationArea?: number;
  crops?: {
    idsToDisconnect?: string[];
    idsToConnect?: string[];
  };
}

export abstract class RuralProducerRepository extends CrudRepository<RuralProducerEntity> {
  abstract findById(id: string): Promise<RuralProducerEntity>;
  abstract findMany(data: PaginationParams): Promise<RuralProducerEntity[]>;
  abstract create(data: CreateRuralProducerRepositoryParams): Promise<RuralProducerEntity>;
  abstract update(data: UpdateRuralProducerRepositoryParams): Promise<RuralProducerEntity>;
  abstract delete(id: string): Promise<void>;
}
