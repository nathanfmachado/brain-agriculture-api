import { Injectable } from '@nestjs/common';
import { UseCase } from './use-case';
import { RuralProducerRepository } from 'src/data/interfaces/rural-producer.repository';

export interface DashboardResponseModel {
  farms: {
    total: number;
    total_area: number;
  };
  per_state_chart: ChartNodeModel[];
  per_crop_chart: ChartNodeModel[];
  per_area_type_chart: ChartNodeModel[];
}

export interface ChartNodeModel {
  label: string;
  value: number;
}

@Injectable()
export class GetDashboardUseCase
  implements UseCase<void, DashboardResponseModel>
{
  constructor(private ruralProducerRepository: RuralProducerRepository) {}

  async exec(): Promise<DashboardResponseModel> {
    const farms = await this.ruralProducerRepository.getFarmsTotals();
    const perStateChart = await this.ruralProducerRepository.getPerStateChart();
    const perCropChart = await this.ruralProducerRepository.getPerCropChart();

    return {
      farms: {
        total: Number(farms.total),
        total_area: Number(farms.total_area),
      },
      per_state_chart: perStateChart.map((item) => ({
        label: item.label,
        value: Number(item.value),
      })),
      per_crop_chart: perCropChart.map((item) => ({
        label: item.label,
        value: Number(item.value),
      })),
      per_area_type_chart: [
        {
          label: 'Área cultivável',
          value: Number(farms.arable_area),
        },
        {
          label: 'Área de vegetação',
          value: Number(farms.vegetation_area),
        },
      ],
    };
  }
}
