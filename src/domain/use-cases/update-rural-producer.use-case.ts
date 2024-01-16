import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UseCase } from './use-case';
import { UpdateRuralProducerBodySchema } from 'src/api/validators/rural-producer.validator';
import { RuralProducerRepository } from 'src/data/interfaces/rural-producer.repository';

export interface UpdateRuralProducerUseCaseParams
  extends UpdateRuralProducerBodySchema {
  id: string;
}

@Injectable()
export class UpdateRuralProducerUseCase
  implements UseCase<UpdateRuralProducerUseCaseParams, void>
{
  constructor(private ruralProducerRepository: RuralProducerRepository) {}

  async exec(data: UpdateRuralProducerUseCaseParams): Promise<void> {
    const oldRuralProducer = await this.ruralProducerRepository.findById(
      data.id,
    );

    if (!oldRuralProducer) {
      throw new NotFoundException('Rural producer not found');
    }

    const totalArea = data.totalArea ?? oldRuralProducer.totalArea;
    const arableArea = data.arableArea ?? oldRuralProducer.arableArea;
    const vegetationArea =
      data.vegetationArea ?? oldRuralProducer.vegetationArea;

    if (totalArea < arableArea + vegetationArea) {
      throw new BadRequestException(
        'Total area must be greater than or equal to arable and vegetation areas',
      );
    }

    const cropsToDisconnect = oldRuralProducer.crops
      .filter((crop) => !data.cropIds?.includes(crop.id))
      .map((crop) => crop.id);
    const cropsToConnect = data.cropIds?.filter(
      (cropId) =>
        !oldRuralProducer.crops.map((crop) => crop.id).includes(cropId),
    );

    await this.ruralProducerRepository.update({
      id: data.id,
      name: data.name,
      farm: data.farm,
      city: data.city,
      state: data.state,
      totalArea,
      arableArea,
      vegetationArea,
      crops: {
        idsToDisconnect: cropsToDisconnect,
        idsToConnect: cropsToConnect,
      },
    });
  }
}
