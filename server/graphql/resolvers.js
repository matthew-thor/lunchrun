import { User, Run, Route, FortuneCookie } from './connectors';
import _ from 'lodash';

const resolvers = {
  Query: {
    user(_, args, context) {
      console.log('!@!@!@!!@!@!@@~!~!', context.user);
      if (context.user) return User.findById(args.id);
      throw new Error('Not authorized');
    },
    allUsers(_, args, context) {
      console.log('!@!@!@!!@!@!@@~!~!', context.user);
      if (context.user) return User.findAll();
      throw new Error('Not authorized');
    },
    run(_, args, context) {
      console.log('!@!@!@!!@!@!@@~!~!', context.user);
      if (context.user) return Run.find({ where: args });
      throw new Error('Not authorized');
    },
    allRoutes(_, args, context) {
      console.log('!@!@!@!!@!@!@@~!~!', context.user);
      if (context.user) return Route.findAll();
      throw new Error('Not authorized');
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
