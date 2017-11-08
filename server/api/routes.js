const router = require('express').Router();
const {Route} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Route.findAll()
    .then(routes => res.json(routes))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Route.find({ where: { id: req.params.id }})
    .then(route => res.json(route))
    .catch(next);
});

router.put('/:id', async (req, res, next) => {
  try {
    const user = await Route.findById(req.params.id);
    user.update(req.body);
    res.sendStatus(202);
  }
  catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try { res.json(await Route.create(req.body)); }
  catch (err) { next(); }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  try { await Route.destroy({ where: { id }}); }
  catch (err) { next(); }

  res.sendStatus(204);
});
