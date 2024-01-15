import { Body, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from 'src/api/pipes';
import {
  CreateRuralProducerBodySchema,
  createRuralProducerBodySchema,
} from 'src/api/validators/rural-producer.validator';
import { CreateRuralProducerUseCase } from 'src/domain/use-cases/create-rural-producer.use-case';

@Controller('/rural-producers')
export class RuralProducerController {
  constructor(private createRuralProducerUseCase: CreateRuralProducerUseCase) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createRuralProducerBodySchema))
    body: CreateRuralProducerBodySchema,
  ) {
    await this.createRuralProducerUseCase.exec(body);
  }
}
