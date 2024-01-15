import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { envSchema } from './env';
import { RuralProducerController } from './api/controllers/rural-producer.controller';
import { RuralProducerPrismaRepository } from './data/repositories/rural-producer.prisma-repository';
import { RuralProducerRepository } from './data/interfaces/rural-producer.repository';
import { CreateRuralProducerUseCase } from './domain/use-cases/create-rural-producer.use-case';
import { ListRuralProducersUseCase } from './domain/use-cases/list-rural-producers.use-case';

const diRepositoryProviders = [
  {
    provide: RuralProducerRepository,
    useClass: RuralProducerPrismaRepository,
  },
];

const useCaseProviders = [
  CreateRuralProducerUseCase,
  ListRuralProducersUseCase,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (envConfig) => envSchema.parse(envConfig),
      isGlobal: true,
    }),
  ],
  controllers: [RuralProducerController],
  providers: [PrismaService, ...diRepositoryProviders, ...useCaseProviders],
})
export class AppModule {}
