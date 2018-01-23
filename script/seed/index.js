const db = require('../../server/db');
const seedUsers = require('./user');
const seedGroups = require('./group');
const seedRuns = require('./run');
const seedRoutes = require('./route');
const setAssociations = require('./associations');

const seed = async () => {
  await db.sync({ force: true });
  console.log('db synced!');

  // seed groups
  const groups = await seedGroups();
  console.log(`seeded ${groups.length} groups`);

  // seed users
  const users = await seedUsers();
  console.log(`seeded ${users.length} users`);

  // seed routes
  const routes = await seedRoutes();
  console.log(`seeded ${routes.length} routes`);

  // seed runs
  const runs = await seedRuns();
  console.log(`seeded ${runs.length} runs`);

  const associations = await setAssociations(groups, users, routes, runs);
  console.log(`${associations.length} association operations complete`);

  // success message
  console.log(`seeded successfully`);
};

// const runSeed = async seedFn => {
//   console.log('seeding...');
//   try {
//     await seedFn();
//     console.log('closing db connection');
//     db.close();
//     console.log('db connection closed');
//   }
//   catch (err) {
//     console.error(err.message);
//     console.error(err.stack);
//     process.exitCode = 1;
//   }
// };

// runSeed(seed);

seed()
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing db connection');
    db.close();
    console.log('db connection closed');
  });

console.log('seeding...');
