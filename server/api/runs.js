const router = require('express').Router();
const { Run } = require('../db/models');
module.exports = router;

const { testClog } = require('../../utils');

router.get('/', (req, res, next) => {
  Run.findAll()
    .then(runs => res.json(runs))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Run.find({ where: { id: req.params.id } })
    .then(run => res.json(run))
    .catch(next);
});

router.get('/date/:date', async (req, res, next) => {
  try {
    const run = await Run.findOrCreate({ where: { date: req.params.date } });
    run[1] ? res.status(201).json(run[0]) : res.json(run[0]);
  }
  catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const run = await Run.findById(req.params.id);
    await run.update(req.body);
    res.sendStatus(204);
  }
  catch (err) { next(err); }
});
