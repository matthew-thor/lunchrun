import Sequelize from 'sequelize';
import db from '../db';
const User = require('./user');
const Route = require('./route');
const Run = require('./run');

Run.belongsTo(Route);
Route.hasMany(Run);

const Participant = db.define('participant', {
  comment: Sequelize.STRING,
});

User.belongsToMany(Run, { as: 'run', through: Participant, foreignKey: 'userId' });
Run.belongsToMany(User, { as: 'participants', through: Participant, foreignKey: 'runId' });

module.exports = {
  User,
  Run,
  Route,
  Participant,
};
