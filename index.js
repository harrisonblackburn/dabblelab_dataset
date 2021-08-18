const { ApolloServer, gql } = require('apollo-server');
const graphql, {GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString} = require('graphql');
const {graphHTTP} = require('express-graphql');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Albania" type defines the queryable fields for every year in our data source.
  type Albania {
    year: String
    population: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;
const albania = [
    {
      year: '2000',
      population: '3401198'
    },
    {
      year: '2001',
      population: '3073734'
    },
    {
      year: '2002',
      population: '3093465'
    },
    {
      year: '2003',
      population: '3111162'
    },
    
  ];

  const RootQuery = "query"; 

  const Mutation = "mutation";

  const schema = new GraphQLSchema({query: RootQuery, mutation: Mutation })

  // Resolvers define the technique for fetching the types defined in the
// schema. 
const resolvers = {
    Query: {
      albania: () => albania,
    },
  };
  
  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

app.use('/graphql', graphqlHTTP({
    schema, 
    graphql: true
}))