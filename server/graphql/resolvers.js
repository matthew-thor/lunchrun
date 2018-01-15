import { User, Run, Route, Participant } from './connectors';
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
      if (context.user && context.user.admin) {
        return Route.create({ name: args.name });
      }
    },
    updateParticipant: async (_, args, context) => {
      if (context.user && (context.user.id === args.userId || context.user.admin)) {
        const run = await Run.findById(args.runId);
        if (args.type === 'in') {
          await run.addParticipant(args.userId);
          return Participant.findOne({
            where: {
              runId: args.runId, userId: args.userId,
            },
          });
        }
        else if (args.type === 'out') {
          return run.removeParticipant(args.userId);
        }
        else { throw new Error('Are you in or out?!'); }
      }
      else { throw new Error('Not authorized'); }
    },
  },
  Run: {
    participants: run => Participant.findAll({ where: { runId: run.id } }),
    route: run => {
      return Route.findById(run.routeId);
    },
  },
  Participant: {
    user: participant => {
      return User.findById(participant.userId);
    },
  },
};

export default resolvers;
