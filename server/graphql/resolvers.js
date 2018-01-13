import { User, Run, Route, FortuneCookie } from './connectors';
import _ from 'lodash';

let nextId = 3;

const resolvers = {
  Query: {
    user(_, args, context) {
      return User.findById(args.id);
    },
    allUsers(_, args) {
      return User.findAll();
    },
    run(_, args) {
      return Run.find({ where: args });
    },
    allRoutes(_, args) {
      return Route.findAll();
    },
  },
  Mutation: {
    addRoute: (_, args) => {
      return Route.create({ name: args.name });
    },
  },
  Run: {
    participants(run) {
      return run.getParticipants();
    },
    route(run) {
      return Route.findById(run.routeId);
    },
  },
};

export default resolvers;
