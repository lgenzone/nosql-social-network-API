// set up express server
const express = require('express');
const db = require('./config/connection');
const app = express();
//const routes = require('./routes');

const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(routes);

// initializing connection 
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });