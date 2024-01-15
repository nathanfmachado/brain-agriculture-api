import { PrismaService } from "src/prisma/prisma.service";
import { CrudRepository, PaginationParams } from "../interfaces/crud-repository";
import { RuralProducerEntity } from "../interfaces/entities";
import { Injectable } from "@nestjs/common";


@Injectable()
export class RuralProducerPrismaRepository implements CrudRepository<RuralProducerEntity> {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<RuralProducerEntity | null> {
    const result = await this.prisma.ruralProducer.findUnique({
      where: { id },
      include: {
        crops: true,
      },
    });

    return result as RuralProducerEntity;
  }

  async findMany(pagination: PaginationParams): Promise<RuralProducerEntity[]> {
    const { page, limit } = pagination;
    const take = limit ?? 20;
    const skip = page ? (page - 1) * take : 0;

    const result = await this.prisma.ruralProducer.findMany({
      skip,
      take,
      include: {
        crops: true,
      },
    });

    return result as RuralProducerEntity[];
  }

  async create(data: any): Promise<RuralProducerEntity> {
    const {
      cpfCnpj,
      name,
      farm,
      city,
      state,
      totalArea,
      arableArea,
      vegetationArea,
      cropIds,
    } = data;

    const result = await this.prisma.ruralProducer.create({
      data: {
        cpfCnpj,
        name,
        farm,
        city,
        state,
        totalArea,
        arableArea,
        vegetationArea,
        crops: {
          connect: cropIds.map((id: string) => ({ id })),
        },
      },
    });

    return result as RuralProducerEntity;
  }

  async update(data: any): Promise<RuralProducerEntity> {
    const {
      id,
      cpfCnpj,
      name,
      farm,
      city,
      state,
      totalArea,
      arableArea,
      vegetationArea,
      cropIds,
    } = data;

    const result = await this.prisma.ruralProducer.update({
      where: { id },
      data: {
        cpfCnpj,
        name,
        farm,
        city,
        state,
        totalArea,
        arableArea,
        vegetationArea,
        crops: {
          connect: cropIds,
        },
      },
    });

    return result as RuralProducerEntity;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.ruralProducer.delete({
      where: { id },
    });
  }
}