import { describe, expect, it, beforeEach } from 'vitest';
import { RuralProducerInMemoryRepository } from 'src/data/repositories/rural-producer.in-memory-repository';
import { ListRuralProducersUseCase } from './list-rural-producers.use-case';

describe('ListRuralProducersUseCase', () => {
  let listRuralProducersUseCase: ListRuralProducersUseCase;
  let ruralProducerInMemoryRepository: RuralProducerInMemoryRepository;

  beforeEach(() => {
    ruralProducerInMemoryRepository = new RuralProducerInMemoryRepository();
    listRuralProducersUseCase = new ListRuralProducersUseCase(
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
        city: 'São Paulo',
        state: 'SP',
        totalArea: 310.5,
        arableArea: 200,
        vegetationArea: 110.5,
        createdAt: new Date(),
        updatedAt: new Date(),
        crops: [],
      },
    ];
  });

  it('should list rural producers succesfully', async () => {
    const ruralProducers = await listRuralProducersUseCase.exec();
    console.log('ruralProducers', ruralProducers);
    expect(ruralProducers.length).toBe(2);
  });
});
