const express = require('express');
const app = express();
const port = 3001;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/public/about.html');
  });
  
  // Contact route
  app.get('/contact', (req, res) => {
    res.sendFile(__dirname + '/public/contact.html');
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
