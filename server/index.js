import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './graphql/schema';
import { Engine } from 'apollo-engine';
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('./db');
const sessionStore = new SequelizeStore({ db });
const PORT = process.env.PORT || 9090;
const app = express();
const { startEmailService, createRunsAtMidnight } = require('../utils');
module.exports = app;

if (process.env.NODE_ENV !== 'production') require('../secrets');

// Apollo Engine setup
const engine = new Engine({
  engineConfig: {
    apiKey: process.env.ENGINE_API_KEY,
    stores: [
      {
        name: 'inMemEmbeddedCache',
        inMemory: {
          cacheSize: 20971520, // 20 MB
        },
      },
    ],
    queryCache: {
      publicFullQueryStore: 'inMemEmbeddedCache',
    },
  },
  graphqlPort: PORT,
});
engine.start();

// passport registration
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findById(id);
    done(null, user);
  }
  catch (err) { done(); }
});

const createApp = () => {
  // Apollo Engine middleware
  app.use(engine.expressMiddleware());

  // logging middleware
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  // body parsing middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // compression middleware
  app.use(compression());

  // session middleware with passport
  app.use(session({
    secret: process.env.SESSION_SECRET || 'my best friend is Cody',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // auth and api routes
  app.use('/auth', require('./auth'));

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // GraphQL setup
  app.use('/graphql', bodyParser.json(), graphqlExpress(req => {
    return {
      schema,
      tracing: true,
      cacheControl: true,
      context: { user: req.user },
    };
  }
  ));

  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const startListening = () => {
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
};

const syncDb = () => db.sync();

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  sessionStore.sync()
    .then(syncDb)
    .then(createApp)
    .then(startListening)
    .then(startEmailService)
    .then(createRunsAtMidnight);
} else {
  createApp();
}

