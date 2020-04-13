const { env, port, mongo_uri: db } = require('./config');
console.log('DB', db);
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./models');
const graphqlHTTP = require('express-graphql');
const expressPlayground = require('graphql-playground-middleware-express')
  .default;
const { schema, resolvers } = require('./schema');
const path = require('path');
if (env !== 'production') {
  const cors = require('cors');
  app.use(cors({ origin: 'http://localhost:3000' }));
}

const passport = require('passport');
require('./config/passport')(passport);
app.use(passport.initialize());

mongoose
  .connect(db, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.log(err));

const morgan = require('morgan');
app.use(morgan('dev'));

const { graphqlLogger, passportAuthenticate } = require('./middlewares');

app.use(
  '/graphql',
  passportAuthenticate(passport),
  graphqlLogger(true),
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
  }),
);

app.get('/playground', expressPlayground({ endpoint: '/graphql' }));

if (process.env.NODE_ENV === 'production') {
  const CLIENT_BUILD_PATH = path.join(__dirname, '../public');

  app.use(express.static(CLIENT_BUILD_PATH));

  app.get('*', (req, res) => {
    res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
  });
}

app.listen(port, () => console.log(`Server is running on port ${port}`));
