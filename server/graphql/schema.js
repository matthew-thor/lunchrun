import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type Query {
  me: User
  group(id: Int!): Group
  user(id: Int!): User
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
  updateRun(
    runId: Int!,
    startTime: String!,
    routeId: Int!
  ): Run
}

type Group {
  id: Int
  name: String
  admins: [User]
  routes: [Route]
}

type User {
  id: Int
  fullName: String
  firstName: String
  lastName: String
  email: String
  admin: Boolean
  groups: [Group]
}

type Route {
  id: Int
  name: String
  map: String
}

type Run {
  id: Int
  group: Group
  date: String
  startTime: String
  route: Route
  participants: [Participant]
  admins: [User]
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
