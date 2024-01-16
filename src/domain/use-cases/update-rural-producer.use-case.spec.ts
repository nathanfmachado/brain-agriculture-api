import { describe, expect, it, beforeEach } from 'vitest';
import { RuralProducerInMemoryRepository } from 'src/data/repositories/rural-producer.in-memory-repository';
import { BadRequestException } from '@nestjs/common';
import { UpdateRuralProducerUseCase } from './update-rural-producer.use-case';

describe('UpdateRuralProducerUseCase', () => {
  let updateRuralProducerUseCase: UpdateRuralProducerUseCase;
  let ruralProducerInMemoryRepository: RuralProducerInMemoryRepository;

  beforeEach(() => {
    ruralProducerInMemoryRepository = new RuralProducerInMemoryRepository();
    updateRuralProducerUseCase = new UpdateRuralProducerUseCase(
      ruralProducerInMemoryRepository,
    );

    ruralProducerInMemoryRepository.ruralProducers = [
      {
        id: '1',
        name: 'Seu Zé',
        cpfCnpj: '123.456.789-01',
        farm: 'Fazenda São João',
        city: 'São Paulo',
        state: 'SP',
        totalArea: 310.5,
        arableArea: 200,
        vegetationArea: 110.5,
        createdAt: new Date(),
        updatedAt: new Date(),
        crops: [],
      },
      {
        id: '2',
        name: 'Seu João',
        cpfCnpj: '123.456.789-02',
        farm: 'Fazenda São José',
        city: 'Anápolis',
        state: 'GO',
        totalArea: 290,
        arableArea: 190,
        vegetationArea: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
        crops: [],
      },
    ];
  });

  it('should update a rural producer succesfully', async () => {
    const input = {
      id: '2',
      name: 'Joãozinho',
      totalArea: 320,
      vegetationArea: 130,
    };

    await updateRuralProducerUseCase.exec(input);

    const ruralProducer = ruralProducerInMemoryRepository.ruralProducers.find(
      (ruralProducer) => ruralProducer.id === input.id,
    );

    expect(ruralProducer).toMatchObject({
      id: '2',
      name: 'Joãozinho',
      cpfCnpj: '123.456.789-02',
      farm: 'Fazenda São José',
      city: 'Anápolis',
      state: 'GO',
      totalArea: 320,
      arableArea: 190,
      vegetationArea: 130,
    });
  });

  it('should not update a rural producer with inconsistent total area', async () => {
    const input = {
      id: '1',
      totalArea: 50,
    };

    await expect(updateRuralProducerUseCase.exec(input)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
