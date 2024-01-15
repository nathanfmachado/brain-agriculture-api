import { RuralProducerEntity } from "./entities";
import { CrudRepository } from "./crud-repository";

export abstract class RuralProducerRepository extends CrudRepository<RuralProducerEntity> {}
