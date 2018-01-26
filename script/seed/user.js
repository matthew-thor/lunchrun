const { User } = require('../../server/db/models');


const seedUsers = () => {
  return Promise.all([
    User.create({
      firstName: 'Matthew',
      lastName: 'Thor',
      email: 'mjthor@gmail.com',
      password: '123',
      googleId: '103769715326299458196',
      admin: true,
    }),
    User.create({
      firstName: 'Lou',
      lastName: 'Glaser',
      email: 'lou@email.com',
      password: '123',
    }),
    User.create({
      firstName: 'Anu',
      lastName: 'Parekh',
      email: 'anu@email.com',
      password: '123',
    }),
  ]);
};

module.exports = seedUsers;
