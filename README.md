
#  Lévy Gorvy

  

####  Backend tech stack

- NodeJS: Fastify framework.

- Apollo Fastify Server + GQL.

- Pino logger

- ES Lint

- PostgreSQL

###  Installation

Install the dependencies and start the server.

  

```sh

$ cd levygrovy-backend

$ yarn install

$ yarn start

```

### GraphQL
##### Local JSON query example.
http://localhost:4000/graphql
```sh
{
  arts {
    id
    title
    author
    contact
  }
}
```