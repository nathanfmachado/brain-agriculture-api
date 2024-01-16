import { NotFoundException } from "@nestjs/common";
import { PaginationParams } from "../interfaces/crud-repository";
import { RuralProducerEntity } from "../interfaces/entities";
import { RuralProducerRepository, UpdateRuralProducerRepositoryParams } from "../interfaces/rural-producer.repository";



export class RuralProducerInMemoryRepository implements RuralProducerRepository {
  public ruralProducers: RuralProducerEntity[] = [];

  async create(data: any): Promise<RuralProducerEntity> {
    const id = Math.random().toString(36);
    this.ruralProducers.push({ ...data, id, createdAt: new Date(), updatedAt: new Date() });
    return data;
  }

  async findMany(pagination?: PaginationParams): Promise<RuralProducerEntity[]> {
    const { page, limit } = pagination ?? {};
    const take = limit ?? 20;
    const skip = page ? (page - 1) * take : 0;

    return this.ruralProducers.slice(skip, skip + take);
  }

  async findById(id: string): Promise<RuralProducerEntity> {
    return this.ruralProducers.find((ruralProducer) => ruralProducer.id === id);
  }

  async update(data: UpdateRuralProducerRepositoryParams): Promise<RuralProducerEntity> {
    const ruralProducer = await this.findById(data.id);

    if (!ruralProducer) {
      return;
    }

    const updatedRuralProducer = {
      id: ruralProducer.id,
      name: data.name ?? ruralProducer.name,
      cpfCnpj: data.cpfCnpj ?? ruralProducer.cpfCnpj,
      farm: data.farm ?? ruralProducer.farm,
      city: data.city ?? ruralProducer.city,
      state: data.state ?? ruralProducer.state,
      totalArea: data.totalArea ?? ruralProducer.totalArea,
      arableArea: data.arableArea ?? ruralProducer.arableArea,
      vegetationArea: data.vegetationArea ?? ruralProducer.vegetationArea,
      crops: ruralProducer.crops, //TODO: integrate in memory crops repository
      createdAt: ruralProducer.createdAt,
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

  async getFarmsTotals(): Promise<any> {
    return [];
  }

  async getPerStateChart(): Promise<any> {
    return [];
  }

  async getPerCropChart(): Promise<any> {
    return [];
  }

  async getPerAreaTypeChart(): Promise<any> {
    return [];
  }
}