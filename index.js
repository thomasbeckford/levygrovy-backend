
const fastify = require('fastify')({ logger: true,ignoreTrailingSlash: true})
const { ApolloServer, gql } = require('apollo-server-fastify');
const { Client } = require('pg');
const connectionString = 'postgres://postgres:postgres@localhost:5432/postgres';
const client = new Client({connectionString: connectionString});

client.connect();

// Routes
fastify.get('/', (req, res) => {
  res.send({hello: 'world'})
})

// ApolloServer TypeDefs
typeDefs = gql`
  
  type Art {
    id: ID
    title: String
    author: String
    contact: String
  }

  type Query {
    arts: [Art]
  }

`;
// ApolloServer Resolvers
const resolvers = {
  Query: {
    arts: () => {
      return [
        {
          title: "Black beast",
          author: "Alexander Calder, 1940",
          invNumber:"LG-158-158",
          contact: "Lock Kresler"
        },
        {
          title: "The Box in the Air",
          author: "Alexander Calder, 1945",
          invNumber:"LG-118-330",
          contact: "Begum Yasar"
        },
        {
          title: "Red-Eyed Dragon",
          author: "Aleander Calder, 1950",
          invNumber:"LG-128-130",
          contact: "Alina Kohlem-Cori"
        }
      ];
    },
  }
};

// Instance server
const server = new ApolloServer({typeDefs,resolvers});

// Start app async fnct.
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
