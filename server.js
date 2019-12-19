const { ApolloServer, gql } = require('apollo-server-fastify');
const { typeDefs, resolvers } = require('./module');

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const fastify = require('fastify')({
  logger: true,
  ignoreTrailingSlash: true
})

const { Client } = require('pg');
const connectionString = 'postgres://postgres:postgres@localhost:5432/postgres';

const client = new Client({
    connectionString: connectionString
});

client.connect();

const PORT = process.env.PORT || 3000;

fastify.get('/', (req, res) => {
  res.send({hello: 'world'})
})

fastify.get('/artists', (req,res) => {
    client.query('SELECT * FROM Employee where id = $1', [1], function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
})

const start = async () => {
  try{
    await fastify.listen(PORT, '0.0.0.0');
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  }
  catch (err){
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
