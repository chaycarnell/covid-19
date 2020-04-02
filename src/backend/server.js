// Libs
require('dotenv').config();
const connectMongo = require('./db/config').connectMongo;
const { launch } = require('./bot/bot');
const express = require('express');
const { initApollo } = require('./apolloServer');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 3001;

// Express config
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.static(__dirname + './../../'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
const pub = require('./api/routes/public');

// Apply routes
app.use('/api/public', pub);

// Initialise Apollo
initApollo(server, app);

// Connect to mongo
connectMongo(err => {
  if (err) throw err;
  server.listen(port, err => {
    if (err) throw err;
    // Start the bot >:)
    launch();
  });
  console.log(`Covid-19 app server is running on ${port} 🚀`);
});

// Serve index page
// Wildcard match will handle returning index when page is refreshed
// Routing would otherwise return and error i.e. 'cannot get /someRoute'
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});
