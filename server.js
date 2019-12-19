const fastify = require('fastify')({
  logger: false,ignoreTrailingSlash: true
}) // Fastify app adding PINO logger

const { ApolloServer, gql } = require('apollo-server-fastify');
const { Client } = require('pg');
const connectionString = 'postgres://postgres:postgres@localhost:5432/postgres';
const client = new Client({connectionString: connectionString});

client.connect();

fastify.get('/', (req, res) => {
  res.send({hello: 'world'})
})

typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.
  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  type Character {
    name: String
    id: ID
    episodes: [String]
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
    characters: [Character]
    character(id: ID!): Character
  }

  type Mutation {
    createBook(title: String!): Book
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    books: () => knex("book").select("*"),
  },

  Mutation:{
    createBook: async(_,{title, author}) => {
      const [book] = await knex("book")
        .returning("*")
        .insert({title});
      return book;
    }
  }

};


const server = new ApolloServer({typeDefs,resolvers});

const start = async () => {
  try{
    fastify.register(server.createHandler());
    fastify.log.info(`server listening on ${fastify.server.address()} 4000`)
    await fastify.listen(4000, '0.0.0.0');
  }
  catch (err){
    fastifyf.log.error(err);
    process.exit(1);
  }
}

start();
