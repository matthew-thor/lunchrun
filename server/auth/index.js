const router = require('express').Router();
const User = require('../db/models/user');
module.exports = router;

router.post('/login', (req, res, next) => {
  User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => (err ? next(err) : res.json(user)))
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => err ? next(err) : res.json(user));
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
<<<<<<< HEAD
      else next(err);
    });
});
=======
      } else {
        next(err)
      }
    })
})
>>>>>>> boilermaker/master

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

router.get('/me', (req, res) => {
  res.json(req.user);
})

router.get('/invite', (req, res) => {
  req.query.code === process.env.INVITE_CODE ?
    res.status(202).send(true) :
    res.status(204).send(false);
});

router.use('/google', require('./google'));
