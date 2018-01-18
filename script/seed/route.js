const { Route } = require('../../server/db/models');

const seedRoutes = () => {
  return Promise.all([
    Route.create({ name: 'Alley Run' }),
    Route.create({ name: 'South to Monkey Tree' }),
    Route.create({ name: 'North on LFT' }),
  ]);
};

module.exports = seedRoutes;
