const User = require('./user');
const Route = require('./route');
const Run = require('./run');

Run.belongsTo(Route);
Route.hasMany(Run);

User.belongsToMany(Run, { as: 'run', through: 'Participant', foreignKey: 'participantId' });
Run.belongsToMany(User, { as: 'participants', through: 'Participant', foreignKey: 'runId' });

module.exports = {
  User,
  Run,
  Route,
};
