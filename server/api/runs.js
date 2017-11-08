const router = require('express').Router();
const {Run} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Run.findAll()
    .then(runs => res.json(runs))
    .catch(next);
});

router.get('/id/:id', (req, res, next) => {
  Run.find({ where: { id: req.params.id }})
    .then(run => res.json(run))
    .catch(next);
});

router.get('/:date', (req, res, next) => {
  Run.findOrCreate({ where: { date: req.params.date }})
    .then(run => res.json(run))
    .catch(next);
});

router.put('/:date', async (req, res, next) => {
  try {
    const run = await Run.find({ where: { date: req.params.date}});
    run.update(req.body);
    res.sendStatus(202);
  }
  catch (err) { next(err); }
});
