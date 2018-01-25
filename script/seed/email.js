const { Email } = require('../../server/db/models');

const seedEmails = () => {
  return Promise.all([
    Email.create({ time: '08:30', type: 'first', days: '1,2,3,4,5' }),
    Email.create({ time: '11:00', type: 'update', days: '1,2,3,4,5' }),
  ]);
};

module.exports = seedEmails;
