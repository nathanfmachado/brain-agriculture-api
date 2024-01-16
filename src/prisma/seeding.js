// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client');

async function seed() {
  const prisma = new PrismaClient();

  const crops = [
    {
      id: '01',
      name: 'Soja',
    },
    {
      id: '02',
      name: 'Milho',
    },
    {
      id: '03',
      name: 'Algodão',
    },
    {
      id: '04',
      name: 'Café',
    },
    {
      id: '05',
      name: 'Cana de açucar',
    },
  ];

  await prisma.$connect();

  await prisma.crop.createMany({
    data: crops,
  });

  await prisma.ruralProducer.create({
    data: {
      id: '01',
      name: 'Maria',
      cpfCnpj: '123.456.789-10',
      farm: 'Fazenda A',
      city: 'São Paulo',
      state: 'SP',
      totalArea: 1000,
      arableArea: 800,
      vegetationArea: 200,
      crops: {
        connect: [
          {
            id: '01',
          },
          {
            id: '02',
          },
        ],
      },
    },
  });

  await prisma.ruralProducer.create({
    data: {
      id: '02',
      name: 'João',
      cpfCnpj: '123.456.789-11',
      farm: 'Fazenda B',
      city: 'São Paulo',
      state: 'SP',
      totalArea: 1300,
      arableArea: 900,
      vegetationArea: 400,
      crops: {
        connect: [
          {
            id: '03',
          },
          {
            id: '04',
          },
        ],
      },
    },
  });

  await prisma.ruralProducer.create({
    data: {
      id: '03',
      name: 'José',
      cpfCnpj: '123.456.789-12',
      farm: 'Fazenda C',
      city: 'Anápolis',
      state: 'GO',
      totalArea: 650,
      arableArea: 650,
      vegetationArea: 0,
      crops: {
        connect: [
          {
            id: '05',
          },
        ],
      },
    },
  });

  await prisma.ruralProducer.create({
    data: {
      id: '04',
      name: 'Ana',
      cpfCnpj: '123.456.789-13',
      farm: 'Fazenda D',
      city: 'Anápolis',
      state: 'GO',
      totalArea: 2300,
      arableArea: 1100,
      vegetationArea: 1200,
      crops: {
        connect: [
          {
            id: '01',
          },
          {
            id: '02',
          },
          {
            id: '03',
          },
          {
            id: '04',
          },
          {
            id: '05',
          },
        ],
      },
    },
  });

  await prisma.$disconnect();
}
seed();
