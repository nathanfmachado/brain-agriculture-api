import { describe, expect, it, beforeEach } from 'vitest';
import { CreateRuralProducerUseCase } from './create-rural-producer.use-case';
import { RuralProducerInMemoryRepository } from 'src/data/repositories/rural-producer.in-memory-repository';
import { BadRequestException } from '@nestjs/common';

describe('CreateRuralProducerUseCase', () => {
  let createRuralProducerUseCase: CreateRuralProducerUseCase;
  let ruralProducerInMemoryRepository: RuralProducerInMemoryRepository;

  beforeEach(() => {
    ruralProducerInMemoryRepository = new RuralProducerInMemoryRepository();
    createRuralProducerUseCase = new CreateRuralProducerUseCase(
      ruralProducerInMemoryRepository,
    );
  });

  it('should create a rural producer succesfully', async () => {
    const input = {
      name: 'Seu Zé',
      cpfCnpj: '123.456.789-01',
      farm: 'Fazenda São João',
      city: 'São Paulo',
      state: 'SP',
      totalArea: 310.5,
      arableArea: 200,
      vegetationArea: 110.5,
    };

    await createRuralProducerUseCase.exec(input);

    expect(ruralProducerInMemoryRepository.ruralProducers[0]).toMatchObject(
      input,
    );
  });

  it('should not create a rural producer with inconsistent total area', async () => {
    const input = {
      name: 'Seu Zé',
      cpfCnpj: '123.456.789-01',
      farm: 'Fazenda São João',
      city: 'São Paulo',
      state: 'SP',
      totalArea: 300,
      arableArea: 200,
      vegetationArea: 105,
    };

    await expect(createRuralProducerUseCase.exec(input)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
