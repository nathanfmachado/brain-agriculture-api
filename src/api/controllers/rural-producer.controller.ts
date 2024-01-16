import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/api/pipes';
import {
  CreateRuralProducerBodySchema,
  PageQueryParamSchema,
  UpdateRuralProducerBodySchema,
  createRuralProducerBodySchema,
  pageQueryParamSchema,
  updateRuralProducerBodySchema,
} from 'src/api/validators/rural-producer.validator';
import { CreateRuralProducerUseCase } from 'src/domain/use-cases/create-rural-producer.use-case';
import { DeleteRuralProducerUseCase } from 'src/domain/use-cases/delete-rural-producer.use-case';
import { ListRuralProducersUseCase } from 'src/domain/use-cases/list-rural-producers.use-case';
import { UpdateRuralProducerUseCase } from 'src/domain/use-cases/update-rural-producer.use-case';

@Controller('/rural-producers')
export class RuralProducerController {
  constructor(
    private createRuralProducerUseCase: CreateRuralProducerUseCase,
    private updateRuralProducerUseCase: UpdateRuralProducerUseCase,
    private listRuralProducersUseCase: ListRuralProducersUseCase,
    private deleteRuralProducerUseCase: DeleteRuralProducerUseCase,
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

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateRuralProducerBodySchema))
    body: UpdateRuralProducerBodySchema,
  ) {
    await this.updateRuralProducerUseCase.exec({ ...body, id });
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.deleteRuralProducerUseCase.exec(id);
  }
}
