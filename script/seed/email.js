const { Email } = require('../../server/db/models');

const seedEmails = () => {
  return Promise.all([
    Email.create({ time: '08:30', type: 'first' }),
    Email.create({ time: '11:00', type: 'update' }),
  ]);
};

module.exports = seedEmails;
