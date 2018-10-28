const { GraphQLServer } = require('graphql-yoga');
const fetch = require('node-fetch');

const baseURL = 'https://rickandmortyapi.com/api/';

const typeDefs = `
type Query {
  getInfo(id: Int!): Info
}
type Info {
  name: String,
  air_date: String,
  episode: String,
  url: String,
  created: String
}
`

const resolvers = {
  Query: {
    // hello: (_, { name }) => `Hello ${name || 'World'}`,
    getInfo: async (_, {id}) => {
      const response = await fetch(baseURL + `/episode/${id}`)
      return response.json();
    }
  },
}

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'))