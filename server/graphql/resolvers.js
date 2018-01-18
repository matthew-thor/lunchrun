import { User, Run, Route, Participant, Group } from './connectors';
import _ from 'lodash';

const resolvers = {
  Query: {
    me: (_, args, context) => {
      if (context.user) return User.findById(context.user.id);
      else return {};
    },
    user: (_, args, context) => {
      if (!context.user) throw new Error('Not authorized');
      return User.findById(args.id);
    },
    group: (_, args, context) => {
      if (!context.user) throw new Error('Not authorized');
      return Group.findById(args.id);
    },
    allUsers: (_, args, context) => {
      if (!context.user) throw new Error('Not authorized');
      return User.findAll();
    },
    run: async (_, args, context) => {
      if (!context.user) throw new Error('Not authorized');
      const run = await Run.findOrCreate({ where: args });
      return run[0];
    },
    allRoutes: (_, args, context) => {
      if (!context.user) throw new Error('Not authorized');
      return Route.findAll();
    },
  },
  Mutation: {
    addRoute: (_, args, context) => {
      if (!(context.user && context.user.admin)) throw new Error('Not authorized');
      return Route.create({ name: args.name });
    },
    updateParticipant: async (_, args, context) => {
      if (context.user && (context.user.id === args.userId || context.user.admin)) {
        if (args.type === 'in') {
          const run = await Run.findById(args.runId);
          await run.addParticipant(args.userId);
          return Participant.findOne({
            where: {
              runId: args.runId, userId: args.userId,
            },
          });
        }
        else if (args.type === 'out') {
          const run = await Run.findById(args.runId);
          return run.removeParticipant(args.userId);
        }
        else if (args.type === 'comment') {
          const participant = await Participant.findOne({
            where: {
              runId: args.runId, userId: args.userId,
            },
          });
          return participant.update({ comment: args.comment });
        }
        else { throw new Error('Are you in or out?!'); }
      }
      else { throw new Error('Not authorized'); }
    },
    updateRun: async (_, args, context, info) => {
      if (!(context.user && context.user.admin)) throw new Error('Not authorized');
      const run = await Run.findById(args.runId);
      return run.update(args);
    },
  },
  Group: {
    admins: group => group.getAdmins(),
    routes: group => group.getRoutes(),
  },
  User: {
    groups: user => user.getGroups(),
  },
  Run: {
    // set up this way to allow for comments
    participants: run => Participant.findAll({ where: { runId: run.id } }),
    group: run => run.getGroup(),
    route: run => Route.findById(run.routeId),
    admins: run => run.getAdmins(),
  },
  Participant: {
    // set up this way to allow for comments
    user: participant => User.findById(participant.userId),
  },
};

export default resolvers;
