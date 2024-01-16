import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { envSchema } from './env';
import { RuralProducerController } from './api/controllers/rural-producer.controller';
import { RuralProducerPrismaRepository } from './data/repositories/rural-producer.prisma-repository';
import { RuralProducerRepository } from './data/interfaces/rural-producer.repository';
import { CreateRuralProducerUseCase } from './domain/use-cases/create-rural-producer.use-case';
import { ListRuralProducersUseCase } from './domain/use-cases/list-rural-producers.use-case';
import { UpdateRuralProducerUseCase } from './domain/use-cases/update-rural-producer.use-case';
import { DeleteRuralProducerUseCase } from './domain/use-cases/delete-rural-producer.use-case';
import { DashboardController } from './api/controllers/dashboard.controller';
import { GetDashboardUseCase } from './domain/use-cases/get-dashboard.use-case';

const diRepositoryProviders = [
  {
    provide: RuralProducerRepository,
    useClass: RuralProducerPrismaRepository,
  },
];

const useCaseProviders = [
  CreateRuralProducerUseCase,
  UpdateRuralProducerUseCase,
  ListRuralProducersUseCase,
  DeleteRuralProducerUseCase,
  GetDashboardUseCase,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (envConfig) => envSchema.parse(envConfig),
      isGlobal: true,
    }),
  ],
  controllers: [RuralProducerController, DashboardController],
  providers: [PrismaService, ...diRepositoryProviders, ...useCaseProviders],
})
export class AppModule {}
