import { Injectable } from '@nestjs/common';
import { UseCase } from './use-case';
import { CreateRuralProducerBodySchema } from 'src/api/validators/rural-producer.validator';
import { RuralProducerRepository } from 'src/data/interfaces/rural-producer.repository';

@Injectable()
export class CreateRuralProducerUseCase
  implements UseCase<CreateRuralProducerBodySchema, void>
{
  constructor(private ruralProducerRepository: RuralProducerRepository) {}

  async exec(body: CreateRuralProducerBodySchema): Promise<void> {
    const { totalArea, arableArea, vegetationArea } = body;

    if (totalArea < arableArea + vegetationArea) {
      throw new Error('Total area must be greater than arable and vegetation');
    }

    await this.ruralProducerRepository.create(body);
  }
}
