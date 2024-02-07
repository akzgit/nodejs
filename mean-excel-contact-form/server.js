// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const formRoutes = require('./routes/formRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use('/', formRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});