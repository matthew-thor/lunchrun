const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll.scope('noSensitive').findAll();
    res.json(users);
  }
  catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.scope('noSensitive').findById(req.params.id);
    res.json(user);
  }
  catch (err) { next(err); }
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
  try { await User.destroy({ where: { id: req.params.id } }); }
  catch (err) { next(); }

  res.sendStatus(204);
});
