const { Run } = require('../../server/db/models');

const seedRuns = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return Promise.all([
    Run.create({ startTime: '12:00', groupId: 1 }),
    Run.create({ date: tomorrow, groupId: 1 }),
  ]);
};

module.exports = seedRuns;
