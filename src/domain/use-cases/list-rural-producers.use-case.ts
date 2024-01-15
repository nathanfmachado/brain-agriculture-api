import { Injectable } from '@nestjs/common';
import { UseCase } from './use-case';
import { PageQueryParamSchema } from 'src/api/validators/rural-producer.validator';
import { RuralProducerRepository } from 'src/data/interfaces/rural-producer.repository';

@Injectable()
export class ListRuralProducersUseCase
  implements UseCase<PageQueryParamSchema, any[]>
{
  constructor(private ruralProducerRepository: RuralProducerRepository) {}

  async exec(page?: PageQueryParamSchema): Promise<any[]> {
    const result = await this.ruralProducerRepository.findMany({ page });

    return result.map((ruralProducer) => ({
      id: ruralProducer.id,
      cpf_cnpj: ruralProducer.cpfCnpj,
      name: ruralProducer.name,
      farm: ruralProducer.farm,
      city: ruralProducer.city,
      state: ruralProducer.state,
      total_area: ruralProducer.totalArea,
      arable_area: ruralProducer.arableArea,
      vegetation_area: ruralProducer.vegetationArea,
      crops: ruralProducer.crops.map((crop) => ({
        id: crop.id,
        name: crop.name,
      })),
    }));
  }
}
