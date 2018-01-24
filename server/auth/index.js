const router = require('express').Router();
const { User, Invite } = require('../db/models');
module.exports = router;

router.post('/login', (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        res.status(401).send('Not authorized');
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Not authorized');
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)));
      }
    })
    .catch(next);
});

router.post('/signup', async (req, res, next) => {
  try {
    const invite = await Invite.find({
      where: {
        email: req.body.email,
        code: req.body.code,
        groupId: req.body.groupId,
      },
    });

    if (!invite) { res.status(401).send('Not authorized'); }
    else {
      const user = await User.create(req.body);
      invite.destroy();
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  }
  catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Not authorized');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));
