const { User, Run, Route, Participant, Group, Invite, Email } = require('./connectors');
const { updateEmailService } = require('../../utils');
const _ = require('lodash');

module.exports = {
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
      // if (!context.user) throw new Error('Not authorized');
      return Group.findById(args.id);
    },
    allGroups: (_, args, context) => {
      if (!context.user) throw new Error('Not authorized');
      return Group.findAll();
    },
    allUsers: (_, args, context) => {
      if (!context.user || !context.user.admin) throw new Error('Not authorized');
      return User.findAll();
    },
    run: async (_, args, context) => {
      if (!context.user) throw new Error('Not authorized');
      const foundRun = await Run.find({ where: args });
      return foundRun ? foundRun : Run.create(args);
    },
    allRoutes: (_, args, context) => {
      if (!context.user) throw new Error('Not authorized');
      return Route.findAll();
    },
  },
  Mutation: {
    addRoute: (_, args, context) => {
      if (!context.user) throw new Error('Not authorized');
      return Route.create(args);
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
    updateRun: async (_, args, context) => {
      if (!(context.user && context.user.admin)) throw new Error('Not authorized');
      const run = await Run.findById(args.runId);
      return run.update(args);
    },
    inviteUser: async (_, args, context) => {
      if (!context.user) throw new Error('Not authorized');
      const invite = await Invite.findOrCreate({
        where: {
          email: args.email,
          groupId: args.groupId,
        },
      });

      if (!invite[1]) { await invite[0].generateNewCode(); }

      return invite[0].sendEmail();
    },
    updateEmailSchedule: async (_, args, context) => {
      if (!context.user) throw new Error('Not authorized');
      const email = await Email.find({
        where: {
          groupId: args.groupId,
          type: args.type,
        },
      });

      const updated = await email.update({ time: args.time, days: args.days });

      updateEmailService(updated.id);

      return updated;
    },
    changePassword: async (_, args, context) => {
      if (context.user && (context.user.id === args.userId || context.user.admin)) {
        const user = await User.findById(args.userId);
        if (!user.correctPassword(args.currentPw)) return new Error('Not authorized');
        return user.update({ password: args.newPw });
      }
      else { throw new Error('Not authorized'); }
    },
    resetPassword: async (_, args, context) => {
      if (context.user && (context.user.id === args.userId || context.user.admin)) {
        const user = await User.findById(args.userId);
        return user.resetPassword();
      }
      else { throw new Error('Not authorized'); }
    },
    deleteUser: async (_, args, context) => {
      if (context.user && (context.user.id === args.userId || context.user.admin)) {
        const user = await User.findById(args.userId);
        return user.destroy();
      }
      else { throw new Error('Not authorized'); }
    },
    deleteGroup: async (_, args, context) => {
      if (context.user && context.user.admin) {
        const group = await Group.findById(args.groupId);
        return group.destroy();
      }
      else { throw new Error('Not authorized'); }
    },
  },
  Group: {
    admins: group => group.getAdmins(),
    routes: group => group.getRoutes(),
    emails: group => group.getEmails(),
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
