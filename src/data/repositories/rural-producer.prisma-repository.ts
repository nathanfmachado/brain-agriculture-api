import { PrismaService } from "src/prisma/prisma.service";
import { CrudRepository, PaginationParams } from "../interfaces/crud-repository";
import { RuralProducerEntity } from "../interfaces/entities";
import { Injectable } from "@nestjs/common";
import { ChartResponseModel, GetFarmsTotalsResponseModel } from "../interfaces/rural-producer.repository";


@Injectable()
export class RuralProducerPrismaRepository implements CrudRepository<RuralProducerEntity> {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<RuralProducerEntity> {
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
      crops: {
        idsToDisconnect,
        idsToConnect,
      },
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
          disconnect: idsToDisconnect?.map((id: string) => ({ id })),
          connect: idsToConnect?.map((id: string) => ({ id })),
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

  async getFarmsTotals(): Promise<GetFarmsTotalsResponseModel> {
    const result = await this.prisma.$queryRaw`
      SELECT
        COUNT(id) as total,
        SUM(total_area) as total_area,
        SUM(arable_area) as arable_area,
        SUM(vegetation_area) as vegetation_area
      FROM
        rural_producer
    `;

    return result[0];
  }

  async getPerStateChart(): Promise<ChartResponseModel[]> {
    const result = await this.prisma.$queryRaw`
      SELECT
        state as label,
        COUNT(id) as "value"
      FROM
        rural_producer
      GROUP BY
        state
    `;

    return result as ChartResponseModel[];
  }

  async getPerCropChart(): Promise<ChartResponseModel[]> {
    const result = await this.prisma.$queryRaw`
      SELECT
        crop.name as label,
        COUNT(rural_producer.id) as "value"
      FROM
        rural_producer
      INNER JOIN
        "_CropToRuralProducer" ctrp ON rural_producer.id = ctrp."B"
      INNER JOIN
        crop ON crop.id = ctrp."A"
      GROUP BY
        crop.name
    `;

    return result as ChartResponseModel[];
  }
}