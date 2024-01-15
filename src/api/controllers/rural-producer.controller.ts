import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ZodValidationPipe } from 'src/api/pipes';
import {
  CreateRuralProducerBodySchema,
  PageQueryParamSchema,
  createRuralProducerBodySchema,
  pageQueryParamSchema,
} from 'src/api/validators/rural-producer.validator';
import { CreateRuralProducerUseCase } from 'src/domain/use-cases/create-rural-producer.use-case';
import { ListRuralProducersUseCase } from 'src/domain/use-cases/list-rural-producers.use-case';

@Controller('/rural-producers')
export class RuralProducerController {
  constructor(
    private createRuralProducerUseCase: CreateRuralProducerUseCase,
    private listRuralProducersUseCase: ListRuralProducersUseCase,
  ) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createRuralProducerBodySchema))
    body: CreateRuralProducerBodySchema,
  ) {
    await this.createRuralProducerUseCase.exec(body);
  }

  @Get()
  async list(
    @Query('page', new ZodValidationPipe(pageQueryParamSchema))
    page: PageQueryParamSchema,
  ) {
    return this.listRuralProducersUseCase.exec(page);
  }
}
