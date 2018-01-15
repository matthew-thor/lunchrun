import { User, Run, Route, FortuneCookie } from './connectors';
import _ from 'lodash';

const resolvers = {
  Query: {
    me(_, args, context) {
      if (context.user) return User.findById(context.user.id);
      else return {};
    },
    user(_, args, context) {
      if (context.user) return User.findById(args.id);
      throw new Error('Not authorized');
    },
    allUsers(_, args, context) {
      if (context.user) return User.findAll();
      throw new Error('Not authorized');
    },
    run(_, args, context) {
      if (context.user) return Run.find({ where: args });
      throw new Error('Not authorized');
    },
    allRoutes(_, args, context) {
      if (context.user) return Route.findAll();
      throw new Error('Not authorized');
    },
  },
  Mutation: {
    addRoute: (_, args, context) => {
      if (context.user && context.user.admin) return Route.create({ name: args.name });
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
