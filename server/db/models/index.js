import Sequelize from 'sequelize';
import db from '../db';
const User = require('./user');
const Route = require('./route');
const Run = require('./run');
const Group = require('./group');
const Invite = require('./invite');
const Email = require('./email');

/**
 * group-email relationship
 */
Email.belongsTo(Group);
Group.hasMany(Email);

/**
 * run-route relationship
 */
Run.belongsTo(Route);
Route.hasMany(Run);

/**
 * run-group relationship
 */
Run.belongsTo(Group);
Group.hasMany(Run);

/**
 * route-group relationship
 */
Route.belongsTo(Group);
Group.hasMany(Route);

/**
 * run-user (Participant) relationship
 */
const Participant = db.define('participant', {
  comment: Sequelize.STRING,
});

User.belongsToMany(Run, { as: 'runs', through: Participant, foreignKey: 'userId' });
Run.belongsToMany(User, { as: 'participants', through: Participant, foreignKey: 'runId' });

/**
 * user-group relationship
 */

User.belongsToMany(Group, { as: 'groups', through: 'Members', foreignKey: 'userId' });
Group.belongsToMany(User, { as: 'members', through: 'Members', foreignKey: 'groupId' });

/**
 * user-group admin relationship
 */

User.belongsToMany(Group, { through: 'GroupAdmin', foreignKey: 'userId' });
Group.belongsToMany(User, { as: 'admins', through: 'GroupAdmin', foreignKey: 'groupId' });

/**
 * run-user admin relationship
 */

User.belongsToMany(Run, { through: 'RunAdmin', foreignKey: 'userId' });
Run.belongsToMany(User, { as: 'admins', through: 'RunAdmin', foreignKey: 'runId' });

module.exports = {
  User,
  Run,
  Route,
  Group,
  Participant,
  Invite,
  Email,
};
