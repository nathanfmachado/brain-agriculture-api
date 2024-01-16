## Description

A simple API with CRUD for rural producers and a dashboard endpoint, compiling relevant information about data
Main technologies used:
- Typescript
- Node.js and Nest.js
- Docker
- Prisma as ORM
- Vitest as test lib
- Zod as validation lib

## Setup

1 - Create an `.env` file using the `.env.example` file as reference. If you don't need any changes, just copy and past the content

2 - Install and run the postgres container:
```bash
$ docker compose up -d
```
- If you need to stop containers later on, just run: `docker compose stop`

3 - Install all dependencies:
```bash
$ npm install
```

4 - Run database migrations:
```bash
$ npx prisma migrate deploy
```

5 - Seed database to have some examples:
```bash
$ npm run db:seed
```

5 - The app is ready to run:
```bash
# development with watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Documentation

A simple documentation was made using `client.http` file. If you are using vscode, install `REST Client` extension from Huachao Mao.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
