import { Injectable } from '@nestjs/common';
import { UseCase } from './use-case';
import { RuralProducerRepository } from 'src/data/interfaces/rural-producer.repository';

@Injectable()
export class DeleteRuralProducerUseCase implements UseCase<string, void> {
  constructor(private ruralProducerRepository: RuralProducerRepository) {}

  async exec(id: string): Promise<void> {
    await this.ruralProducerRepository.delete(id);
  }
}
