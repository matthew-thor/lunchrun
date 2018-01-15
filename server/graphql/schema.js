import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type Query {
  me: User
  user(id: Int): User
  allUsers: [User]
  run(date: String): Run
  allRoutes: [Route]
  getFortuneCookie: String @cacheControl(maxAge: 10)
}

type Mutation {
  addRoute(name: String!): Route
  updateParticipant(
    userId: Int!,
    runId: Int!,
    type: String!,
    comment: String
  ): Participant
}

type Run {
  id: Int
  date: String
  startTime: String
  route: Route
  participants: [Participant]
}

type User {
  id: Int
  fullName: String
  email: String
  admin: Boolean
}

type Route {
  id: Int
  name: String
  map: String
}

type Participant {
  userId: Int
  runId: Int
  comment: String
  fullName: String
  email: String
  user: User
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
