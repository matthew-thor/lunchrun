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
}

type Mutation {
  addRoute(
    name: String!,
    map: String,
    groupId: Int!,
  ): Route
  updateParticipant(
    userId: Int!,
    runId: Int!,
    type: String!,
    comment: String,
  ): Participant
  updateRun(
    runId: Int!,
    startTime: String,
    routeId: Int,
  ): Run
  inviteUser(
    email: String!,
    groupId: Int!,
  ): Invite
  updateEmailSchedule(
    groupId: Int!,
    type: String!,
    time: String!,
    days: String!,
  ): Email
  changePassword(
    userId: Int!,
    currentPw: String!,
    newPw: String!,
  ): User
}

type Group {
  id: Int
  name: String
  admins: [User]
  routes: [Route]
  emails: [Email]
}

type User {
  id: Int
  fullName: String
  firstName: String
  lastName: String
  email: String
  admin: Boolean
  groups: [Group]
  googleId: String
}

type Route {
  id: Int
  name: String
  map: String
  groupId: Int
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

type Invite {
  code: String
  email: String
  groupId: Int
}

type Email {
  id: Int
  time: String
  type: String
  groupId: Int
  days: String
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
