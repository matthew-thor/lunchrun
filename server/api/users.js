const router = require('express').Router();
const {User} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'firstName', 'lastName', 'admin'],
  })
    .then(users => res.json(users))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id,
    { attributes: ['id', 'email', 'firstName', 'lastName', 'admin'] })
    .then(user => res.json(user))
    .catch(next);
});

router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    await user.update(req.body);
    res.sendStatus(204);
  }
  catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const createdUser = await User.create(req.body);
    res.status(201).json(createdUser);
  }
  catch (err) { next(); }
});

router.delete('/:id', async (req, res, next) => {
  try { await User.destroy({ where: { id: req.params.id }}); }
  catch (err) { next(); }

  res.sendStatus(204);
});
