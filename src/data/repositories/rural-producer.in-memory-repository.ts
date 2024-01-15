import { PaginationParams } from "../interfaces/crud-repository";
import { RuralProducerEntity } from "../interfaces/entities";
import { RuralProducerRepository } from "../interfaces/rural-producer.repository";



export class RuralProducerInMemoryRepository implements RuralProducerRepository {
  public ruralProducers: RuralProducerEntity[] = [];

  async create(data: any): Promise<RuralProducerEntity> {
    const id = Math.random().toString(36);
    this.ruralProducers.push({ ...data, id, createdAt: new Date(), updatedAt: new Date() });
    return data;
  }

  async findMany(pagination?: PaginationParams): Promise<RuralProducerEntity[]> {
    const { page, limit } = pagination;
    const take = limit ?? 20;
    const skip = page ? (page - 1) * take : 0;

    return this.ruralProducers.slice(skip, skip + take);
  }

  async findById(id: string): Promise<RuralProducerEntity | null> {
    return this.ruralProducers.find((ruralProducer) => ruralProducer.id === id) ?? null;
  }

  async update(data: any): Promise<RuralProducerEntity | null> {
    const ruralProducer = await this.findById(data.id);

    if (!ruralProducer) {
      return null;
    }

    const updatedRuralProducer = {
      ...ruralProducer,
      ...data,
      updatedAt: new Date(),
    };

    this.ruralProducers = this.ruralProducers.map((ruralProducer) =>
      ruralProducer.id === data.id ? updatedRuralProducer : ruralProducer,
    );

    return updatedRuralProducer;
  }

  async delete(id: string): Promise<void> {
    this.ruralProducers = this.ruralProducers.filter(
      (ruralProducer) => ruralProducer.id !== id,
    );
  }

}