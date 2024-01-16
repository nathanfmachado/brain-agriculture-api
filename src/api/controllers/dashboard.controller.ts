import { Controller, Get } from '@nestjs/common';
import { GetDashboardUseCase } from 'src/domain/use-cases/get-dashboard.use-case';

@Controller('/dashboard')
export class DashboardController {
  constructor(private getDashboardUseCase: GetDashboardUseCase) {}

  @Get()
  async handle() {
    return this.getDashboardUseCase.exec();
  }
}
