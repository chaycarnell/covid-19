// Libs
require('dotenv').config();
const connectMongo = require('./db/config').connectMongo;
const { launch } = require('./bot/bot');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const ws = require('./ws');
const port = process.env.PORT || 3001;
// Glue used for matching resolvers with type defs
const glue = require('schemaglue');
// Routes
const pub = require('./api/routes/public');

// Express config
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.static(__dirname + './../../'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Apply routes
app.use('/api/public', pub);

// Glue schemas/resolvers together
const { schema, resolver } = glue('src/backend/resolvers');

// Construct a schema, using GraphQL schema language
const mySchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolver
});

// GraphQL server setup
app.use(
  '/graphql',
  graphqlHTTP({
    schema: mySchema,
    graphiql: true
  })
);

// Init websocket
ws.init(http);

// Connect to mongo
connectMongo(err => {
  if (err) throw err;
  http.listen(port, err => {
    if (err) throw err;
    // Start the bot >:)
    launch();
  });
  console.info(`App is running on ${port}`);
});

// Serve index page
// Wildcard match will handle returning index when page is refreshed
// Routing would otherwise return and error i.e. 'cannot get /someRoute'
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});
