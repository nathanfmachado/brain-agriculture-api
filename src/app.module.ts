import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { envSchema } from './env';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (envConfig) => envSchema.parse(envConfig),
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
