const router = require('express').Router();
const { Run, Route } = require('../db/models');
module.exports = router;

const { testClog } = require('../../utils');

router.get('/', (req, res, next) => {
  Run.findAll()
    .then(runs => res.json(runs))
    .catch(next);
});

router.get('/:id', async (req, res, next) => {
  Run.findById(req.params.id, { include: [Route] })
    .then(run => res.json(run))
    .catch(next);
});

router.get('/date/:date', async (req, res, next) => {
  try {
    const run = await Run.findOrCreate({
      where: { date: req.params.date },
      include: [Route],
    });
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
