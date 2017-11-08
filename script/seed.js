/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db');
const { User, Run, Route } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  // seed users
  const users = await Promise.all([
    User.create({
      firstName: 'Matthew',
      lastName: 'Thor',
      email: 'mjthor@gmail.com',
      password: '123',
      admin: true,
    }),
    User.create({
      firstName: 'Lou',
      lastName: 'Glaser',
      email: 'lou@email.com',
      password: '123'
    })
  ]);
  console.log(`seeded ${users.length} users`);

  // seed routes
  const routes = await Promise.all([
    Route.create({ name: 'Alley Run' }),
    Route.create({ name: 'South to Monkey Tree' })
  ]);
  console.log(`seeded ${routes.length} routes`);

  // seed runs
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const runs = await Promise.all([
    Run.create(),
    Run.create({ date: tomorrow })
  ]);
  await runs[0].setRoute(1);
  await runs[1].setRoute(2);
  await runs[0].addUsers([1, 2]);
  console.log(`seeded ${runs.length} runs`);

  // success message
  console.log(`seeded successfully`);
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
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

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...');
