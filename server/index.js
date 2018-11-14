const { GraphQLServer } = require('graphql-yoga');
const fetch = require('node-fetch');

const baseURL = 'https://swapi.co/api';

const typeDefs = `
type Query {
  getInfo(id: Int!): Person
}

type Film {
  url: String
}

type Person {
  name: String,
  height: Int,
  mass: Int,
  hair_color: String,
  skin_color: String,
  eye_color: String,
	birth_year: String,
	gender: String,
  homeworld: String,
  films: [Film]!
}
`

const resolvers = {
  Person: {
    films: res => {
      const promises = res.films.map(async url => {
        const response = await fetch(url)
        return response.json()
      })
      return Promise.all(promises)
    }
  },
  Query: {
    // hello: (_, { name }) => `Hello ${name || 'World'}`,
    getInfo: async (_, {id}) => {
      const response = await fetch(baseURL + `/people/${id}`)
      return response.json();
    }
  },
}

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log('Server is running on localhost:4000'))