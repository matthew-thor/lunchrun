const { Group } = require('../../server/db/models');

const seedGroups = () => {
  return Promise.all([
    Group.create({ name: 'Loop Lunch Run' }),
    Group.create({ name: 'Saturday Morning Trough' }),
  ]);
};

module.exports = seedGroups;
